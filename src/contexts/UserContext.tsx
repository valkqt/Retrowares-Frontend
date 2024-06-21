import { createContext, useContext } from "react";
import {  User } from "@/types";


type SetUserFunction =  (data: User) => void

type UserContextData = [User | null, SetUserFunction]

export const UserContext = createContext<UserContextData>([null, () => {}]);

export const useUser = () => useContext(UserContext);