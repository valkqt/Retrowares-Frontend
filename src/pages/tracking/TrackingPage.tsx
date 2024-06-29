import { getOrderByCode } from "@/api/orders";
import { Order } from "@/types";
import classNames from "classnames";
import css from "./TrackingPage.module.css";
import { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export function TrackingPage() {
  const [query, setQuery] = useState<string>("");
  const [order, setOrder] = useState<Order>();
  const [currentOrder, setCurrentOrder] = useState("")

  function handleSubmit() {
    getOrderByCode(query).then((data) => setOrder(data));
  }

  return (
    <div>
      <h1 className="text-center h2 mb-4">Tracking services</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          setCurrentOrder(query)
        }}
      >
        <Form.Group className="d-flex justify-content-center">
          <FormControl
            type="text"
            placeholder="Search orders..."
            onChange={(e) => setQuery(e.target.value)}
            className={classNames("customSearchForm", css.TrackingInput)}
          />
          <Button type="submit" className="searchFormButton">
            <Search size={20} />
          </Button>
        </Form.Group>
      </Form>
      <div>
        {order && (
          <div className={css.OrderWrapper}>
            <h2 className="text-center flexBetween">
              <span>Order {currentOrder}</span>
              <span>Status: Pending</span></h2>
            <hr />
            {order.items.map((i) => (
              <div className={css.OrderItemWrapper}>
                <div className={css.OrderImage}>
                  <img src={i.product.image} className="img-fluid fitImage" />
                </div>
                <div className={css.OrderInfo}>
                  <div className="flexBetween gap-3 w-100">
                    <h4>{i.product.title}</h4>
                    <div className="productPrice">{i.product.price}$</div>
                  </div>
                  <div className="flexBetween">
                    <div></div>
                    <div>Quantity: x{i.quantity}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
