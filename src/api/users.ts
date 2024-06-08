import { instance } from "./index";
import { RegisterModel, User, DbCartItem } from "@/types";

export async function Register(payload: RegisterModel): Promise<any> {
  return instance
    .post("Users/Register", JSON.stringify(payload))
    .then((data) => console.log(data));
}

export async function login(payload: RegisterModel): Promise<void> {
  return instance.post("Auth/Login", JSON.stringify(payload)).then((data) => {
    localStorage.setItem("token", data.data);
  });
}

export async function getUserData(): Promise<User> {
  const token = localStorage.getItem("token");

  return instance
    .get("Users/Verify", { headers: { Authorization: `Bearer ${token}` } })
    .then((data) => data.data);
}

export async function addToDbCart(item: DbCartItem ): Promise<void> {
  const token = localStorage.getItem("token");

    instance
      .post("Cart/Add", JSON.stringify(item), { headers: { Authorization: `Bearer ${token}` } })
}