import { createContext, useContext } from "react";
import { CartItem, Product } from "@/types";

type CartContextData = [CartItem[], (product: Product) => void, (id: number) => void, (id: number, operation: number) => void, (items: CartItem[]) => void]

export const CartContext = createContext<CartContextData>([[], () => {}, () => {}, () => {}, () => {}]);

export const useCart = () => useContext(CartContext);