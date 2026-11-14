import { useState } from 'react';
import type {
  StoreRequest,
  StoreRequestCategory,
  StoreRequestPriority,
  Storefront,
} from '../settings/categories/types';

type NewRequestInput = {
  storefront: Storefront;
  title: string;
  category: StoreRequestCategory;
  description: string;
  priority: StoreRequestPriority;
};

/**
 * Store requests — general tickets from store admins to the technical team.
 * Currently UI-only state. When backend lands, replace with API calls:
 *   - loadRequests(): GET /api/store-requests
 *   - addRequest(): POST /api/store-requests
 *   - updateRequestStatus(): PATCH /api/store-requests
 */
export function useStoreRequests() {
  const [requests, setRequests] = useState<StoreRequest[]>([]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const addRequest = (input: NewRequestInput) => {
    setError('');
    setNotice('');

    if (!input.title.trim() || !input.description.trim()) {
      setError('Title and description are required.');
      return false;
    }

    const newRequest: StoreRequest = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `req-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      storefront: input.storefront,
      title: input.title.trim(),
      category: input.category,
      description: input.description.trim(),
      priority: input.priority,
      status: 'open',
      created_at: new Date().toISOString(),
    };

    setRequests((prev) => [newRequest, ...prev]);
    setNotice('Request submitted');
    return true;
  };

  return { requests, addRequest, notice, error };
}
