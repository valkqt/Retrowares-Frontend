import { PropsWithChildren, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { CartContext } from "./CartContext";
import { useUser } from "./UserContext";
import { addToDbCart } from "@/api";

export function CartProvider({ children }: PropsWithChildren) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user] = useUser();


    useEffect(() => {
        const storage = localStorage.getItem("cart")
        const readCart = storage !== null ? JSON.parse(storage) : []
        setCart(readCart);

    }, [cart.length])

    function addToCart(product: Product): void {
        const existingItemIndex = cart.findIndex(i => i.product.id === product.id)

        if (existingItemIndex >= 0 && product.stock > cart[existingItemIndex].quantity) {
            cart[existingItemIndex].quantity++;
            const newCart = [...cart];
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return;
        }

        if (user) {
            addToDbCart({productId: product.id, userId: user.id, quantity: 1}).then(() => {
                const newCart = [...cart, {
                    product: {...product},
                    quantity: 1
                }];
        
                setCart(newCart);
            })
            
        } else {
            const newCart = [...cart, {
                product: {...product},
                quantity: 1
            }];
    
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));

        }


        return
    }

    function removeFromCart(id: number): void {
        const existingItemIndex = cart.findIndex(i => i.product.id === id)

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
        const existingItemIndex = cart.findIndex(i => i.product.id === id)

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