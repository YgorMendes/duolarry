import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import "./styles.scss";

interface IPhraseItem extends React.HTMLAttributes<HTMLLIElement> {
  priority: "low" | "medium" | "hight";
  text: string;
}

function PhraseItem({ text, priority, ...props }: IPhraseItem) {
  return (
    <li {...props} className="phrase-item" {...props}>
      <div>
        <div className={`phrase-item_priority is-${priority}`} />
        <div>{text}</div>
      </div>

      <MoreOutlined />
    </li>
  );
}

export default PhraseItem;
