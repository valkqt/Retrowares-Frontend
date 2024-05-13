import { createContext, useContext } from "react";

type PopupContextData = [boolean, (show: boolean) => void, string, (message: string) => void]

export const PopupContext = createContext<PopupContextData>([false, () => {}, "", () => {}]);

export const usePopup = () => useContext(PopupContext);