import { useUser, useCart } from "@/contexts";
import { removeFromDbCart } from "@/api";
type UseRemoveFromCartReturn = (productId: number) => Promise<void>;


export default function useRemoveFromCart(): UseRemoveFromCartReturn {
    const [user] = useUser();
    const [cart, _, removeFromCart] = useCart();
  
    return (productId: number) => {
      if (user) {
        return removeFromDbCart(user!.id, productId).then(() => removeFromCart(productId));
      } else {
        removeFromCart(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        return Promise.resolve();
      }
    };
  }