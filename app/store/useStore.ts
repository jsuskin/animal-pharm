import { create } from "zustand";
import type { LotInput, Product, ScannedItem, TransactionType } from "@/utils/types";

interface Store {
  inventory: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: string) => void;
  scanner: { queue: ScannedItem[]; mode: TransactionType | null; currentQueueIndex: number };
  startScanner: (mode: TransactionType) => void;
  stopScanner: () => void;
  addToScannedQueue: (newItem: ScannedItem) => void;
  setCurrentQueueIndex: (idx: number) => void;
  removeFromScannedQueue: (idx: number) => void;
  updateNameAndIdInQueue: (idx: number, id: string, displayName: string) => void;
  updateQuantityInQueue: (queueIdx: number, quantity: number) => void;
  updateItemNoteInQueue: (queueIdx: number, note: string) => void;
  addNewEmptyLotObjectInQueue: (queueIdx: number) => void;
  updateLotNumberInLot: (queueIdx: number, lotIdx: number, lotNumber: string) => void;
  updateQuantityInLot: (queueIdx: number, lotIdx: number, quantity: number) => void;
  updateNoteInLot: (queueIdx: number, lotIdx: number, note: string) => void;
  updateExpirationDateInLot: (queueIdx: number, lotIdx: number, expirationDate: string) => void;
}

export const useStore = create<Store>((set) => ({
  inventory: [],
  setProducts: (products: Product[]) => set({ inventory: products }),
  addProduct: (newProduct) => set((state) => ({ inventory: [...state.inventory, newProduct] })),
  deleteProduct: (id) =>
    set((state) => ({ inventory: state.inventory.filter((product) => product.id !== id) })),
  scanner: { queue: [], mode: null, currentQueueIndex: -1 },
  startScanner: (mode) => set((state) => ({ scanner: { ...state.scanner, mode } })),
  stopScanner: () => set((state) => ({ scanner: { ...state.scanner, mode: null } })),
  addToScannedQueue: (newItem) =>
    set((state) => {
      const nextQueue = [...state.scanner.queue, newItem];

      return {
        scanner: { ...state.scanner, queue: nextQueue, currentQueueIndex: nextQueue.length - 1 },
      };
    }),
  setCurrentQueueIndex: (idx: number) =>
    set((state) => ({ scanner: { ...state.scanner, currentQueueIndex: idx } })),
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
  updateQuantityInQueue: (queueIdx, quantity) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) =>
          i === queueIdx ? { ...item, quantity } : item,
        ),
      },
    })),
  updateItemNoteInQueue: (queueIdx, note) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) => (i === queueIdx ? { ...item, note } : item)),
      },
    })),
  addNewEmptyLotObjectInQueue: (queueIdx) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) =>
          i === queueIdx
            ? {
                ...item,
                lots: [
                  ...(state.scanner.queue[queueIdx].lots ?? []),
                  { lotNumber: null, expirationDate: null, quantity: null, note: null },
                ],
              }
            : item,
        ),
      },
    })),
  updateLotNumberInLot: (queueIdx, lotIdx, lotNumber) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) =>
          i === queueIdx
            ? {
                ...item,
                lots: item.lots?.map((lot, j) => (j === lotIdx ? { ...lot, lotNumber } : lot)),
              }
            : item,
        ),
      },
    })),
  updateQuantityInLot: (queueIdx, lotIdx, quantity) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) =>
          i === queueIdx
            ? {
                ...item,
                lots: item.lots?.map((lot, j) => (j === lotIdx ? { ...lot, quantity } : lot)),
              }
            : item,
        ),
      },
    })),
  updateNoteInLot: (queueIdx, lotIdx, note) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) =>
          i === queueIdx
            ? {
                ...item,
                lots: item.lots?.map((lot, j) => (j === lotIdx ? { ...lot, note } : lot)),
              }
            : item,
        ),
      },
    })),
  updateExpirationDateInLot: (queueIdx, lotIdx, expirationDate) =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: state.scanner.queue.map((item, i) =>
          i === queueIdx
            ? {
                ...item,
                lots: item.lots?.map((lot, j) => (j === lotIdx ? { ...lot, expirationDate } : lot)),
              }
            : item,
        ),
      },
    })),
}));
