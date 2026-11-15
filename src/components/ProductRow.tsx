import { type Product } from "../data/menu";

type ProductRowProps = {
  product: Product;
  onClick: () => void;
};

export function ProductRow({ product, onClick }: ProductRowProps) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center px-4 py-2 border border-gray-400 rounded-lg"
    >
      <p className="font-bold capitalize">{product.name}</p>
      <p className="opacity-75">
        {product.price.toFixed(2).replace(".", ",")} €
      </p>
    </div>
  );
}