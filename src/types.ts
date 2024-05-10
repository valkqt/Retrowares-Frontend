export interface Product {
    id: number,
    title: string,
    description?: string,
    genre: string,
    platform: string,
    image: string,
    screenshots: Screenshot[],
    officialUrl?: string,
    price: number,
    stock: number,
    discountPercentage: number,
}

export interface CartItem {
    productId: Product['id'];
    title: string,
    image: string,
    price: number,
    quantity: number;
}

export interface Screenshot {
    id: number,
    url: string,
    thumbnail: string,
}
