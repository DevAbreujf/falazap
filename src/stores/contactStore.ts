
import { create } from 'zustand';
import { Contact, ContactFilter, ContactSort } from '@/types/contacts';

interface ContactStore {
  contacts: Contact[];
  filters: ContactFilter;
  sort: ContactSort;
  loading: boolean;
  error: string | null;
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Contact) => void;
  updateContact: (id: string, data: Partial<Contact>) => void;
  removeContact: (id: string) => void;
  setFilters: (filters: ContactFilter) => void;
  setSort: (sort: ContactSort) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  filters: {},
  sort: { field: 'createdAt', direction: 'desc' },
  loading: false,
  error: null,
  setContacts: (contacts) => set({ contacts }),
  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, contact],
    })),
  updateContact: (id, data) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...data } : contact
      ),
    })),
  removeContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
