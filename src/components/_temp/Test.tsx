import { useUser } from "@/contexts/UserContext";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

function Test() {
  const [user, ] = useUser();
  const notify = () => toast.success("message woooo!");

  return (
    <div>
      <p>sono test!</p>

      <Button
        onClick={() => {
          notify();
        }}
      >
        CHECK STORE {user?.username}
      </Button>
      <Button
        onClick={() => {
          notify();
        }}
      >
        POPUP: {user?.username}
      </Button>
    </div>
  );
}

export default Test;
