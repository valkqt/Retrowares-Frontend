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
  product: Product;
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

export interface RegisterModel {
  username: string,
  email: string, 
  password: string
}

export interface LoginModel {
  username: string,
  password: string
}

export interface User {
  id: number,
  username: string,
  cart: CartItem[],
  role: number
  token: string

}
