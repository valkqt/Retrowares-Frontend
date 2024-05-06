import { createContext, useContext } from "react";
import { CartItem, Product } from "@/types";

type CartContextData = [CartItem[], (product: Product) => void]

export const CartContext = createContext<CartContextData>([[], () => {}]);

export const useCart = () => useContext(CartContext);