import { instance } from "./index";
import { Order } from "@/types"

export async function getOrderByCode(query: string): Promise<Order> {
    return instance.get(`api/Orders/Search?orderCode=${encodeURIComponent(query)}`).then(data => data.data)
}