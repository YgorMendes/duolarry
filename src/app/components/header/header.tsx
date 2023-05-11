"use client";
import React, { useState } from "react";

import "./styles.scss";
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "../menu/menu";

export function Header() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <header className="header">
      <span className="logo">Duolarry</span>
      <div className={`header_menu-options ${isVisible ? "is-visible" : ""}`}>
        <Menu closeMenu={() => setIsVisible(false)} />
      </div>

      <MenuOutlined
        onClick={() => setIsVisible((currentValue) => !currentValue)}
        className={`header_menu-burger ${isVisible ? "is-visible" : ""}`}
      />
    </header>
  );
}
