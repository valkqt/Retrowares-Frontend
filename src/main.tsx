import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./root.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

console.log(import.meta.env.VITE_GOOGLE_CLIENTID)