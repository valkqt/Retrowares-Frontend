import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons"
import css from "./QuantityHandler.module.css"

export default function QuantityHandler({ quantity }: { quantity: number }) {
    return (
        <div className={css.HandlerBox}>
            <div className={css.ArrowBox}><CaretLeftFill /></div>
            <div className={css.QuantityBox}>{quantity}</div>
            <div className={css.ArrowBox}><CaretRightFill /></div>
        </div>
    )
}