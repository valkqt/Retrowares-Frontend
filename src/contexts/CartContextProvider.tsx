import { PropsWithChildren, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { CartContext } from "./CartContext";

export function CartProvider({ children }: PropsWithChildren) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const storage = localStorage.getItem("cart")
        const readCart = storage !== null ? JSON.parse(storage) : []
        setCart(readCart);
    }, [])

    function addToCart(product: Product): void {
        const existingItemIndex = cart.findIndex(i => i.productId === product.id)

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity++;
            const newCart = [...cart];
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return;
        }

        const newCart = [...cart, {
            title: product.title,
            productId: product.id,
            image: product.image,
            price: product.price,
            quantity: 1
        }];

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    function removeFromCart(id: number): void {
        const existingItemIndex = cart.findIndex(i => i.productId === id)

        if (existingItemIndex >= 0) {
            cart.splice(existingItemIndex, 1);
            const newCart = [...cart];
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return;
        }

        return;
    }

    function modifyQuantity(id: number, operation: number): void {
        const existingItemIndex = cart.findIndex(i => i.productId === id)

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += operation;

            if (cart[existingItemIndex].quantity < 1) {
                cart[existingItemIndex].quantity = 1
            }

            const newCart = [...cart];
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return;
        }

        return;
    }

    return (
        <CartContext.Provider value={[cart, addToCart, removeFromCart, modifyQuantity]}>
            {children}
        </CartContext.Provider>
    )
}