"use client";
import React, { useRef, useState } from "react";
import classNames from "classnames";
import "./styles.scss";

export interface ITooltip extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "dark" | "light";
  placement?:
    | "lt"
    | "left"
    | "lb"
    | "tl"
    | "top"
    | "tr"
    | "rt"
    | "right"
    | "rb"
    | "bl"
    | "bottom"
    | "br";
  title: any;
  defaultVisible?: boolean;
  isArrow?: boolean;
  isActive?: boolean;
}

export const Tooltip = ({
  theme = "dark",
  placement = "top",
  defaultVisible,
  isArrow = true,
  isActive = true,
  title,
  className,
  children,
  style,
  ...rest
}: ITooltip) => {
  const tooltipRef = useRef<any>();
  const [tooltibeVisible, setTooltibeVisible] = useState<boolean>(
    defaultVisible || false
  );

  const stylesContainer = classNames("ds-tooltip-container", className, {});
  const stylesContant = classNames("ds-tooltip-contant", {
    "is-visible": tooltibeVisible,
    "is-active": isActive,
    [`is-${theme}`]: theme,
    "is-arrow": isArrow,
  });

  function generatePlacement() {
    switch (placement) {
      case "lt":
        return {
          top: 0,
          left: `calc(-${tooltipRef.current?.offsetWidth + 18}px)`,
        };
      case "left":
        return {
          top: "calc(50% - 17px)",
          left: `calc(-${tooltipRef.current?.offsetWidth + 18}px)`,
        };
      case "lb":
        return {
          left: `calc(-${tooltipRef.current?.offsetWidth + 18}px)`,
          bottom: 0,
        };
      case "tl":
        return {
          top: `${-tooltipRef.current?.offsetHeight + -20}px`,
          left: 0,
        };
      case "top":
        return {
          top: `${-tooltipRef.current?.offsetHeight + -20}px`,
          right: `calc(50% - ${tooltipRef.current?.offsetWidth / 2}px)`,
        };
      case "tr":
        return {
          top: `${-tooltipRef.current?.offsetHeight + -20}px`,
          right: 0,
        };
      case "bl":
        return {
          left: 0,
          bottom: `${-tooltipRef.current?.offsetHeight + -20}px`,
        };
      case "bottom":
        return {
          right: `calc(50% - ${tooltipRef.current?.offsetWidth / 2}px)`,
          bottom: `${-tooltipRef.current?.offsetHeight + -20}px`,
        };
      case "br":
        return {
          right: 0,
          bottom: `${-tooltipRef.current?.offsetHeight + -20}px`,
        };
      case "rt":
        return {
          top: 0,
          right: `calc(-${tooltipRef.current?.offsetWidth + 18}px)`,
        };
      case "right":
        return {
          top: "calc(50% - 17px)",
          right: `calc(-${tooltipRef.current?.offsetWidth + 18}px)`,
        };
      case "rb":
        return {
          right: `calc(-${tooltipRef.current?.offsetWidth + 18}px)`,
          bottom: 0,
        };
      default:
        return {
          top: `${-tooltipRef.current?.offsetHeight + -20}px`,
          right: `calc(50% - ${tooltipRef.current?.offsetWidth / 2}px)`,
        };
    }
  }

  function generatePlacementArrow() {
    switch (placement) {
      case "tl":
        return {
          left: "8px",
          bottom: "-6px",
        };
      case "tr":
        return {
          right: "8px",
          bottom: "-6px",
        };
      case "top":
        return {
          right: "calc(50% - 10px)",
          bottom: "-6px",
        };
      case "bottom":
        return {
          right: "calc(50% - 10px)",
          top: "-6px",
        };
      case "bl":
        return {
          left: 8,
          top: "-6px",
        };
      case "br":
        return {
          right: 8,
          top: "-6px",
        };
      case "lt":
      case "left":
      case "lb":
        return {
          top: "calc(50% - 10px)",
          right: "-6px",
        };
      case "rt":
      case "right":
      case "rb":
        return {
          top: "calc(50% - 10px)",
          left: "-6px",
        };
      default:
        return {
          right: "calc(50% - 10px)",
          top: "-6px",
        };
    }
  }

  return (
    <div {...rest} style={style} className={stylesContainer}>
      <div
        onMouseEnter={() => {
          setTooltibeVisible(true);
        }}
        onMouseLeave={() => {
          setTooltibeVisible(false);
        }}
      >
        {children}
      </div>

      <div
        ref={tooltipRef}
        style={generatePlacement()}
        onMouseEnter={() => {
          setTooltibeVisible(true);
        }}
        onMouseLeave={() => {
          setTooltibeVisible(false);
        }}
        className={stylesContant}
      >
        <div
          style={generatePlacementArrow()}
          className="ds-tooltip-contant_arrow"
        />
        {title}
      </div>
    </div>
  );
};
