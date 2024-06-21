import useRemoveFromCart from "@/hooks/useRemoveFromCart";
import { XLg } from "react-bootstrap-icons";
import { toast } from "react-toastify";

export default function RemoveHandler({
  productId,
  show,
}: {
  productId: number;
  show: () => void;
}) {
  const useRemoveItemFromCart = useRemoveFromCart();

  return (
    <>
      <div
        onClick={async () => {
          if (confirm("Are you sure you want to delete this item?")) {
            try {
              await useRemoveItemFromCart(productId);
              toast.success(`Removed product from cart.`);
            } catch (e) {
              toast.error(`An error occurred`);
            }
            show();
          }
        }}
        className="removeObject"
        title="Remove from cart"
      >
        <XLg />
      </div>
    </>
  );
}
