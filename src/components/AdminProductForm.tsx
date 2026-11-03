import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';
import Modal from './Modal';
import CustomDropdown from './CustomDropdown';

export type AdminProduct = {
  id?: string;
  storefront: 'yotaabo' | 'poshies';
  name: string;
  price: number;
  category: 'His' | 'Hers' | 'Spaces';
  subcategory: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
};

type AdminProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  productToEdit?: AdminProduct | null;
};

const SUBCATEGORY_OPTIONS: Record<
  'yotaabo' | 'poshies',
  Record<string, string[]>
> = {
  yotaabo: {
    His: ['Eau de Parfum', 'Roll-On', 'Deodorant'],
    Hers: ['Eau de Parfum', 'Roll-On', 'Deodorant'],
    Spaces: ['Home', 'Car', 'Freshness'],
  },
  poshies: {
    His: ['Boxers', 'Briefs', 'Trunks'],
    Hers: ['Bras', 'Panties', 'Bikinis', 'G-Strings', 'Matching Sets', 'Lingerie'],
    Spaces: ['Pyjamas', 'Nightwear', 'Dressing Gowns', 'Robes', 'Lounge Sets'],
  },
};

const DRAFT_STORAGE_KEY = 'yotaabo-admin-product-form-draft';

const getProductStoragePath = (imageUrl: string | null | undefined) => {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);
    const marker = '/storage/v1/object/public/products/';
    const index = url.pathname.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch {
    return null;
  }
};

const emptyProduct: AdminProduct = {
  storefront: 'yotaabo',
  name: '',
  price: 0,
  category: '' as any,
  subcategory: '',
  description: '',
  image_url: '',
  is_active: true,
  sort_order: 0,
};

