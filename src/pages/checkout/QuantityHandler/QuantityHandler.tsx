import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons"
import css from "./QuantityHandler.module.css"
import { useCart } from "@/contexts";
import {CartItem} from "@/types"

export default function QuantityHandler({ item }: { item: CartItem }) {
    const [___, __, _, modifyQuantity] = useCart();


    return (
        <div className={css.HandlerBox}>
            <div className={css.ArrowBox} onClick={() => modifyQuantity(item.productId, -1)}><CaretLeftFill /></div>
            <div className={css.QuantityBox}>{item.quantity}</div>
            <div className={css.ArrowBox} onClick={() => modifyQuantity(item.productId, +1)}><CaretRightFill /></div>
        </div>
    )
}