"use client";
import React, { useState } from "react";

import "./styles.scss";
import { CloseCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu } from "../menu/menu";

export function Header() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <header className="header">
      <span className="logo">Duolarry</span>
      <div className={`header_menu-options ${isVisible ? "is-visible" : ""}`}>
        <Menu closeMenu={() => setIsVisible(false)} />
      </div>
      {isVisible ? (
        <CloseCircleOutlined
          onClick={() => setIsVisible(false)}
          className={`header_menu-burger ${isVisible ? "is-visible" : ""}`}
        />
      ) : (
        <MenuOutlined
          onClick={() => setIsVisible(true)}
          className={`header_menu-burger ${isVisible ? "is-visible" : ""}`}
        />
      )}
    </header>
  );
}
