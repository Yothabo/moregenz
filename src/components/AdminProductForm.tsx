import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';
import Modal from './Modal';
import CustomDropdown from './CustomDropdown';

export type AdminProduct = {
  id?: string;
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

const SUBCATEGORY_OPTIONS: Record<string, string[]> = {
  His: ['Eau de Parfum', 'Roll-On', 'Deodorant'],
  Hers: ['Eau de Parfum', 'Roll-On', 'Deodorant'],
  Spaces: ['Home', 'Car', 'Freshness'],
};

const emptyProduct: AdminProduct = {
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

  useEffect(() => {
    if (isOpen) {
      setForm(productToEdit ?? emptyProduct);
      if (productToEdit) {
        setStatusValue(productToEdit.is_active ? 'active' : 'hidden');
      } else {
        setStatusValue('');
      }
    }
  }, [isOpen, productToEdit]);

  const handleChange = (field: keyof AdminProduct, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'category') {
        updated.subcategory = SUBCATEGORY_OPTIONS[value]?.[0] ?? '';
      }
      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const { error } = await supabase.storage.from('products').upload(path, file);
    if (error) {
      toast.error('Upload failed: ' + error.message);
      setIsUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(path);
    setForm((prev) => ({ ...prev, image_url: publicUrl }));
    setIsUploading(false);
    toast.success('Image uploaded');
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error('Name is required');
    if (form.price <= 0) return toast.error('Price must be greater than 0');
    if (!statusValue) return toast.error('Status is required');
    if (!form.category) return toast.error('Category is required');
    if (!form.subcategory) return toast.error('Subcategory is required');

    setIsSaving(true);
    const payload = {
      name: form.name.trim(),
      price: form.price,
      category: form.category,
      subcategory: form.subcategory,
      description: form.description?.trim() || null,
      image_url: form.image_url?.trim() || null,
      is_active: form.is_active,
      sort_order: form.sort_order,
    };

    let error;
    if (productToEdit?.id) {
      ({ error } = await supabase.from('products').update(payload).eq('id', productToEdit.id));
    } else {
      ({ error } = await supabase.from('products').insert(payload));
    }

    setIsSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success(productToEdit ? 'Product updated' : 'Product added');
      onSaved();
      onClose();
    }
  };

  const inputClass =
    'w-full border-0 bg-[#f5f5f5] px-4 py-3 font-heading text-base text-[#4d4d4d] outline-none ring-0 transition-colors placeholder:text-[#4d4d4d]/40 focus:border-0 focus:outline-none focus:ring-0';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#4d4d4d]">
          {productToEdit ? 'Edit Product' : 'Add Product'}
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Name</span>
            <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} className={inputClass} placeholder="e.g. Noir Oud" />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Price (R)</span>
              <input type="number" value={form.price || ''} onChange={(e) => handleChange('price', Number(e.target.value))} className={inputClass} placeholder="0" />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Status</span>
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
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Category</span>
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
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Subcategory</span>
              <CustomDropdown
                value={form.subcategory}
                onChange={(v) => handleChange('subcategory', v)}
                options={(SUBCATEGORY_OPTIONS[form.category] ?? []).map((sub) => ({
                  value: sub,
                  label: sub,
                }))}
                placeholder="Select"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Description</span>
            <textarea rows={3} value={form.description ?? ''} onChange={(e) => handleChange('description', e.target.value)} className={`resize-none ${inputClass}`} placeholder="A short description of the fragrance..." />
          </label>

          <div>
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#4d4d4d]/40">Product Image</span>
            <div className="flex gap-2">
              <input type="url" value={form.image_url ?? ''} onChange={(e) => handleChange('image_url', e.target.value)} className={inputClass} placeholder="https://..." />
              <label className={`flex h-[46px] shrink-0 cursor-pointer items-center justify-center border-0 bg-[#4d4d4d] px-4 font-heading text-base text-white transition-colors hover:bg-[#3a3a3a] ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}>
                {isUploading ? '...' : 'Upload'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
              </label>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={onClose} className="flex h-12 flex-1 items-center justify-center border-0 bg-[#f5f5f5] font-heading text-base text-[#4d4d4d] transition-colors hover:bg-[#e5e5e5]">
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} disabled={isSaving} className="flex h-12 flex-1 items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] font-heading text-base text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d] disabled:opacity-50">
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
