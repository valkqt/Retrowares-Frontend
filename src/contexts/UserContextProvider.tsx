import { PropsWithChildren, useState } from "react";
import { UserContext } from "./UserContext";
import { User } from "@/types";

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);


  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
