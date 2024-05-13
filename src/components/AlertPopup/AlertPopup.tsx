import { Check } from "react-bootstrap-icons";
import css from "./AlertPopup.module.css"
import Toast from 'react-bootstrap/Toast';
import {  useEffect } from "react";
import { usePopup } from "@/contexts";


function AlertPopup() {
  const [popup, setPopup, message] = usePopup()

  useEffect(() => { window.setTimeout(() => setPopup(false), 1500) }, [])

  return (
    <div className={css.CustomPopup}>
      <Toast onClose={() => setPopup(false)} show={popup} delay={1500} autohide>
        <Toast.Header className="justify-content-between">
          <span>Message</span>
        </Toast.Header>
        <Toast.Body><Check size={24} /> {message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default AlertPopup;