import { useState } from "react";
import { CheckoutForm } from "./components/CheckoutForm";
import { ProductRow } from "./components/ProductRow";
import { menu, type Product } from "./data/menu";
import { type Checkout } from "./types";

function App() {
  const [order, setOrder] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");

  let total = 0;
  order.forEach((product) => {
    total += product.price;
  });

  function formatPrice(price: number) {
    return `${price.toFixed(2).replace(".", ",")} €`;
  }

  function OnProductClick(product: Product) {
    setOrder((prev) => [
      ...prev,
      { ...product, id: Math.max(0, ...prev.map((item) => item.id)) + 1 },
    ]);
  }

  function OnConfirm(checkout: Checkout) {
    setMessage(
      `Ordine per ${checkout.nome} (${checkout.classe}), ritiro a ${checkout.ritiro}, ${checkout.pagamento}: ${formatPrice(total)}`,
    );
    setOrder([]);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-12">
        <h1 className="font-bold text-4xl text-center">Il bar della scuola</h1>

        <div className="w-xl flex flex-col gap-4 py-4">
          {menu.map((product) => (
            <ProductRow
              onClick={() => OnProductClick(product)}
              product={product}
              key={product.id}
            ></ProductRow>
          ))}
        </div>

        <div className="flex flex-col gap-4 py-4">
          <h1 className="font-bold text-center text-xl">Il tuo ordine</h1>
          {order.length === 0 && <p className="opacity-75">Ordine vuoto</p>}
          {order.map((product) => (
            <p key={product.id} className="capitalize">
              {product.name} - {formatPrice(product.price)}
            </p>
          ))}
          <p className="font-bold">Totale: {formatPrice(total)}</p>
        </div>

        {message && <p className="font-bold">{message}</p>}

        <CheckoutForm orderEmpty={order.length === 0} onConfirm={OnConfirm} />
      </div>
    </>
  );
}

export default App;