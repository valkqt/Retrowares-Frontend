import { Product } from "@/types";
import { useUser, useCart } from "@/contexts";
import { addToUserCart } from "@/api";

type UseAddToCartReturn = (product: Product) => Promise<void>;


export default function useAddToCart(): UseAddToCartReturn {
    const [user] = useUser();
    const [, addToCart] = useCart();
  
    return (product: Product) => {
      if (user) {
        return addToUserCart(user!.id, product.id).then(() => addToCart(product));
      } else {
        const newCart = addToCart(product);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return Promise.resolve();
      }
    };
  }
  