import { Modal, Button } from "react-bootstrap";
import css from "../RetroNav.module.css";
import { googleAccess, login } from "@/api";
import { useState } from "react";
import { GoogleLoginModel, LoginModel } from "@/types";
import { toast } from "react-toastify";
import { Check } from "react-bootstrap-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface LoginModalProps {
  show: boolean;
  setShow: (state: boolean) => void;
}

export default function LoginModal({ show, setShow }: LoginModalProps) {
  const [formData, setFormData] = useState<LoginModel>({
    username: "",
    password: "",
    persist: false,
  });
  const [checked, setChecked] = useState(false);
  const successNotify = () => toast.success("Login Successful!");
  const failureNotify = () => toast.error("Login Failed!");

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) =>
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const user = res.data;
          const loginInfo: GoogleLoginModel = {
            id: user.id,
            email: user.email,

            name: user.name,
            picture: user.picture,
          };
          googleAccess(loginInfo)
            .then((data) => {
              console.log(data);
              login(data.data)
                .then((data) => {
                  localStorage.setItem("token", data.data.token);
                  if (data.data.refreshToken != null) {
                    localStorage.setItem(
                      "refreshToken",
                      data.data.refreshToken
                    );
                  }

                  window.setTimeout(() => window.location.reload(), 500);
                })
                .catch(() => {});
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err)),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <form
        className="customModal"
        onSubmit={(e) => {
          e.preventDefault();
          login(formData)
            .then((data) => {
              localStorage.setItem("token", data.data.token);
              if (data.data.refreshToken != null) {
                localStorage.setItem("refreshToken", data.data.refreshToken);
              }
              successNotify();
              setShow(false);
              window.setTimeout(() => window.location.reload(), 500);
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
            <div className="d-flex gap-3 justify-content-end align-items-center">
              <label htmlFor="">Remember me?</label>
              <div>
                <input type="checkbox" style={{ display: "none" }} />
                <div
                  className={classNames(
                    checked ? css.Checked : "",
                    css.CheckboxContainer
                  )}
                  onClick={() => {
                    setChecked(!checked);
                    setFormData({ ...formData, persist: !formData.persist });
                  }}
                >
                  {checked && (
                    <Check size={24} className={css.CustomCheckbox} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-3">
            <Button
              variant="danger"
              onClick={() => googleLogin()}
              style={{ maxWidth: "200px" }}
            >
              Login with Google
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
          <div>
            <Link to="/Account/Recovery" className="neuteredLink">
              Forgot Password?
            </Link>
          </div>
          <div className="d-flex gap-3">
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="danger">
              Proceed
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
