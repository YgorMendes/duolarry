"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import "./styles.scss";
import { Alert } from "@/app/components";

interface IUserFeedbackProvider {
  children: JSX.Element[] | JSX.Element;
}

interface IUserFeedbackContext {
  setMessage: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<"error" | "success">>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export const UserFeedbackContext = createContext<IUserFeedbackContext | null>(
  null
);

export function UserFeedbackProvider({
  children,
  ...props
}: IUserFeedbackProvider) {
  const [type, setType] = useState<"error" | "success">("error");
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen === true) {
        setIsOpen(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <UserFeedbackContext.Provider
      value={{ setMessage, setType, setIsOpen, isOpen }}
      {...props}
    >
      <Alert message={message} type={type} isOpen={isOpen}></Alert>

      {children}
    </UserFeedbackContext.Provider>
  );
}

export function useUserFeedbackContext(): IUserFeedbackContext {
  const context = useContext(UserFeedbackContext);

  if (!context) {
    throw new Error(
      "useUserFeedbackContext must be used after an UserFeedbackContext.Provider"
    );
  }

  return context;
}
