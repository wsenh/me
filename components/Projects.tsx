import React from "react";
import { Project } from "./Project";

const PROJECTS: { href: string; src: string }[] = [
  { src: "/pizza.png", href: "https://senhung.itch.io/pipipizza" },
  { src: "/twopowerful.gif", href: "https://senhung.itch.io/two-powerful" },
  { src: "/ld47.png", href: "https://senhung.itch.io/enjoy-your-stay" },
  { src: "/dungeon.gif", href: "https://senhung.itch.io/dungeon-guidance" },
  { src: "/seagulls.png", href: "https://senhung.itch.io/duck-vs-seagulls" },
];

export const Projects: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">Projects</span>
          </h2>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-12">
            {PROJECTS.map(({ src, href }) => (
              <React.Fragment key={src}>
                <Project src={src} href={href} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
