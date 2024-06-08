import { createContext, useContext } from "react";
import { User } from "@/types";

type UserContextData = [User | null, (data: User) => void]

export const UserContext = createContext<UserContextData>([null, () => {}]);

export const useUser = () => useContext(UserContext);