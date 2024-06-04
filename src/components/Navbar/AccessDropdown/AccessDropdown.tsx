import { NavDropdown } from "react-bootstrap";
import { useState } from "react";
import css from "../RetroNav.module.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function AccessDropdown() {
    const [loginShow, setLoginShow] = useState(false)
    const [registerShow, setRegisterShow] = useState(false)

  return (
      <NavDropdown
        title="Access"
        id="basic-nav-dropdown"
        className={css.NavDropdown}
      >
        <NavDropdown.Item className={css.neuteredButtonLink} onClick={() => setLoginShow(true)}>
          Login
        </NavDropdown.Item>
        <LoginModal show={loginShow} setShow={setLoginShow}/>
        <NavDropdown.Item className={css.neuteredButtonLink} onClick={() => setRegisterShow(true)}>
          Register
        </NavDropdown.Item>
        <RegisterModal show={registerShow} setShow={setRegisterShow}/>

      </NavDropdown>
  );
}
