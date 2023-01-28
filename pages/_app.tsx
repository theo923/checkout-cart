import { Iitem } from "@/interface/checkout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";

export const CartContext = createContext<Iitem[]>([]);

const mockCart: Iitem[] = [
  {
    id: 310,
    quantity: 10,
  },
  {
    id: 764,
    quantity: 6,
  },
  {
    id: 3619,
    quantity: 2,
  },
  {
    id: 4699,
    quantity: 4,
  },
  {
    id: 13950,
    quantity: 4,
  },
  {
    id: 2717,
    quantity: 1,
  },
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContext.Provider value={mockCart}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
