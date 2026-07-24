import { create } from "zustand";
import type { Product } from "@/utils/types";

interface Store {
  inventory: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (newProduct: Product) => void;
}

export const useStore = create<Store>((set) => ({
  inventory: [],
  setProducts: (products: Product[]) => set({ inventory: products }),
  addProduct: (newProduct) => set((state) => ({ inventory: [...state.inventory, newProduct] })),
}));
