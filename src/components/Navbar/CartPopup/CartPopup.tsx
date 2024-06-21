import classNames from "classnames";
import css from "./CartPopup.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartItem } from "@/types";
import { useState } from "react";

import "@/App.css";
import QuantityHandler from "@/pages/checkout/QuantityHandler/QuantityHandler";
import RemoveHandler from "@/pages/checkout/RemoveHandler/RemoveHandler";

export default function CartPopup({ items }: { items: CartItem[] }) {
  const [, setPopup] = useState(false);

  return (
    <div className={classNames(css.cartPopup)}>
      <div className={css.cartHeader}>
        <h5>Cart</h5>
      </div>
      <div className={css.cartItemContainer}>
        {items.length > 0 ? (
          items.map((i) => {
            return (
              <div className="d-flex gap-3" key={i.product.id}>
                <div
                  className={css.cartImage}
                  style={{ backgroundImage: `url(${i.product.image})` }}
                ></div>
                <div className={css.ItemRecap}>
                  <div
                    className={classNames(
                      css.cartItemText,
                      "flexBetween gap-3"
                    )}
                  >
                    <div>
                      <Link
                        key={i.product.id}
                        to={`/Products/${i.product.id}`}
                        className="neuteredLink"
                      >
                        {i.product.title}
                      </Link>
                    </div>
                    <RemoveHandler
                      productId={i.product.id}
                      show={() => setPopup(true)}
                    />
                  </div>
                  <div className="flexBetween gap-3">
                    <div className="productPriceSmallest">
                      {(i.product.price * i.quantity).toFixed(2)}$
                    </div>
                    <QuantityHandler item={i} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
      <div className="pt-3">
        <Button className="btn-danger w-100">
          <Link to="/checkout" className="neuteredLink">
            Complete Purchase
          </Link>
        </Button>
      </div>
    </div>
  );
}
