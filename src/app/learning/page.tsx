"use client";
import React, { useState } from "react";
import { Suspense } from "react";
import { motivationalPhrases } from "../mocks";
import "./styles.scss";
import dynamic from "next/dynamic";

function Learning() {
  const [motivationalIsVisible, setMotivationalIsVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  setTimeout(() => {
    setMotivationalIsVisible(false);
  }, 7000);

  setTimeout(() => {
    setHidden(true);
  }, 7350);

  return (
    <Suspense>
      <main className="contant">
        <div
          className={`motivational ${
            motivationalIsVisible ? "is-visible" : ""
          }`}
          style={{
            display: `${hidden ? "none" : "flex"}`,
            height: `${window.innerHeight}px`,
            background: `${motivationalPhrases[2].color}`,
          }}
        >
          <span>&quot;</span>
          <p className="motivational_phrase">{motivationalPhrases[2].phrase}</p>
        </div>
      </main>
    </Suspense>
  );
}

export default dynamic(() => Promise.resolve(Learning), {
  ssr: false,
});
