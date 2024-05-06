export interface Product {
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

export interface CartItem {
    productId: Product['id'];
    title: string,
    image: string,
    price: number,
    quantity: number;
}

export interface Cart {
    userId: string;
    items: CartItem[];
}