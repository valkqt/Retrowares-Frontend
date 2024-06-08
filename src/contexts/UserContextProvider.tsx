import { PropsWithChildren, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { User } from "@/types";
import { getUserData } from "@/api";

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    getUserData().then((data) => {
      console.log(data);
      setUser(data);
    });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
