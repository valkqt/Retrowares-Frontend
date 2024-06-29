import { NavDropdown } from "react-bootstrap";
import { useState } from "react";
import css from "../RetroNav.module.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useUser } from "@/contexts";
import { Link } from "react-router-dom";
import classNames from "classnames";

export default function AccessDropdown() {
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [user] = useUser();

  function Logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <NavDropdown
      title="Access"
      id="basic-nav-dropdown"
      className={css.NavDropdown}
    >
      {!user && (
        <>
          <NavDropdown.Item
            className={css.neuteredButtonLink}
            onClick={() => setLoginShow(true)}
          >
            Login
          </NavDropdown.Item>
          <LoginModal show={loginShow} setShow={setLoginShow} />
          <NavDropdown.Item
            className={css.neuteredButtonLink}
            onClick={() => setRegisterShow(true)}
          >
            Register
          </NavDropdown.Item>
        </>
      )}
      {user && (
        <>
          <Link to="/account" className={classNames(css.neuteredButtonLink, "dropdown-item")}>
            Account
          </Link>

          <NavDropdown.Item className={css.neuteredButtonLink} onClick={Logout}>
            Logout
          </NavDropdown.Item>
        </>
      )}

      <RegisterModal show={registerShow} setShow={setRegisterShow} />
    </NavDropdown>
  );
}
