"use client";
import React from "react";
import Link from "next/link";
import "./styles.scss";
import {
  BookOutlined,
  MessageOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

export function Menu() {
  return (
    <ul className="menu">
      <li className="menu-item">
        <Link href="/">
          <PlusSquareOutlined />
          Criar frases
        </Link>
      </li>
      <li className="menu-item">
        <Link href="/phrases">
          <MessageOutlined /> Frases
        </Link>
      </li>
      <li className="menu-item">
        <Link href="/learning">
          <BookOutlined /> Estudar
        </Link>
      </li>
    </ul>
  );
}
