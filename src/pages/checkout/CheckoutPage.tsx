import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import css from "./CheckoutPage.module.css"
import classNames from "classnames";
import "@/contexts/index"
import { CartItem } from "@/types";
import { useCart } from "@/contexts/index";
import { Button, FormControl, FormLabel } from "react-bootstrap";
import QuantityHandler from "./QuantityHandler/QuantityHandler";
import RemoveHandler from "./RemoveHandler/RemoveHandler";
import Success from "./Success/Success";

interface CheckoutPayload {
    cart: CartItem[],
    email: string,

}

export default function CheckoutPage() {
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const [cart] = useCart();
    const [email, setEmail] = useState<string>("")
    const [, setPopup] = useState(false);


    async function checkoutAction(payload: CheckoutPayload): Promise<string> {

        if (payload.cart.length < 1) {
            return "";
        }

        console.log(payload)

        const res = await fetch("http://andreabuzzanca-001-site3.jtempurl.com/create-checkout-session", {
            headers: { "Content-Type": "application/json" },
            method: "POST", body: JSON.stringify(payload)
        })

        if (res.ok) {
            return await res.text()
        }

        return "";
    }


    useEffect(() => {
        const result: string | null = searchParams.get("result");

        if (result === "success") {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (result === "canceled") {
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
                                    <RemoveHandler productId={i.productId} show={() => setPopup(true)} />
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
                                <div className="flexBetween gap-5" key={i.productId}>
                                    <p>{i.title}</p>
                                    <div>x{i.quantity}</div>
                                </div>
                            )
                        })}
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        checkoutAction({ cart, email }).then(data => {
                            if (data === "") {
                                console.log("error doing checkout stuff")
                            } else {
                                window.location.href = `${data}`

                            }
                        });
                    }}>
                        <hr />
                        <FormLabel>Your Email:</FormLabel>
                        <FormControl type="email" onChange={(e) => setEmail(e.target.value)} className="d-block" required/>
                        <div className="flexBetween mt-3">
                            <div className="GenericFont">Total: {cart.reduce((total, value) => total + value.price * value.quantity, 0).toFixed(2)}$</div>

                            <Button type="submit" className="btn-danger">
                                Proceed
                            </Button>

                        </div>


                    </form>

                </div>
            </div>
        </div>
    );
}