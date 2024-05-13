import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import css from "./CheckoutPage.module.css"
import classNames from "classnames";
import "@/contexts/index"
import { CartItem } from "@/types";
import { useCart } from "@/contexts/index";
import { Button } from "react-bootstrap";
import QuantityHandler from "./QuantityHandler/QuantityHandler";
import RemoveHandler from "./RemoveHandler/RemoveHandler";
import Success from "./Success/Success";


export default function CheckoutPage() {
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const [cart] = useCart();

    async function checkoutAction(payload: CartItem[]): Promise<string> {

        const res = await fetch("https://localhost:7131/create-checkout-session", {
            headers: { "Content-Type": "application/json" },
            method: "POST", body: JSON.stringify(payload)
        })
        return await res.text()
    }


    useEffect(() => {
        const params: string | null = searchParams.get("result");

        if (params === "success") {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (params === "canceled") {
            window.location.href = "/"
        }
    }, []);

    return message ? (
        <Success />

    ) : (
        <div className={css.CheckoutWrapper}>
            <div className={classNames(css.OrderContainer, "CustomCard")}>
                <h2 className="darkHeader">Cart</h2>
                {cart.length === 0 && <p>Cart is empty!</p>}
                {cart.map(i => {
                    return (
                        <div key={i.productId} className={classNames(css.ProductContainer)}>
                            <div>
                                <Link to={`/Products/${i.productId}`} className="neuteredLink">
                                    <img src={i.image} className={css.CheckoutImage} />
                                </Link>
                            </div>
                            <div className={css.ItemRecap}>
                                <div className="flexBetween gap-5">
                                    <h4>
                                        <Link to={`/Products/${i.productId}`} className="neuteredLink">
                                            {i.title}
                                        </Link>
                                    </h4>
                                    <RemoveHandler productId={i.productId} />
                                </div>
                                <div className="flexBetween gap-5">
                                    <div className="productPriceSmall">{i.price.toFixed(2)}$</div>
                                    <QuantityHandler item={i} />
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </ div>
            <div className="flex-grow-1">
                <div className="CustomCard">
                    <h2 className="darkHeader">Order Summary</h2>
                    <div>
                        {cart.map(i => {
                            return (
                                <div className="flexBetween gap-5">
                                    <p>{i.title}</p>
                                    <div>x{i.quantity}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flexBetween gap-5">
                        <div className="GenericFont">Total: {cart.reduce((total, value) => total + value.price * value.quantity, 0).toFixed(2)}$</div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            checkoutAction(cart).then(data => window.location.href = `${data}`);
                        }}>
                            <Button type="submit" className="btn-danger">
                                Proceed
                            </Button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}