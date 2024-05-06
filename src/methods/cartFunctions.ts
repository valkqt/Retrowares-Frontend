import { CartItem, Product } from "@/types";

function addToCart(item: Product): void {
    const storage = localStorage.getItem("cart")

    const cartItem: CartItem = {
        title: item.title,
        productId: item.id,
        image: item.image,
        price: item.price,
        quantity: 1
    }

    if (storage == null) {
        localStorage.setItem("cart", JSON.stringify([cartItem]))
        return;
    }

    const cart: CartItem[] = JSON.parse(storage);
    const found = cart.find(i => i.productId === item.id)


    if (found) {
        found.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart))
        return
    }

    cart.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(cart))

}

export default addToCart;