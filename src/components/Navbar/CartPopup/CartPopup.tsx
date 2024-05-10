import classNames from "classnames"
import css from "./CartPopup.module.css"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CartItem } from "@/types";
import "@/App.css"
import QuantityHandler from "@/pages/checkout/QuantityHandler/QuantityHandler";
import RemoveHandler from "@/pages/checkout/RemoveHandler/RemoveHandler";

export default function CartPopup({ items }: { items: CartItem[] }) {

    return <div className={classNames(css.cartPopup)}>
        <div className={css.cartHeader}>
            <h5>Cart</h5>

        </div>
        <div className={css.cartItemContainer}>
            {items.length > 0 ? items.map(i => {
                return (
                    <div className="d-flex gap-3">
                        <div className={css.cartImage} style={{ backgroundImage: `url(${i.image})` }}>

                        </div>
                        <div className={css.ItemRecap}>
                            <div className={classNames(css.cartItemText, "flexBetween gap-3")}>
                                <div><Link key={i.productId} to={`/Products/${i.productId}`} className="neuteredLink">
                                    {i.title}
                                </Link>
                                </div>
                                <RemoveHandler productId={i.productId} key={i.productId} />
                            </div>
                            <div className="flexBetween gap-3">
                                <div className="productPriceSmallest">{(i.price * i.quantity).toFixed(2)}$</div>
                                <QuantityHandler item={i} key={i.productId} />


                            </div>
                        </div>

                    </div>
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