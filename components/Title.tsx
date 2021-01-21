import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export const Title: React.FC = () => {
  const { theme } = useTheme();
  return (
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
