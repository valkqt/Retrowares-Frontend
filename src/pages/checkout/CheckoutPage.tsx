import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import css from "./CheckoutPage.module.css"
import classNames from "classnames";
import "@/contexts/index"
import { CheckoutPayload } from "@/types";
import { useCart } from "@/contexts/index";
import { Button, FormControl, FormLabel } from "react-bootstrap";
import QuantityHandler from "./QuantityHandler/QuantityHandler";
import RemoveHandler from "./RemoveHandler/RemoveHandler";
import Success from "./Success/Success";
import { checkoutSessionInit } from "@/api";


export default function CheckoutPage() {
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const [cart] = useCart();
    const [email, setEmail] = useState<string>("")
    const [, setPopup] = useState(false);


    async function checkoutAction(payload: CheckoutPayload): Promise<string> {

        return checkoutSessionInit(payload).then()

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
                        <div key={i.product.id} className={classNames(css.ProductContainer)}>
                            <div>
                                <Link to={`/Products/${i.product.id}`} className="neuteredLink">
                                    <img src={i.product.image} className={css.CheckoutImage} />
                                </Link>
                            </div>
                            <div className={css.ItemRecap}>
                                <div className="flexBetween gap-5">
                                    <h4>
                                        <Link to={`/Products/${i.product.id}`} className="neuteredLink">
                                            {i.product.title}
                                        </Link>
                                    </h4>
                                    <RemoveHandler productId={i.product.id} show={() => setPopup(true)} />
                                </div>
                                <div className="flexBetween gap-5">
                                    <div className="productPriceSmall">{i.product.price.toFixed(2)}$</div>
                                    <QuantityHandler item={i} />
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </ div>
            <div className={css.OrderRecap}>
                <div className="CustomCard">
                    <h2 className="darkHeader">Order Summary</h2>
                    <div className={css.DisplayedOnDesktop}>
                        {cart.map(i => {
                            return (
                                <div className="flexBetween gap-5" key={i.product.id}>
                                    <p>{i.product.title}</p>
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
                        <hr className={css.DisplayedOnDesktop} />
                        <FormLabel>Your Email:</FormLabel>
                        <FormControl type="email" onChange={(e) => setEmail(e.target.value)} className="d-block" required/>
                        <div className="flexBetween mt-3">
                            <div className="GenericFont">Total: {cart.reduce((total, value) => total + value.product.price * value.quantity, 0).toFixed(2)}$</div>

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