export default function AdminProductForm({
  isOpen,
  onClose,
  onSaved,
  productToEdit,
}: AdminProductFormProps) {
  const [form, setForm] = useState<AdminProduct>(emptyProduct);
  const [statusValue, setStatusValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDraftHydrated, setIsDraftHydrated] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsDraftHydrated(false);
      return;
    }

    setIsDraftHydrated(false);

    try {
      const raw = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      const saved = raw
        ? JSON.parse(raw) as {
            productId: string | null;
            form: AdminProduct;
            statusValue: string;
          }
        : null;

      const currentProductId = productToEdit?.id ?? null;

      if (
        saved &&
        saved.productId === currentProductId &&
        saved.form
      ) {
        setForm({
          ...emptyProduct,
          ...saved.form,
          storefront: saved.form.storefront === 'poshies' ? 'poshies' : 'yotaabo',
        });
        setStatusValue(saved.statusValue ?? '');
      } else {
        setForm(productToEdit
          ? {
              ...emptyProduct,
              ...productToEdit,
              storefront: productToEdit.storefront === 'poshies' ? 'poshies' : 'yotaabo',
            }
          : { ...emptyProduct });
        setStatusValue(
          productToEdit
            ? productToEdit.is_active ? 'active' : 'hidden'
            : ''
        );
      }
    } catch {
      setForm(productToEdit
        ? {
            ...emptyProduct,
            ...productToEdit,
            storefront: productToEdit.storefront === 'poshies' ? 'poshies' : 'yotaabo',
          }
        : { ...emptyProduct });
      setStatusValue(
        productToEdit
          ? productToEdit.is_active ? 'active' : 'hidden'
          : ''
      );
    }

    setIsDraftHydrated(true);
  }, [isOpen, productToEdit]);

  useEffect(() => {
    if (!isOpen || !isDraftHydrated) return;

    try {
      sessionStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({
          productId: productToEdit?.id ?? null,
          form,
          statusValue,
        })
      );
    } catch {
      // Storage may be unavailable; the form remains usable.
    }
  }, [isOpen, isDraftHydrated, form, statusValue, productToEdit]);

  const handleClose = () => {
    try {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore storage errors when closing.
    }

    setIsDraftHydrated(false);
    onClose();
  };

  const handleChange = (field: keyof AdminProduct, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'category' || field === 'storefront') {
        const storefront =
          field === 'storefront'
            ? value as 'yotaabo' | 'poshies'
            : updated.storefront;

        updated.subcategory =
          SUBCATEGORY_OPTIONS[storefront]?.[updated.category]?.[0] ?? '';
      }
      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];

      if (!supportedTypes.includes(file.type)) {
        throw new Error('Please select a JPEG, PNG, or WebP image.');
      }

      const optimizedFile = await new Promise<File>((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();

        const cleanup = () => URL.revokeObjectURL(objectUrl);

        image.onload = () => {
          try {
            const maxDimension = 1600;
            const scale = Math.min(
              1,
              maxDimension / Math.max(image.naturalWidth, image.naturalHeight)
            );

            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

            const context = canvas.getContext('2d');

            if (!context) {
              throw new Error('Could not process this image.');
            }

            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
              (blob) => {
                cleanup();

                if (!blob || blob.type !== 'image/webp') {
                  reject(new Error('Your browser could not convert this image to WebP.'));
                  return;
                }

                const filename = file.name.replace(/\.[^.]+$/, '') || 'product';

                resolve(
                  new File([blob], `${filename}.webp`, {
                    type: 'image/webp',
                    lastModified: Date.now(),
                  })
                );
              },
              'image/webp',
              0.82
            );
          } catch (error) {
            cleanup();
            reject(error);
          }
        };

        image.onerror = () => {
          cleanup();
          reject(new Error('Could not read this image. Try another file.'));
        };

        image.src = objectUrl;
      });

      const path = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`;

      const { error } = await supabase.storage
        .from('products')
        .upload(path, optimizedFile, {
          cacheControl: '31536000',
          contentType: 'image/webp',
          upsert: false,
        });

      if (error) {
        throw new Error(error.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('products').getPublicUrl(path);

      setForm((prev) => ({ ...prev, image_url: publicUrl }));
      toast.success('Image optimised and uploaded');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unexpected error occurred.';

      toast.error('Image upload failed: ' + message);
    } finally {
      setIsUploading(false);
      input.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error('Name is required');
    if (form.price <= 0) return toast.error('Price must be greater than 0');
    if (!statusValue) return toast.error('Status is required');
    if (!form.category) return toast.error('Category is required');
    if (!form.subcategory) return toast.error('Subcategory is required');

    setIsSaving(true);
    const payload = {
      storefront: form.storefront,
      name: form.name.trim(),
      price: form.price,
      category: form.category,
      subcategory: form.subcategory,
      description: form.description?.trim() || null,
      image_url: form.image_url?.trim() || null,
      is_active: form.is_active,
      sort_order: form.sort_order,
    };

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const response = await fetch('/api/products', {
        method: productToEdit?.id ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          ...payload,
          ...(productToEdit?.id ? { id: productToEdit.id } : {}),
        }),
      });

      const responseText = await response.text();
      let data: { error?: string; product?: AdminProduct } = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          // Handle non-JSON server responses below.
        }
      }

      if (!response.ok) {
        throw new Error(data.error || 'Unable to save the product.');
      }

      if (!data.product) {
        throw new Error('The server did not confirm the saved product.');
      }

      if (
        productToEdit?.image_url &&
        productToEdit.image_url !== payload.image_url
      ) {
        const oldImagePath = getProductStoragePath(productToEdit.image_url);

        if (oldImagePath) {
          const { error: deleteError } = await supabase.storage
            .from('products')
            .remove([oldImagePath]);

          if (deleteError) {
            console.error('Previous product image could not be deleted:', deleteError);
            toast.error('Product saved, but the previous image could not be deleted.');
          }
        }
      }

      toast.success(productToEdit ? 'Product updated' : 'Product added');
      onSaved();
      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Unable to save the product.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    'w-full border-0 bg-[#f5f5f5] px-4 py-3 admin-type-body text-[#4d4d4d] outline-none ring-0 transition-colors placeholder:text-[#4d4d4d]/40 focus:border-0 focus:outline-none focus:ring-0';

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6 sm:p-8">
        <h2 className="admin-type-section-title text-[#4d4d4d]">
          {productToEdit ? 'Edit Product' : 'Add Product'}
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Name</span>
            <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} className={inputClass} placeholder="e.g. Noir Oud" />
          </label>

          <label className="block">
            <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Storefront</span>
            <CustomDropdown
              value={form.storefront}
              onChange={(value) => handleChange('storefront', value)}
              options={[
                { value: 'yotaabo', label: 'Yotaabo' },
                { value: 'poshies', label: 'Poshies' },
              ]}
              placeholder="Select storefront"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Price (R)</span>
              <input type="number" value={form.price || ''} onChange={(e) => handleChange('price', Number(e.target.value))} className={`${inputClass} admin-type-price`} placeholder="0" />
            </label>

            <label className="block">
              <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Status</span>
              <CustomDropdown
                value={statusValue}
                onChange={(v) => { setStatusValue(v); handleChange('is_active', v === 'active'); }}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'hidden', label: 'Hidden' },
                ]}
                placeholder="Select"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Category</span>
              <CustomDropdown
                value={form.category}
                onChange={(v) => handleChange('category', v)}
                options={[
                  { value: 'His', label: 'His' },
                  { value: 'Hers', label: 'Hers' },
                  { value: 'Spaces', label: 'Spaces' },
                ]}
                placeholder="Select"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Subcategory</span>
              <CustomDropdown
                value={form.subcategory}
                onChange={(v) => handleChange('subcategory', v)}
                options={(SUBCATEGORY_OPTIONS[form.storefront]?.[form.category] ?? []).map((sub) => ({
                  value: sub,
                  label: sub,
                }))}
                placeholder="Select"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Description</span>
            <textarea rows={3} value={form.description ?? ''} onChange={(e) => handleChange('description', e.target.value)} className={`resize-none ${inputClass}`} placeholder="Write a short product description..." />
          </label>

          <div>
            <span className="mb-1.5 block admin-type-micro font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Product Image</span>

            <div className="flex gap-2">
              <input
                type="url"
                value={form.image_url ?? ''}
                onChange={(e) => handleChange('image_url', e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />

              <label className={`flex h-[46px] shrink-0 cursor-pointer items-center justify-center border-0 bg-[#4d4d4d] px-4 admin-type-body text-white transition-colors hover:bg-[#3a3a3a] ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}>
                {isUploading ? '...' : form.image_url?.trim() ? 'Change' : 'Upload'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            {form.image_url?.trim() && (
              <div className="mt-3 flex h-40 w-full items-center justify-center overflow-hidden bg-[#f5f5f5] p-3">
                <img
                  src={form.image_url}
                  alt="Product preview"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={handleClose} className="flex h-12 flex-1 items-center justify-center border-0 bg-[#f5f5f5] admin-type-body text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]">
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} disabled={isSaving} className="flex h-12 flex-1 items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] admin-type-body text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d] disabled:opacity-50">
              {isSaving ? (
                <span className="flex items-center gap-1">
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                </span>
              ) : productToEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
