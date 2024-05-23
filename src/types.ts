export interface Product {
  id: number;
  title: string;
  description?: string;
  genre: string;
  platform: string;
  releaseDate: string;
  image: string;
  screenshots: Screenshot[];
  officialUrl?: string;
  price: number;
  stock: number;
  discountPercentage: number;
}

export interface CartItem {
  productId: Product["id"];
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Screenshot {
  id: number;
  url: string;
  thumbnail: string;
  caption: string;
}

export interface Highlight {
  title: string;
  text: string;
  timestamp: string;
  relations: Product[];
}

export interface Order {
  id: number;
  items: OrderItem[];
  name: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CheckoutPayload {
  cart: CartItem[],
  email: string,
}

