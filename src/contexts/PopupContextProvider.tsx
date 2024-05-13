import { PropsWithChildren, useState } from "react";
import { PopupContext } from "./PopupContext";
import AlertPopup from "@/components/AlertPopup/AlertPopup";

export function PopupProvider({ children }: PropsWithChildren) {
    const [popup, setPopup] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("")
    
    return (
        <PopupContext.Provider value={[popup, setPopup, message, setMessage]}>
            {children}
            <AlertPopup />
        </PopupContext.Provider>
    )
}