import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export const Title: React.FC = () => {
  const { theme } = useTheme();

  const r = (
    <section className="flex-col md:flex-row flex items-center md:justify-between my-16">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Sen Hung
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">Test?</h4>
    </section>
  );

  return true ? (
    r
  ) : (
    <div className="flex flex-none items-center justify-center h-screen w-full">
      <div className="flex flex-col select-none mx-8 mb-8">
        <Image
          src={theme === "dark" ? "/SenHungWongDark.png" : "/SenHungWong.png"}
          alt="Sen Hung Wong"
          width={598}
          height={270}
          draggable={false}
        />
      </div>
    </div>
  );
};
