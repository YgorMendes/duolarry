import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import "./styles.scss";

interface IPhraseItem extends React.HTMLAttributes<HTMLLIElement> {
  priority: "low" | "medium" | "hight";
  text: string;
}

function PhraseItem({ text, onClick, priority, ...props }: IPhraseItem) {
  return (
    <li {...props} className="phrase-item" {...props}>
      <div>
        <div className={`phrase-item_priority is-${priority}`} />
        <div
        className="phrase-item_text"
          onClick={(e: any) => {
            if (onClick) onClick(e);
          }}
        >
          {text}
        </div>
      </div>

      <MoreOutlined />
    </li>
  );
}

export default PhraseItem;
