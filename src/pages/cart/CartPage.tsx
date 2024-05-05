import { useEffect, useState } from "react"
import "../../types"

export default function CartPage() {
    const [cartItems, setCartItems] = useState<Product[]>([])
    
    useEffect(() => {
        const storage = localStorage.getItem("cart")
        const cart = storage !== null ? JSON.parse(storage) : []
        setCartItems(cart)
    }, [])

    return <div>
        {cartItems.map(i => {return <p key={i.id}>{i.title}</p>})}
    </div>
}