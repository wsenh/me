import Image from "next/image";
import React from "react";

export const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden relative">
      <div className="max-w-7xl mx-auto justify-around lg:flex lg:items-center">
        <div className="py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">About Me</span>
          </h2>
          <p className="text-md mt-4 text-gray-400">
            Hi, I am Sen Hung Wong.
            <br />I am passionate about software design and game development.
            <br />- Graduated at Simon Fraser University on December 2020.
            <br />- Agile Developer at SAP from September 2019 to April 2020.
            <br />- Back End Developer at Blockchain Intelligence Group from
            January 2018 to December 2018.
          </p>
        </div>
        <div className="flex items-center gap-8 p-8 lg:p-24 select-none">
          <Image
            className="rounded-lg w-1/2"
            src="/photo.jpeg"
            width={320}
            height={400}
            alt="Me"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};
