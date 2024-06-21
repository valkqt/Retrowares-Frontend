import { AxiosResponse } from "axios";
import { instance } from "./index";
import { RegisterModel } from "@/types";

export async function Register(payload: RegisterModel): Promise<any> {
  return instance
    .post("Users/Register", JSON.stringify(payload))
    .then((data) => console.log(data));
}

export async function login(payload: RegisterModel): Promise<AxiosResponse> {
  return instance.post("Auth/Login", JSON.stringify(payload));
}

export async function getUserData(): Promise<AxiosResponse> {
  const token = localStorage.getItem("token");

  return instance.get("Users/GetUserFromToken", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function addToUserCart(
  userId: number,
  productId: number
): Promise<AxiosResponse> {
  const token = localStorage.getItem("token");

  return await instance.post(
    `Users/${userId}/Cart`,
    JSON.stringify(productId),
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

// quantity is always +1 or -1
export async function modifyDbCartQuantity(
  userId: number,
  productId: number,
  quantity: number
): Promise<void> {
  const token = localStorage.getItem("token");

  instance.put(
    `Users/${userId}/Cart/${productId}`,
    JSON.stringify({
      productId: productId,
      quantity: quantity,
    }),
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export async function removeFromDbCart(userId: number, productId: number) {
  const token = localStorage.getItem("token");

  instance.delete(`Users/${userId}/Cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
