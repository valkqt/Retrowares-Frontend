interface Product {
    id: number,
    title: string,
    description?: string,
    genre: string,
    platform: string,
    image: string,
    screenshots: string[],
    officialUrl?: string,
    price: number,
}

interface CartItem {
    productId: Product['id'];
    qty: number;
}

interface Cart {
    userId: string;
    items: CartItem[];
}