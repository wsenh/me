import React from "react";

export const Splash: React.FC = () => {
  return (
    <div className="md:mb-32 sm:mb-20 mb-12 mx-12">
      <h1 className="relative">
        <span className="text-6xl md:text-8xl font-bold tracking-tighter">
          Sen Hung
        </span>
        <img
          src="/static/imgs/handwritten-wong.png"
          className="absolute w-6/12 md:top-16 md:-right-24 top-8 -right-10 hidden sm:block"
          draggable={false}
        />
      </h1>
    </div>
  );
};
