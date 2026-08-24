import { create } from "zustand";
import type { Product, ScannedItem, TransactionType } from "@/utils/types";

interface Store {
  inventory: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: string) => void;
  scanner: { queue: ScannedItem[]; mode: TransactionType | null };
  startScanner: (mode: TransactionType) => void;
  stopScanner: () => void;
  scannedQueue: ScannedItem[];
  addToScannedQueue: (newItem: ScannedItem) => void;
  removeFromScannedQueue: (idx: number) => void;
  updateNameAndIdInQueue: (idx: number, id: string, displayName: string) => void;
  updateQuantityInQueue: (idx: number, qty: number) => void;
  updateItemNoteInQueue: (idx: number, note: string) => void;
}

export const useStore = create<Store>((set) => ({
  inventory: [],
  setProducts: (products: Product[]) => set({ inventory: products }),
  addProduct: (newProduct) => set((state) => ({ inventory: [...state.inventory, newProduct] })),
  deleteProduct: (id) =>
    set((state) => ({ inventory: state.inventory.filter((product) => product.id !== id) })),
  scanner: { queue: [], mode: null },
  startScanner: (mode) => set((state) => ({ scanner: { ...state.scanner, mode } })),
  stopScanner: () => set((state) => ({ scanner: { ...state.scanner, mode: null } })),
  scannedQueue: [],
  addToScannedQueue: (newItem) =>
    set((state) => ({ scanner: { ...state.scanner, queue: [...state.scanner.queue, newItem] } })),
  removeFromScannedQueue: (idx) =>
    set((state) => ({
      scanner: { ...state.scanner, queue: state.scanner.queue.filter((_, i) => i !== idx) },
    })),
  updateNameAndIdInQueue: (idx, id, displayName) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) =>
          i === idx ? { ...item, id, displayName } : item,
        ),
      },
    })),
  updateQuantityInQueue: (idx, qty) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) =>
          i === idx ? { ...item, quantity: qty } : item,
        ),
      },
    })),
  updateItemNoteInQueue: (idx, note) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) => (i === idx ? { ...item, note } : item)),
      },
    })),
}));
