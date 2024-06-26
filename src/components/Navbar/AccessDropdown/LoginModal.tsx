import { Modal, Button } from "react-bootstrap";
import css from "../RetroNav.module.css";
import { login } from "@/api";
import { useState } from "react";
import { RegisterModel } from "@/types";
import { toast } from "react-toastify";

interface LoginModalProps {
  show: boolean;
  setShow: (state: boolean) => void;
}

export default function LoginModal({ show, setShow }: LoginModalProps) {
  const [formData, setFormData] = useState<RegisterModel>({
    username: "",
    password: "",
    email: "",
  });
  const successNotify = () => toast.success("Login Successful!")
  const failureNotify = () => toast.error("Login Failed!")


  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <form
        className={css.Modal}
        onSubmit={(e) => {
          e.preventDefault();
          login(formData)
            .then((data) => {
              localStorage.setItem("token", data.data.token)
              localStorage.setItem("refreshToken", data.data.refreshToken)
              successNotify();
              window.location.reload()
              
            })
            .catch(() => {
              failureNotify();
            });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={css.InputsContainer}>
            <input
              type="text"
              required
              placeholder="Username..."
              className="form-control"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="password"
              required
              placeholder="Password..."
              className="form-control"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </Modal.Body>

        <Modal.Footer className="justify-content-center gap-5">
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="danger">
            Proceed
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
