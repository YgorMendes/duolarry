"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IUseSpeechProvider {
  children: JSX.Element[] | JSX.Element;
}

interface IUseSpeechContext {
  speek: (text: string) => void;
}

export const UseSpeechContext = createContext<IUseSpeechContext | null>(null);

export function UseSpeechProvider({ children, ...props }: IUseSpeechProvider) {
  useEffect(() => {
    const recognition =
      new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "en-US";
  }, []);

  function speek(text: string) {
    let voices = window.speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[4];
    return speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    speek("");
  }, []);

  return (
    <UseSpeechContext.Provider value={{ speek }} {...props}>
      {children}
    </UseSpeechContext.Provider>
  );
}

export function useSpeechContext(): IUseSpeechContext {
  const context = useContext(UseSpeechContext);

  if (!context) {
    throw new Error(
      "useSpeechContext must be used after an UseSpeechContext.Provider"
    );
  }

  return context;
}
