import { useStore } from "../../store/useStore";
import type { Product } from "@/utils/types";
import ProductCard from "./ProductCard";

export default function Inventory() {
  const inventory: Product[] = useStore((state) => state.inventory);

  return (
    <ul>
      {inventory.map((product) => <ProductCard key={product.id} product={product} />)}
      <li className='relative p-3 h-24'></li>
    </ul>
  );
}
