"use client";
import React from "react";
import { Suspense } from "react";
import PharaseItem from "../components/phrase-item/phrase-item";
import "./styles.scss";
import { IPhrase } from "../components/types";
import {
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";

function Phrases() {
  const phrasesStore = localStorage.getItem("phrases");
  const phrases = JSON.parse(phrasesStore || "[]");

  return (
    <Suspense>
      <main
        className="contant phrases"
        style={{ height: `calc(${window.innerHeight}px - 64px)` }}
      >
        <div>
          <h1 className="title">Frases</h1>

          <ul className="phrases_list">
            {phrases?.map(({ text, priority, id }: IPhrase) => {
              return (
                <PharaseItem key={id} text={text} priority={priority} id={id} />
              );
            })}
          </ul>
        </div>

        <div className="phrases_pagination">
          <button className="phrases_pagination_btn btn">
            <CaretLeftOutlined />
          </button>
          <button className="phrases_pagination_btn btn">
            5/ Página <CaretDownOutlined />
          </button>
          <button className="phrases_pagination_btn btn">
            <CaretRightOutlined />
          </button>
        </div>
      </main>
    </Suspense>
  );
}

export default dynamic(() => Promise.resolve(Phrases), {
  ssr: false,
});
