"use client";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import PharaseItem from "../components/phrase-item/phrase-item";
import "./styles.scss";
import { IPhrase } from "../components/types";
import {
  AudioFilled,
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useSpeechContext } from "../provider/use-speech/use-speech";
import { useTranslation } from "../provider/translation/translation";

function Phrases() {
  const [isRec, setIsRec] = useState<boolean>(false);
  const [speechTranslations, setSpeechTranslations] = useState<string>();
  const { setTranslations } = useTranslation();
  const { speek } = useSpeechContext();

  const phrasesStore = localStorage.getItem("phrases");
  const phrases = JSON.parse(phrasesStore || "[]");

  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-US";
  function onRecognitionStart() {
    setIsRec(true);
    recognition.start();
  }

  recognition.addEventListener("result", (event) => {
    const result = event.results[0][0].transcript;
    setSpeechTranslations(result);
    setIsRec(false);
  });

  useEffect(() => {
    if (
      speechTranslations?.includes("create translation for word") ||
      speechTranslations?.includes("created translation for word")
    ) {
      const translationWoldSplit = speechTranslations.split(" ");
      setTranslations(translationWoldSplit[translationWoldSplit.length - 1]);
    }
  }, [speechTranslations]);

  return (
    <Suspense>
      <main
        className="contant phrases"
        style={{ height: `calc(${window.innerHeight}px - 64px)` }}
      >
        <div>
          <h1 className="title">Frases</h1>

          <div className="home_audio">
            <button
              className={`home_button-audio btn  ${isRec ? "is-rec" : ""}`}
              onClick={onRecognitionStart}
            >
              <AudioFilled />
            </button>
            <div className={`home_audio-rec  ${isRec ? "is-rec" : ""}`}></div>
          </div>

          <ul className="phrases_list">
            {phrases?.map(({ text, priority, id }: IPhrase) => {
              return (
                <PharaseItem
                  onClick={() => speek(text)}
                  key={id}
                  text={text}
                  priority={priority}
                  id={id}
                />
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
