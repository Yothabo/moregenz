import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { FaOpencart } from 'react-icons/fa';
import RippleButton from '../components/RippleButton';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal';

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);

  const handleRemoveClick = (id: string, name: string) => {
    setItemToDelete({ id, name });
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const { id, name } = itemToDelete;
    setItemToDelete(null);
    setRemovingId(id);

    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
      toast.error(`${name} removed from cart`, {
        style: { background: '#4d4d4d', color: '#fff', borderRadius: 0 },
        iconTheme: { primary: '#fff', secondary: '#4d4d4d' },
      });
    }, 300);
  };

  return (
    <>
      <Header sticky={true} showBack={true} />
      <main className="flex min-h-screen flex-col bg-white px-6 pt-[88px] pb-12 sm:px-10 lg:px-12 lg:pt-[88px] lg:pb-20">
        <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col">

          {cartItems.length === 0 ? (
            <div className="mt-20 flex flex-col items-center justify-center text-center">
              {/* Cart Icon */}
              <FaOpencart size={64} className="text-[#8aa89b]" />

              {/* Heading */}
              <h2 className="mt-8 font-heading text-3xl italic text-black">
                Your cart is empty.
              </h2>

              {/* Paragraph */}
              <p className="mt-3 max-w-sm font-heading text-base leading-relaxed text-[#696964]">
                Looks like you haven't added a fragrance yet. Discover our collection and find a scent worth remembering.
              </p>

              {/* CTA */}
              <Link
                to="/catalog"
                className="mt-8 inline-flex min-h-12 items-center justify-center border border-solid border-[#8aa89b] bg-[#8aa89b] px-8 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-transparent hover:text-[#8aa89b]"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="mt-12 flex flex-1 flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-6 border-b border-black/10 pb-6 transition-all duration-300 ease-in-out ${
                    removingId === item.id
                      ? 'opacity-0 scale-95 translate-x-4 pointer-events-none'
                      : 'opacity-100 scale-100 translate-x-0'
                  }`}
                >
                  <div className={`h-24 w-24 shrink-0 ${item.placeholderColor}`}></div>

                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="flex w-full items-start justify-between gap-4">
                      <span className="font-heading text-xl text-black truncate">
                        {item.name}
                      </span>
                      <button
                        onClick={() => handleRemoveClick(item.id, item.name)}
                        aria-label="Remove item"
                        className="shrink-0 flex h-8 w-8 items-center justify-center text-black/30 transition-colors hover:text-red-500"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-4">
                      <span className="font-heading text-base text-[#8aa89b]">{item.price}</span>

                      <div className="flex items-center border border-black/10">
                        <RippleButton
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center text-black/50 transition-colors hover:text-black"
                          ariaLabel="Decrease quantity"
                        >
                          <FiMinus size={16} />
                        </RippleButton>
                        <span className="min-w-[1.75rem] text-center font-heading text-lg text-black">
                          {item.quantity}
                        </span>
                        <RippleButton
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center text-black/50 transition-colors hover:text-black"
                          ariaLabel="Increase quantity"
                        >
                          <FiPlus size={16} />
                        </RippleButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="sticky bottom-0 mt-6 flex flex-col items-end gap-4 border-t border-black/10 bg-white pt-4 pb-6">
                <div className="font-heading text-xl text-black">
                  Subtotal: <span className="font-medium">R {cartTotal.toFixed(0)}</span>
                </div>

                <div className="flex gap-4">
                  <Link
                    to="/catalog"
                    className="inline-flex min-h-12 items-center justify-center border border-solid border-[#4d4d4d] bg-transparent px-8 text-xs font-semibold tracking-wide text-[#4d4d4d] transition-colors hover:bg-[#4d4d4d] hover:text-white"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => setShowCheckoutConfirm(true)}
                    className="inline-flex min-h-12 items-center justify-center border border-solid border-[#8aa89b] bg-[#8aa89b] px-8 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-transparent hover:text-[#8aa89b]"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Remove from cart?"
        message={itemToDelete ? `Are you sure you want to remove "${itemToDelete.name}" from your cart? This action cannot be undone.` : ''}
        confirmText="Remove"
        cancelText="Keep it"
        variant="grey"
        onConfirm={confirmDelete}
        onCancel={() => setItemToDelete(null)}
      />

      <ConfirmModal
        isOpen={showCheckoutConfirm}
        title="Proceed to checkout?"
        message={`You're about to check out ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} for a total of R ${cartTotal.toFixed(0)}. Ready to continue?`}
        confirmText="Proceed"
        cancelText="Wait"
        variant="green"
        onConfirm={() => {
          setShowCheckoutConfirm(false);
          // TODO: What happens after confirmation?
        }}
        onCancel={() => setShowCheckoutConfirm(false)}
      />
    </>
  );
}
