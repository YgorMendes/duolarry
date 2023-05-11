"use client";
import React, { useState } from "react";
import "./styles.scss";
import {
  BookOutlined,
  MessageOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import Item from "./item/items";

interface IMenu {
  closeMenu: () => void;
}
export function Menu({ closeMenu }: IMenu) {
  const [currentSelected, setCurrentSelected] = useState<string>("");

  return (
    <ul className="menu">
      <Item
        to="/"
        text="Criar frases"
        onClick={() => {
          setCurrentSelected("home");
          closeMenu();
        }}
        icon={
          <PlusSquareOutlined
            className={`icon ${
              "home" === currentSelected ? "is-selected" : ""
            }`}
          />
        }
        currentSelected={currentSelected}
        id="home"
      />
      <Item
        to="/phrases"
        text="Frases"
        onClick={() => {
          setCurrentSelected("phrases");
          closeMenu();
        }}
        icon={
          <MessageOutlined
            className={`icon ${
              "phrases" === currentSelected ? "is-selected" : ""
            }`}
          />
        }
        currentSelected={currentSelected}
        id="phrases"
      />
      <Item
        to="/learning"
        text="Estudar"
        onClick={() => {
          setCurrentSelected("learning");
          closeMenu();
        }}
        icon={
          <BookOutlined
            className={`icon ${
              "learning" === currentSelected ? "is-selected" : ""
            }`}
          />
        }
        currentSelected={currentSelected}
        id="learning"
      />
    </ul>
  );
}
