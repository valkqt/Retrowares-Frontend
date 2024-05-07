import classNames from "classnames"
import css from "./CartPopup.module.css"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CartItem } from "@/types";
import "@/App.css"

export default function CartPopup({ items }: { items: CartItem[] }) {

    return <div className={classNames(css.cartPopup)}>
        <div className={css.cartHeader}>
            <h5>Cart</h5>
            <Link to="/cart">View Cart</Link>

        </div>
        <div className={css.cartItemContainer}>
            {items.length > 0 ? items.map(i => {
                return (
                    <Link key={i.productId} to={`/Products/${i.productId}`} className="neuteredLink">
                        <div className="d-flex gap-3">
                            <div className={css.cartImage} style={{ backgroundImage: `url(${i.image})` }}>

                            </div>
                            <div className={css.cartItemText}>
                                <p>{i.title}</p>
                                <div>
                                    <p className="text-end">{i.quantity}x</p>
                                    <p>{(i.price * i.quantity).toFixed(2)}$</p>

                                </div>
                            </div>
                        </div>
                    </Link>
                )
            }) : (<p>Your cart is empty!</p>)}
        </div>
        <div className="pt-3">
            <Button className="btn-danger w-100">
                <Link to="/checkout" className="neuteredLink">Complete Purchase</Link>
            </Button>
        </div>

    </div>
}