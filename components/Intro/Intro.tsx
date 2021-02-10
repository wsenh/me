import React from "react";
import { Text } from "../Shared/Text";
import { Splash } from "./Splash";

export const Intro: React.FC = () => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Splash />
        <Text content="A game development enthusiast." />
      </div>
    </section>
  );
};
