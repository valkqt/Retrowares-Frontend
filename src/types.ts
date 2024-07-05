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

export interface CheckoutCartItem {
  productId: number;
  quantity: number;
}

export interface CheckoutPayload {
  cart: CheckoutCartItem[];
  email: string;
}

export interface RegisterModel {
  username: string;
  email: string;
  password: string;
}

export interface LoginModel {
  username: string;
  password: string;
  persist: boolean;
  googleId?: string;
}

export interface GoogleLoginModel {
  id: number;
  email: string;
  name: string;
  picture: string;
}

export interface TokenApiModel {
  accessToken: string;
  refreshToken: string;
}

export interface ChangePasswordModel {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordModel {
  email: string;
  username: string;
}

export interface User {
  id: number;
  username: string;
  cart: CartItem[];
  role: number;
  token: string;
}
