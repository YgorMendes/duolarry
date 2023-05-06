import React from "react";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default function Phrases() {
  return (
    <Suspense>
      <main className="contant">Phrases</main>;
    </Suspense>
  );
}
