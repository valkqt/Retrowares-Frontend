import { useCart, usePopup } from "@/contexts"
import { XLg } from "react-bootstrap-icons"

export default function RemoveHandler({ productId, show }: { productId: number, show: () => void }) {
    const [_, __, removeFromCart] = useCart()
    const [___, setPopup, ____, setMessage] = usePopup()

    return (
        <>
            <div onClick={() => {
                if (confirm("Are you sure you want to delete this item?")) {
                    removeFromCart(productId);
                    show();
                    setPopup(true);
                    setMessage("Product removed from cart");

                };

            }} className="removeObject" title="Remove from cart">
                <XLg />
            </div>
        </>


    )
}