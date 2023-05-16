import React, { useCallback, useEffect } from "react";
import { MoreOutlined, SoundOutlined } from "@ant-design/icons";
import "./styles.scss";
import { Tooltip } from "../index";
import { useSpeechContext } from "@/app/provider/use-speech/use-speech";
import { useTranslation } from "@/app/provider/translation/translation";

interface IPhraseItem extends React.HTMLAttributes<HTMLLIElement> {
  priority: "low" | "medium" | "hight";
  text: string;
}

async function translateWord(word: string, targetLanguage: string) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(
      word
    )}`;

    // Send the GET request to the translation endpoint
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const translatedWord = data[0][0][0];
        resolve(translatedWord.toLowerCase());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function PhraseItem({ text, onClick, priority, ...props }: IPhraseItem) {
  const { word } = useTranslation();
  const { speek } = useSpeechContext();

  const createTooltipTranslation = useCallback(
    async (text: string, translations: Array<string>) => {
      const textSplit: Array<string> = text.split(" ");

      if (translations.length > 0) {
        return textSplit.map((text) => {
          const isEqual = translations.find(
            (translation) => translation === text
          );

          if (!isEqual) {
            return (
              <React.Fragment key={Math.random()}>{text + " "}</React.Fragment>
            );
          } else {
            return translations.map((translation) => {
              if (text === translation) {
                const translated = translateWord(text, "pt").then(
                  (translatedWord) => translatedWord
                );
                return (
                  <>
                    <Tooltip
                      theme="light"
                      key={Math.random()}
                      title={translated}
                    >
                      <p
                        onClick={() => speek(text)}
                        className="phrase-item-word-translation"
                      >
                        {text}
                      </p>
                    </Tooltip>
                  </>
                );
              }
            });
          }
        });
      } else {
        return text;
      }
    },
    [word]
  );

  return (
    <li {...props} className="phrase-item" {...props}>
      <div className="phrase-item_container">
        <div className={`phrase-item_priority is-${priority}`} />
        <SoundOutlined
          className="phrase-item_icon-sound"
          onClick={(e: any) => {
            if (onClick) onClick(e);
          }}
        />
        <div className="phrase-item_text">
          <div className="phrase-item_container-text">
            {createTooltipTranslation(text, word)}
          </div>
        </div>
      </div>

      <MoreOutlined />
    </li>
  );
}

export default PhraseItem;
