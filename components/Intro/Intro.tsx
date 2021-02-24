import React from "react";
import { Splash } from "./Splash";

export const Intro: React.FC = () => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Splash />
      </div>
    </section>
  );
};
