import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';
import Modal from './Modal';
import CheckoutItemCard from './CheckoutItemCard';
import ConfirmModal from './ConfirmModal';
import ProductModal from './ProductModal';
import useStorefront from '../hooks/useStorefront';
import type { CartItem } from '../context/CartContext';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  onSuccess: () => void;
};

type CreatedOrder = {
  order_number: string;
  subtotal: number;
  customerName: string;
  customerPhone: string;
  orderedAt: Date;
  items: { name: string; quantity: number; unitPrice: number }[];
};

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  onSuccess,
}: CheckoutModalProps) {
  const { name, primaryAccent, pathFor } = useStorefront();
  const navigate = useNavigate();
  const pendingOrderStorageKey = `${name.toLowerCase()}-pending-order`;
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdOrder, setCreatedOrder] = useState<CreatedOrder | null>(() => {
    try {
      if (typeof window === 'undefined') return null;

      const savedOrder = window.localStorage.getItem(pendingOrderStorageKey);
      if (!savedOrder) return null;

      const parsedOrder = JSON.parse(savedOrder) as CreatedOrder;
      if (!parsedOrder.order_number || !Array.isArray(parsedOrder.items)) {
        window.localStorage.removeItem(pendingOrderStorageKey);
        return null;
      }

      return { ...parsedOrder, orderedAt: new Date(parsedOrder.orderedAt) };
    } catch {
      return null;
    }
  });
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
  });

  const handleContinue = () => {
    const nextErrors = {
      fullName: fullName.trim() ? '' : 'Please enter your full name.',
      phoneNumber: phoneNumber && isValidPhoneNumber(phoneNumber)
        ? ''
        : 'Please enter a valid WhatsApp number.',
    };

    setErrors(nextErrors);

    if (!nextErrors.fullName && !nextErrors.phoneNumber) {
      setShowConfirmation(true);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      setErrors((current) => ({
        ...current,
        phoneNumber: 'Please enter a valid WhatsApp number.',
      }));
      setShowConfirmation(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const orderSnapshot = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unitPrice: Number(item.price.replace(/[^0-9.]/g, '')),
    }));
    const orderedAt = new Date();

    try {
      const phone = phoneNumber.replace(/\D/g, '');

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: fullName.trim(),
          customer_phone: phone,
          storefront: name.toLowerCase(),
          items: cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const responseText = await response.text();
      let data: {
        error?: string;
        order?: { order_number: string; subtotal: number };
      } = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          // Handle empty or non-JSON server responses below.
        }
      }

      if (!response.ok) {
        throw new Error(
          data.error || 'We could not submit your order. Please try again.'
        );
      }

      if (!data.order) {
        throw new Error(
          'We could not confirm your order. Please try again in a moment.'
        );
      }

      const completedOrder: CreatedOrder = {
        ...data.order,
        customerName: fullName.trim(),
        customerPhone: phone,
        orderedAt,
        items: orderSnapshot,
      };

      try {
        window.localStorage.setItem(
          pendingOrderStorageKey,
          JSON.stringify(completedOrder)
        );
      } catch {
        // Keep the in-memory confirmation if browser storage is unavailable.
      }

      setCreatedOrder(completedOrder);
      setShowConfirmation(false);
      onSuccess();
    } catch (error) {
      setShowConfirmation(false);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your order. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };



  const getReceiptText = () => {
    if (!createdOrder) return '';

    const lines = [
      name,
      'ORDER CONFIRMATION',
      `Order: ${createdOrder.order_number}`,
      `Date: ${createdOrder.orderedAt.toLocaleString('en-ZA')}`,
      '',
      'ITEMS',
      ...createdOrder.items.map(
        (item) =>
          `${item.name} | ${item.quantity} x R ${item.unitPrice.toFixed(2)} = R ${(item.quantity * item.unitPrice).toFixed(2)}`
      ),
      '',
      `Subtotal: R ${Number(createdOrder.subtotal).toFixed(2)}`,
      '',
      'Thank you for your order.',
      'We will contact you on WhatsApp to arrange payment and delivery.',
    ];

    return lines.join('\n');
  };

  const createReceiptPdf = () => {
    if (!createdOrder) return null;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;

    const hex = primaryAccent.replace('#', '');
    const accent = [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ] as [number, number, number];

    const money = (value: number) => `R ${value.toFixed(2)}`;

    const drawTableHeader = (y: number) => {
      pdf.setFillColor(245, 245, 245);
      pdf.roundedRect(margin, y, contentWidth, 11, 2, 2, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('PRODUCT', margin + 4, y + 7);
      pdf.text('QTY', 133, y + 7, { align: 'right' });
      pdf.text('UNIT PRICE', 160, y + 7, { align: 'right' });
      pdf.text('TOTAL', pageWidth - margin - 4, y + 7, { align: 'right' });

      return y + 17;
    };

    // Branded header.
    pdf.setFillColor(...accent);
    pdf.rect(0, 0, pageWidth, 51, 'F');

    pdf.setFillColor(...accent);
    pdf.rect(0, 51, pageWidth, 2, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(23);
    pdf.text(name, margin, 23);

    // Customer details on the right side of the header.
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');

    let customerNameSize = 16;
    pdf.setFontSize(customerNameSize);

    const customerNameMaxWidth = contentWidth / 2;
    while (
      pdf.getTextWidth(createdOrder.customerName) > customerNameMaxWidth &&
      customerNameSize > 9
    ) {
      customerNameSize -= 0.5;
      pdf.setFontSize(customerNameSize);
    }

    pdf.text(
      createdOrder.customerName,
      pageWidth - margin,
      23,
      { align: 'right' }
    );

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(
      'Thank you for your order',
      pageWidth - margin,
      35,
      { align: 'right' }
    );

    pdf.text(
      createdOrder.customerPhone,
      pageWidth - margin,
      45,
      { align: 'right' }
    );

    // Order information.
    pdf.setTextColor(90, 90, 90);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text('ORDER NUMBER', margin, 69);
    pdf.text('ORDER CONFIRMATION', pageWidth / 2, 69, { align: 'center' });
    pdf.text('ORDER DATE', pageWidth - margin, 69, { align: 'right' });

    pdf.setTextColor(43, 43, 43);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(createdOrder.order_number, margin, 77);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(
      createdOrder.orderedAt.toLocaleDateString('en-ZA', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      pageWidth - margin,
      77,
      { align: 'right' }
    );

    // Items section.
    pdf.setTextColor(43, 43, 43);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('Order details', margin, 98);

    let y = drawTableHeader(105);

    createdOrder.items.forEach((item) => {
      const nameLines = pdf.splitTextToSize(item.name, 91);
      const rowHeight = Math.max(13, nameLines.length * 5 + 7);

      if (y + rowHeight > pageHeight - 32) {
        pdf.addPage();
        y = 22;
        y = drawTableHeader(y);
      }

      pdf.setTextColor(55, 55, 55);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(nameLines, margin + 4, y);

      pdf.setFontSize(8);
      pdf.text(String(item.quantity), 133, y, { align: 'right' });
      pdf.text(money(item.unitPrice), 160, y, { align: 'right' });
      pdf.setFont('helvetica', 'bold');
      pdf.text(
        money(item.quantity * item.unitPrice),
        pageWidth - margin - 4,
        y,
        { align: 'right' }
      );

      y += rowHeight;

      pdf.setDrawColor(235, 235, 235);
      pdf.line(margin, y - 3, pageWidth - margin, y - 3);
    });

    // Subtotal panel.
    if (y + 35 > pageHeight - 28) {
      pdf.addPage();
      y = 25;
    }

    y += 5;
    pdf.setFillColor(247, 247, 247);
    pdf.roundedRect(margin, y, contentWidth, 27, 2, 2, 'F');

    pdf.setTextColor(85, 85, 85);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Subtotal', margin + 5, y + 11);

    pdf.setTextColor(...accent);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text(
      money(Number(createdOrder.subtotal)),
      pageWidth - margin - 5,
      y + 17,
      { align: 'right' }
    );

    // Footer.
    const footerY = pageHeight - 17;
    pdf.setDrawColor(230, 230, 230);
    pdf.line(margin, footerY - 7, pageWidth - margin, footerY - 7);

    pdf.setTextColor(105, 105, 105);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text('We will contact you on WhatsApp to arrange payment and delivery.', margin, footerY);

    pdf.setTextColor(...accent);
    pdf.setFont('helvetica', 'bold');
    pdf.text(name, pageWidth - margin, footerY + 7, { align: 'right' });

    return pdf;
  };

  const getReceiptFileName = () => {
    if (!createdOrder) return 'order-confirmation.pdf';

    const storeFileName = name
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '');

    return `${storeFileName}-${createdOrder.order_number}-confirmation.pdf`;
  };

  const downloadReceipt = () => {
    const pdf = createReceiptPdf();
    if (!pdf || !createdOrder) return;

    pdf.save(getReceiptFileName());
    handleContinueShopping();
  };

  const shareReceipt = async () => {
    if (!createdOrder) return;

    const pdf = createReceiptPdf();
    if (!pdf) return;

    const file = new File(
      [pdf.output('blob')],
      getReceiptFileName(),
      { type: 'application/pdf' }
    );

    try {
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `${name} order confirmation`,
          text: `Order ${createdOrder.order_number}`,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `${name} order confirmation`,
          text: getReceiptText(),
        });
      } else {
        await navigator.clipboard.writeText(getReceiptText());
      }
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) {
        await navigator.clipboard.writeText(getReceiptText());
      }
    } finally {
      handleContinueShopping();
    }
  };

  const handleContinueShopping = () => {
    try {
      window.localStorage.removeItem(pendingOrderStorageKey);
    } catch {
      // Continue navigation even if browser storage is unavailable.
    }

    setCreatedOrder(null);
    onClose();
    navigate(pathFor(''));
  };

  const inputClass =
    'w-full border-0 bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d] outline-none placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0';

  const labelClass =
    'mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40';

  return (
    <>
    <Modal isOpen={isOpen || !!createdOrder} onClose={onClose} maxWidth="max-w-lg">
      <div className="p-6 sm:p-8">
        {createdOrder ? (
          <div className="py-5 text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: `${primaryAccent}20`, color: primaryAccent }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 className="mt-6 font-heading text-2xl font-semibold text-[#4d4d4d]">
              Order placed successfully.
            </h2>

            <p className="mx-auto mt-3 max-w-sm font-heading text-sm leading-6 text-[#4d4d4d]/65">
              Thank you for choosing us. We'll contact you on WhatsApp to arrange payment and delivery.
            </p>

            <p className="mx-auto mt-3 max-w-sm font-heading text-sm leading-6 text-[#4d4d4d]/65">
              We recommend saving or sharing your confirmation receipt for future reference.
            </p>

            <div className="mx-auto mt-7 max-w-xs border-y border-[#4d4d4d]/10 py-5">
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4d4d4d]/45">
                Order reference
              </p>
              <p className="mt-2 font-heading text-xl font-semibold text-[#4d4d4d]">
                {createdOrder.order_number}
              </p>
              <p className="mt-3 font-heading text-lg tabular-nums text-[#4d4d4d]">
                R {Number(createdOrder.subtotal).toFixed(2)}
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={downloadReceipt}
                className="flex h-11 items-center justify-center border border-[#4d4d4d]/10 bg-[#f5f5f5] font-heading text-sm text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]"
              >
                Save receipt
              </button>
              <button
                type="button"
                onClick={shareReceipt}
                className="flex h-11 items-center justify-center border border-[#4d4d4d]/10 bg-[#f5f5f5] font-heading text-sm text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]"
              >
                Share receipt
              </button>
            </div>

          </div>
        ) : (
          <>
        <h2 className="text-2xl font-bold text-[#4d4d4d]">
          Checkout
        </h2>

        <div className="mt-6">
          <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
            {cartItems.map((item) => {
              const unitPrice = Number(item.price.replace(/[^0-9.]/g, ''));

              return (
                <CheckoutItemCard
                  key={item.id}
                  name={item.name}
                  leftContent={
                    <>
                      <span className="font-heading tabular-nums">{item.quantity}</span>
                      {' × '}
                      <span className="font-heading tabular-nums">R {unitPrice.toFixed(2)}</span>
                    </>
                  }
                  rightContent={`R ${(unitPrice * item.quantity).toFixed(2)}`}
                  onClick={() => setSelectedProduct(item)}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between py-4">
            <span className="font-heading text-base text-[#4d4d4d]">
              Subtotal
            </span>
            <span className="font-heading text-xl font-semibold text-[#4d4d4d] tabular-nums">
              R {cartTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-4">
          <label className="block">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className={labelClass.replace('mb-1.5 ', '')}>
                Full Name {errors.fullName && <span className="text-red-600">*</span>}
              </span>
            </div>
            <input
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                if (event.target.value.trim()) {
                  setErrors((current) => ({ ...current, fullName: '' }));
                }
              }}
              className={inputClass}
              placeholder="Your full name"
              aria-invalid={Boolean(errors.fullName)}
            />
          </label>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="whatsapp-number" className={labelClass.replace('mb-1.5 ', '')}>
                WhatsApp Number {errors.phoneNumber && <span className="text-red-600">*</span>}
              </label>
            </div>

            <PhoneInput
              defaultCountry="ZA"
              value={phoneNumber || undefined}
              onChange={(value) => {
                const nextValue = value || '';
                setPhoneNumber(nextValue);

                if (nextValue && isValidPhoneNumber(nextValue)) {
                  setErrors((current) => ({ ...current, phoneNumber: '' }));
                }
              }}
              numberInputProps={{
                id: 'whatsapp-number',
                type: 'tel',
                autoComplete: 'tel',
                'aria-label': 'WhatsApp number',
                'aria-invalid': Boolean(errors.phoneNumber),
                placeholder: '71 234 5678',
                className:
                  'h-full min-w-0 flex-1 border-0 bg-transparent p-0 font-heading text-base text-[#4d4d4d] outline-none placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0',
              }}
              className="flex h-12 w-full items-center gap-3 bg-[#f5f5f5] px-4"
            />

            {errors.phoneNumber && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.phoneNumber}
              </p>
            )}
          </div>


        </div>

        <div className="mt-7 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 flex-1 items-center justify-center bg-[#f5f5f5] font-heading text-base text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="flex h-12 flex-1 items-center justify-center border border-[#4d4d4d] bg-[#4d4d4d] font-heading text-base text-white transition-colors hover:bg-[#3b3b3b]"
          >
            Continue
          </button>
        </div>
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirmation && !createdOrder}
        title="Confirm your order"
        message={`Submit your order for R ${cartTotal.toFixed(2)}? We'll contact you on WhatsApp to arrange payment and delivery.`}
        confirmText="Submit"
        cancelText="Back"
        variant="grey"
        isLoading={isSubmitting}
        onConfirm={handleSubmit}
        onCancel={() => {
          if (!isSubmitting) setShowConfirmation(false);
        }}
      />
    </Modal>

    <Modal
      isOpen={Boolean(submitError)}
      onClose={() => setSubmitError('')}
      maxWidth="max-w-sm"
    >
      <div className="p-6 sm:p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
          <span className="font-heading text-xl text-[#8a7770]">!</span>
        </div>

        <h2 className="mt-5 font-heading text-xl font-semibold text-[#4d4d4d]">
          Order not submitted
        </h2>

        <p role="alert" className="mt-3 font-heading text-sm leading-6 text-[#4d4d4d]/65">
          {submitError}
        </p>

        <button
          type="button"
          onClick={() => setSubmitError('')}
          className="mt-7 flex h-12 w-full items-center justify-center bg-[#4d4d4d] font-heading text-base text-white transition-colors hover:bg-[#3b3b3b]"
        >
          Close
        </button>
      </div>
    </Modal>

    <ProductModal
      product={selectedProduct}
      bgColor="bg-white"
      placeholderColor={selectedProduct?.placeholderColor ?? ''}
      accentColor={primaryAccent === "#ff1493" ? "text-[#ff1493]" : "text-[#8aa89b]"}
      isDark={false}
      mode="preview"
      onClose={() => setSelectedProduct(null)}
    />
    </>
  );
}
