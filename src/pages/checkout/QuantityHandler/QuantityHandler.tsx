import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import css from "./QuantityHandler.module.css";
import { CartItem } from "@/types";
import UseEditCartItemQuantity from "@/hooks/useEditCartItemQuantity";
import { toast } from "react-toastify";

export default function QuantityHandler({ item }: { item: CartItem }) {
  const useModifyItemQuantity = UseEditCartItemQuantity();

  return (
    <div className={css.HandlerBox}>
      <div
        className={css.ArrowBox}
        onClick={async () => {
          try {
            await useModifyItemQuantity(item.product.id, -1);
            toast.success(`Removed one unit of ${item.product.title}`);
          } catch (e) {
            toast.error(`An error occurred`);
          }
        }}
      >
        <CaretLeftFill />
      </div>
      <div className={css.QuantityBox}>{item.quantity}</div>
      <div
        className={css.ArrowBox}
        onClick={async () => {
          try {
            await useModifyItemQuantity(item.product.id, +1);
            toast.success(`Added one unit of ${item.product.title}`);
          } catch (e) {
            toast.error(`An error occurred`);
          }
        }}
      >
        <CaretRightFill />
      </div>
    </div>
  );
}
