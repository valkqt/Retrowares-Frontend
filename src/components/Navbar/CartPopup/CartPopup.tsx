import classNames from "classnames"
import css from "./CartPopup.module.css"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CartItem } from "@/types";

export default function CartPopup({ items }: { items: CartItem[] }) {

    return <div className={classNames(css.cartPopup)}>
        {items.length > 0 ? items.map(i => {
            return (
                <p key={i.productId}>{i.title}</p>
            )
        }) : (<p>cart is empty</p>)}
        <div>
            <Button className="btn-danger w-100">
                <Link to="/cart" className="neuteredLink">View cart</Link>
            </Button>
        </div>

    </div>
}