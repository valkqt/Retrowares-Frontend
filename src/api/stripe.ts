import { instance } from "./index";
import {  CheckoutPayload } from "@/types";

export async function checkoutSessionInit(payload: CheckoutPayload): Promise<string> {

    if (payload.cart.length < 1) {
        return "";
    }

    return instance.post("api/create-checkout-session", JSON.stringify(payload)).then(data => data.status < 300 ? data.data : "")

}