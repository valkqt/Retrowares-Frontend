import { instance } from "./index";
import { LoginModel, RegisterModel } from "@/types";

export async function Register(payload: RegisterModel): Promise<any> {
  return instance
    .post("Users", JSON.stringify(payload))
    .then((data) => console.log(data));
}

export async function Login(payload: RegisterModel): Promise<void> {
  return instance.post("Auth", JSON.stringify(payload)).then(data => console.log(data));
}
