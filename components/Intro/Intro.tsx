import React from "react";
import { Splash } from "../Shared/Splash";
import { Text } from "../Shared/Text";

export const Intro: React.FC = () => {
  return (
    <section className="h-screen w-full flex flex-col flex items-center justify-center">
      <Splash />
      <Text content="/* A short intro */" />
    </section>
  );
};
