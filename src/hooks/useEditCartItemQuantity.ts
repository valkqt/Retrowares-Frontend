import { useUser, useCart } from "@/contexts";
import { modifyDbCartQuantity } from "@/api";

type UseEditCartItemQuantityReturn = (productId: number, quantity: number) => Promise<void>;


export default function UseEditCartItemQuantity(): UseEditCartItemQuantityReturn {
    const [user] = useUser();
    const [cart, , , modifyQuantity] = useCart();
  
    return (productId: number, quantity: number) => {
      if (user) {
        
        return modifyDbCartQuantity(user!.id, productId, quantity).then(() => modifyQuantity(productId, quantity));
      } else {
        modifyQuantity(productId, quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        return Promise.resolve();
      }
    };
  }
  