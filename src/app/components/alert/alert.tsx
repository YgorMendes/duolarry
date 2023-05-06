"use client";
import React from "react";
import "./styles.scss";

interface IAlert {
  message: string;
  type: "success" | "error";
  isOpen: boolean;
}

export function Alert({ message, type, isOpen, ...props }: IAlert) {
  return (
    <div
      {...props}
      className={`alert is-${type} ${isOpen ? "is-visible" : ""}`}
    >
      <p className="alert_message">{message}</p>
      <div className="alert_line"></div>
    </div>
  );
}
