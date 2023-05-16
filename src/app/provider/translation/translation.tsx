"use client";
import dynamic from "next/dynamic";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ITranslationProvider {
  children: JSX.Element[] | JSX.Element;
}

interface ITranslationContext {
  word: Array<string>;
  translations: string | undefined;
  setTranslations: Dispatch<SetStateAction<string | undefined>>;
}

export const UseTranslation = createContext<ITranslationContext | null>(null);

function UseTranslationProvider({ children, ...props }: ITranslationProvider) {
  const translationsParse = JSON.parse(
    localStorage.getItem("translations") || "[]"
  );
  const [translations, setTranslations] = useState<string>();
  const [word, setWord] = useState<Array<string>>(translationsParse);

  useEffect(() => {
    const translationStore = localStorage.getItem("translations");
    const translationsParse: Array<string> = JSON.parse(
      translationStore || "[]"
    );

    const current = translationsParse.find((item) => item === translations);

    if (!current && translations) {
      localStorage.setItem(
        "translations",
        JSON.stringify([...translationsParse, translations])
      );
      setWord([...translationsParse, translations]);
    }
  }, [translations]);

  return (
    <UseTranslation.Provider
      value={{ translations, setTranslations, word }}
      {...props}
    >
      {children}
    </UseTranslation.Provider>
  );
}

export function useTranslation(): ITranslationContext {
  const context = useContext(UseTranslation);

  if (!context) {
    throw new Error(
      "useTranslation must be used after an UseTranslationContext.Provider"
    );
  }

  return context;
}

export default dynamic(() => Promise.resolve(UseTranslationProvider), {
  ssr: false,
});
