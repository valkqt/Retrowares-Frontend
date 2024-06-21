// import { Check } from "react-bootstrap-icons";
// import css from "./AlertPopup.module.css";
// import Toast from "react-bootstrap/Toast";
// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// import { RootState } from "@/redux/store";

// function AlertPopup() {
//   const selector = useAppSelector((state: RootState) => state);
//   const dispatch = useAppDispatch();

//   console.log("alert render")


//   useEffect(() => {
//   }, []);

//   return (
//     <div className={css.CustomPopup}>
//       <Toast
//         onClose={() => setPopup(false)}
//         show={false}
//         delay={1500}
//         autohide
//       >
//         <Toast.Header className="justify-content-between"></Toast.Header>
//         <Toast.Body>
//           <Check size={24} /> {message}
//           <span>Message</span>
//         </Toast.Body>
//       </Toast>
//     </div>
//   );
// }

// export default AlertPopup;
