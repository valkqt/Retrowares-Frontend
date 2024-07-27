import { Link, useNavigate } from "react-router-dom";
import css from "./Account.module.css";
import { useUser } from "@/contexts";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { changePassword } from "@/api";
import { toast } from "react-toastify";
import { PencilSquare } from "react-bootstrap-icons";
import classNames from "classnames";
interface ChangePasswordModalProps {
  show: boolean;
  setShow: (state: boolean) => void;
}

export function Account() {
  const [user] = useUser();
  const [show, setShow] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  function ChangePasswordModal({ show, setShow }: ChangePasswordModalProps) {
    const [formData, setFormData] = useState({
      currentPassword: "",
      newPassword: "",
    });

    return (
      <Modal show={show} onHide={() => setShow(false)}>
        <form
          className="customModal"
          onSubmit={(e) => {
            e.preventDefault();
            changePassword(user!.id, formData)
              .then(() => toast.success("Successfully changed password!"))
              .catch(() => toast.error("Invalid or incorrect credentials!"))
              .finally(() => setShow(false));
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex flex-column">
              <label>Current Password</label>
              <input
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="form-control"
              />
              <label>New Password</label>
              <input
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="form-control"
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="customButton"
              variant="danger"
              onClick={() => {
                setShow(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" className="customButton" variant="danger">
              Confirm
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  return (
    <div className={css.ProfileWrapper}>
      <div className={css.MainUserInfo}>
        <form>
          <div className={css.UserPicture}>
            <input type="file" className="d-none" id="userPicture" />
            <label
              htmlFor="userPicture"
              role="button"
              onMouseEnter={() => setEditPicture(true)}
              onMouseLeave={() => setEditPicture(false)}
            >
              <div className={classNames("position-relative")}>
                <img
                  src={user?.picture ?? "/images/default.png"}
                  className="object-fit-cover w-100 "
                />
                <div className={classNames(css.EditPencilBox, editPicture ? "d-block" : "d-none")}>
                  <PencilSquare
                    size={24}
                  />
                </div>
              </div>
            </label>
          </div>
        </form>

        <h4>{user?.username}</h4>
      </div>
      <div className={css.UserControls}>
        <Link to="/checkout" className="neuteredLink">
          View Cart
        </Link>
        <a href="#" className="neuteredLink" onClick={() => setShow(true)}>
          Change Password
        </a>
      </div>
      <ChangePasswordModal show={show} setShow={setShow} />
    </div>
  );
}
