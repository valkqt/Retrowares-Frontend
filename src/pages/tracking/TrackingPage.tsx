import { Product } from "@/types"
import { useState } from "react"
import { Form, Button, FormControl } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"

interface Order {
    id: number,
    items: OrderItem[],
    name: string,
}

interface OrderItem {
    id: number,
    product: Product,
    quantity: number,
}

export default function TrackingPage() {
    const [query, setQuery] = useState<string>("")
    const [order, setOrder] = useState<Order>()

    function handleSubmit() {
        fetch(`http://andreabuzzanca-001-site3.jtempurl.com/api/Orders/Search?orderCode=${encodeURIComponent(query)}`, { headers: { "Content-Type": "application/json" } }).then(res => res.json()).then(data => { console.log(data); setOrder(data) })
    }


    return <div>
        <Form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()
        }} >
            <FormControl type="text" placeholder="Search orders..." onChange={(e) => setQuery(e.target.value)} />
            <Button variant="danger" type="submit"><Search size={20} /></Button>
        </Form>
        <div>
            {order && <div>
                {order.items.map(i => <div>
                    <h5>{i.product.title}</h5>
                    <div>{i.quantity}</div>
                </div>)}
            </div>}
        </div>
    </div>
}