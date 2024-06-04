import { Modal, Button } from "react-bootstrap";
import css from "../RetroNav.module.css";
import { Register } from "@/api/users";
import { useState } from "react";
import { RegisterModel } from "@/types";

interface RegisterModalProps {
  show: boolean;
  setShow: (state: boolean) => void;
}

export default function RegisterModal({ show, setShow }: RegisterModalProps) {
  const [formData, setFormData] = useState<RegisterModel>({
    username: "",
    password: "",
    email: "",
  });
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <form
        className={css.Modal}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData)
          Register(formData);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
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
              type="email"
              required
              placeholder="Email..."
              className="form-control"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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
