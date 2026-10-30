import { useState } from 'react';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';
import ProductModal from './ProductModal';
import type { CartItem } from '../context/CartContext';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  onSuccess: () => void;
};

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  onSuccess,
}: CheckoutModalProps) {
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+27');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdOrder, setCreatedOrder] = useState<{
    order_number: string;
    subtotal: number;
  } | null>(null);
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
  });

  const handleContinue = () => {
    const nextErrors = {
      fullName: fullName.trim() ? '' : 'Please enter your full name.',
      phoneNumber: phoneNumber.trim() ? '' : 'Please enter your WhatsApp number.',
    };

    setErrors(nextErrors);

    if (!nextErrors.fullName && !nextErrors.phoneNumber) {
      setShowConfirmation(true);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const phone = `${countryCode.replace(/\\D/g, '')}${phoneNumber.replace(/\\D/g, '')}`;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: fullName.trim(),
          customer_phone: phone,
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

      setCreatedOrder(data.order);
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



  const inputClass =
    'w-full border-0 bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d] outline-none placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0';

  const labelClass =
    'mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40';

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="p-6 sm:p-8">
        {createdOrder ? (
          <div className="py-6 text-center">
            <h2 className="text-2xl font-bold text-[#4d4d4d]">
              Order received.
            </h2>
            <p className="mt-4 font-heading text-base text-[#4d4d4d]/70">
              Thank you. Your order has been saved successfully.
            </p>
            <p className="mt-6 font-heading text-sm uppercase tracking-widest text-[#4d4d4d]/50">
              Order number
            </p>
            <p className="mt-2 font-heading text-xl font-semibold text-[#4d4d4d]">
              {createdOrder.order_number}
            </p>
            <p className="mt-3 font-heading text-lg text-[#4d4d4d]">
              R {Number(createdOrder.subtotal).toFixed(2)}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 flex h-12 w-full items-center justify-center bg-[#f5f5f5] font-heading text-base text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
        <h2 className="text-2xl font-bold text-[#4d4d4d]">
          Checkout
        </h2>

        <div className="mt-6">
          <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
            {cartItems.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setSelectedProduct(item)}
                aria-label={`View ${item.name} details`}
                className="m-0 flex w-full flex-col gap-1 border-b border-[#4d4d4d]/20 bg-[#fafaf9] px-4 py-3 text-left leading-normal transition-colors hover:bg-[#f5f5f5]"
              >
                <p className="m-0 p-0 font-heading text-base leading-normal text-[#4d4d4d]">
                  {item.name}
                </p>

                <div className="m-0 flex items-center justify-between gap-4 p-0 leading-normal">
                  <p className="m-0 p-0 text-base leading-normal text-[#4d4d4d]/60">
                    <span className="font-heading tabular-nums">{item.quantity}</span>
                    {' × '}
                    <span className="font-heading tabular-nums">R {Number(item.price.replace(/[^0-9.]/g, '')).toFixed(2)}</span>
                  </p>

                  <p className="m-0 shrink-0 whitespace-nowrap p-0 text-right font-heading text-base leading-normal tabular-nums text-[#4d4d4d]/60">
                    R {(Number(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
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

            <div className="flex w-full items-center gap-3">
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel-country-code"
                value={countryCode}
                onChange={(event) => {
                  const value = event.target.value;
                  setCountryCode(value.startsWith('+') ? value : `+${value.replace(/\+/g, '')}`);
                }}
                placeholder="+27"
                aria-label="Country calling code"
                className="h-12 w-24 shrink-0 border-0 bg-[#f5f5f5] px-4 font-heading text-base text-[#4d4d4d] outline-none placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0"
              />

              <input
                id="whatsapp-number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                  if (event.target.value.trim()) {
                    setErrors((current) => ({ ...current, phoneNumber: '' }));
                  }
                }}
                placeholder="71 234 5678"
                aria-label="WhatsApp number"
                aria-invalid={Boolean(errors.phoneNumber)}
                className="h-12 min-w-0 flex-1 border-0 bg-[#f5f5f5] px-4 font-heading text-base text-[#4d4d4d] outline-none placeholder:text-[#4d4d4d]/40 focus:outline-none focus:ring-0"
              />
            </div>
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
      accentColor="text-[#8aa89b]"
      isDark={false}
      mode="preview"
      onClose={() => setSelectedProduct(null)}
    />
    </>
  );
}
