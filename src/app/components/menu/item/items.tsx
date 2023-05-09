import React, { useEffect, useState } from "react";
import "./styles.scss";
import Link from "next/link";

interface IItem extends React.HTMLAttributes<HTMLLIElement> {
  icon: React.ReactNode;
  to: string;
  id: string;
  text: string;
  currentSelected: string;
}

function Item({
  to,
  text,
  icon,
  id,
  onClick,
  currentSelected,
  ...props
}: IItem) {
  const [selected, setSelected] = useState<boolean>();

  useEffect(() => {
    setSelected(id === currentSelected);
  }, [currentSelected]);

  useEffect(() => {
    if (id === "home") setSelected(true);
  }, []);
  return (
    <li className="menu-item" {...props}>
      <Link href={to} onClick={(e: any) => (onClick ? onClick(e) : null)}>
        <div>
          {icon}
          {text}
        </div>
        <div className={`menu-item_line ${selected ? "is-selected" : ""}`} />
      </Link>
    </li>
  );
}

export default Item;
