import { Button } from "react-bootstrap";
import css from "./Recovery.module.css";
import { useState } from "react";
import classNames from "classnames";
import { resetPassword } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Recovery() {
  const [formData, setFormData] = useState({ email: "", username: "" });
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        resetPassword(formData).then(() => toast.success("Account password reset.")).catch(() => toast.error("We were not able to reset your password at this moment. Try again later.")).finally(() => navigate("/"))
      }}
      className={css.RecoveryForm}
    >
      <div>
        <label>Username</label>
        <input className="form-control" type="text" required onChange={e => setFormData({...formData, username: e.target.value})}/>
      </div>
      <div>
        <label>Email</label>
        <input className="form-control" type="email" required onChange={e => setFormData({...formData, email: e.target.value})}/>
      </div>
      <Button type="submit" variant="danger" className={classNames("customButton", css.RecoveryButton)}>
        Proceed
      </Button>
      <p className="small text-center">An email with a temporary password will be sent to you. We recommend changing password once being able to log in.</p>
    </form>
  );
}
