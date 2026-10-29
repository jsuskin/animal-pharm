import { create } from "zustand";
import type {
  LotInput,
  Product,
  ScannedItem,
  TransactionType,
  SortBy,
  SortDirection,
} from "@/utils/types";

/*** 

 ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░
    ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░     
    ░▒▓█▓▒░    ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓██████▓▒░  
    ░▒▓█▓▒░      ░▒▓█▓▒░   ░▒▓█▓▒░      ░▒▓█▓▒░       
    ░▒▓█▓▒░      ░▒▓█▓▒░   ░▒▓█▓▒░      ░▒▓████████▓▒░

    ***/

interface Store {
  inventory: Product[];
  sort: { by: SortBy; direction: SortDirection };
  setSortDirection: (direction: SortDirection) => void;
  setSortBy: (by: SortBy) => void;
  setProducts: (products: Product[]) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: string) => void;
  scanner: {
    queue: ScannedItem[];
    mode: TransactionType | null;
    currentQueueIndex: number;
    recovery: ScannedItem[];
  };
  startScanner: (mode: TransactionType) => void;
  stopScanner: () => void;
  addToScannedQueue: (newItem: ScannedItem) => void;
  setCurrentQueueIndex: (idx: number) => void;
  removeFromScannedQueue: (idx: number) => void;
  clearQueue: () => void;
  swapQueueAndRecovery: () => void;
  copyQueueToRecovery: () => void;
  updateNameAndIdInQueue: (idx: number, id: string, displayName: string) => void;
  updateQuantityInQueue: (queueIdx: number, quantity: number) => void;
  updateItemNoteInQueue: (queueIdx: number, note: string) => void;
  addNewEmptyLotObjectInQueue: (queueIdx: number) => void;
  updateLotNumberInLot: (queueIdx: number, lotIdx: number, lotNumber: string) => void;
  updateQuantityInLot: (queueIdx: number, lotIdx: number, quantity: number) => void;
  updateNoteInLot: (queueIdx: number, lotIdx: number, note: string) => void;
  updateExpirationDateInLot: (queueIdx: number, lotIdx: number, expirationDate: string) => void;
}

/*** 

░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░▒▓████████▓ 
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░     
░▒▓██████▓▒░  ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░  ░▒▓█▓▒░   
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░   
░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░       ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░ 
    
    ***/

const scannedQueueDefaultState = { queue: [], mode: null, currentQueueIndex: -1, recovery: [] };

export const useStore = create<Store>((set) => ({
  inventory: [],
  sort: { by: "updated_at", direction: "ascending" },
  setSortDirection: (direction: SortDirection) =>
    set((state) => ({ sort: { by: state.sort.by, direction } })),
  setSortBy: (by: SortBy) => set((state) => ({ sort: { by, direction: state.sort.direction } })),
  setProducts: (products: Product[]) => set({ inventory: products }),
  addProduct: (newProduct) => set((state) => ({ inventory: [...state.inventory, newProduct] })),
  deleteProduct: (id) =>
    set((state) => ({ inventory: state.inventory.filter((product) => product.id !== id) })),
  scanner: scannedQueueDefaultState,
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
  clearQueue: () =>
    set((state) => ({
      scanner: { ...scannedQueueDefaultState, recovery: state.scanner.recovery },
    })),
  swapQueueAndRecovery: () =>
    set((state) => ({
      scanner: {
        ...state.scanner,
        queue: structuredClone(state.scanner.recovery),
        recovery: structuredClone(state.scanner.queue),
      },
    })),
  copyQueueToRecovery: () =>
    set((state) => ({
      scanner: { ...state.scanner, recovery: structuredClone(state.scanner.queue) },
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
