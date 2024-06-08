import { useUser } from "@/contexts/UserContext";
import { Button } from "react-bootstrap";
import { instance } from "@/api";
import { addToDbCart } from "@/api";


function Test() {
  const [user,setUser] = useUser();
  

  return (
    <div>
      <p>sono test!</p>
      <Button>Name: {user?.username}</Button>
    </div>
  );
}

export default Test;
