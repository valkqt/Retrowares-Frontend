import { useCart } from "@/contexts"
import { XLg } from "react-bootstrap-icons"

export default function RemoveHandler({ productId }: { productId: number }) {
    const [_, __, removeFromCart] = useCart()

    return (
        <div onClick={() => removeFromCart(productId)} className="removeObject" title="Remove from cart">
            <XLg />
        </div>


    )
}