import { PropsWithChildren, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { CartContext } from "./CartContext";
import { useUser } from "./UserContext";
import { getUserData } from "@/api";
import { toast } from "react-toastify";

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [, setUser] = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null) {
      const storageCart = JSON.parse(localStorage.getItem("cart") ?? "[]")
      setCart(storageCart)
      
      return;
    }

    getUserData()
      .then((data) => {
        const user = data.data
        setCart(user.cart);
        setUser(user);
      })
      .catch(() => toast.error("Failed to retrieve user data."));

  }, [cart.length]);

  function addToCart(product: Product): CartItem[] {
    const existingItemIndex = cart.findIndex(
      (i) => i.product.id === product.id
    );
    if (
      existingItemIndex >= 0 &&
      product.stock > cart[existingItemIndex].quantity
    ) {
      cart[existingItemIndex].quantity++;
      const newCart = [...cart];
      setCart(newCart);

      return newCart;
    }

    const newCart = [
      ...cart,
      {
        product: { ...product },
        quantity: 1,
      },
    ];

    setCart(newCart);
    return newCart;
  }

  function removeFromCart(id: number): void {
    const existingItemIndex = cart.findIndex((i) => i.product.id === id);

    if (existingItemIndex >= 0) {
      cart.splice(existingItemIndex, 1);
      const newCart = [...cart];
      setCart(newCart);
    }
  }

  function modifyQuantity(id: number, operation: number): void {
    const existingItemIndex = cart.findIndex((i) => i.product.id === id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += operation;

      if (cart[existingItemIndex].quantity < 1) {
        cart[existingItemIndex].quantity = 1;
      }

      const newCart = [...cart];
      setCart(newCart);
    }
  }

  return (
    <CartContext.Provider
      value={[cart, addToCart, removeFromCart, modifyQuantity, setCart]}
    >
      {children}
    </CartContext.Provider>
  );
}
