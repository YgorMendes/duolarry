"use client";
import { useState } from "react";
import { AudioFilled } from "@ant-design/icons";
import { useDebounce } from "./utils/useDebounce";
import { useUserFeedbackContext } from "./provider/user-feedback/user-feedback";
import "./styles.scss";
import dynamic from "next/dynamic";

function Home() {
  const [phrase, setPhrase] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const phraseDebounced = useDebounce(phrase, 1000);

  const { setIsOpen, setMessage, setType } = useUserFeedbackContext();

  function onSubmit(e: any) {
    e.preventDefault();
    const currentPhrasesStore: any = localStorage.getItem("phrases");
    const currentPhrases: any = JSON.parse(currentPhrasesStore);

    const priorityForm = e.target.priority.value;
    const itemPhrase = { text: phraseDebounced, priority: priorityForm };

    if (currentPhrases) {
      localStorage.setItem(
        "phrases",
        JSON.stringify([...currentPhrases, itemPhrase])
      );
    } else {
      localStorage.setItem("phrases", JSON.stringify([itemPhrase]));
    }
    setIsOpen(true);
    setMessage("Frase cadastrada com sucesso!");
    setType("success");

    setTimeout(() => {
      setPhrase("");
    }, 2500);
  }

  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-US";

  function onRecognitionStart() {
    recognition.start();
  }

  function onRecognitionStop() {
    recognition.stop();
  }

  recognition.addEventListener("result", (event) => {
    const result = event.results[0][0].transcript;
    setPhrase(result);
  });

  return (
    <main
      className="contant home"
      style={{ height: `calc(${window.innerHeight}px - 64px)` }}
    >
      <div>
        <h1 className="title">Cadastrar frase</h1>

        <div className="home_create-phrase">
          <textarea
            className="home_textarea"
            value={phrase}
            onChange={(e) => setPhrase(e.currentTarget.value)}
          />

          <form className="home_priority" onSubmit={onSubmit}>
            <input
              type="radio"
              name="priority"
              id="low"
              value={0}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            />
            <label className="home_label" htmlFor="low">
              Baixa
            </label>
            <input
              type="radio"
              name="priority"
              id="medium"
              value={1}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            />
            <label className="home_label" htmlFor="medium">
              Média
            </label>
            <input
              type="radio"
              name="priority"
              id="hight"
              value={2}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            />
            <label className="home_label" htmlFor="hight">
              Alta
            </label>

            <button
              type="submit"
              disabled={phraseDebounced && priority ? false : true}
              className="home_button btn"
            >
              Criar
            </button>
          </form>
        </div>
      </div>

      <div className="home_audio">
        <button
          className="home_button-audio btn"
          onMouseDown={onRecognitionStart}
          onMouseUp={onRecognitionStop}
        >
          <AudioFilled />
        </button>
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
