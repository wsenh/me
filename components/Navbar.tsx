import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuIcon } from "./MenuIcon";
import { ThemeSwitch } from "./ThemeSwitch";

const NAV_LINKS: { text: string; href: string }[] = [
  { text: "Home", href: "/#" },
  { text: "About", href: "/#about" },
  { text: "Projects", href: "/#projects" },
  // { text: "Miscellaneous", href: "/#miscellaneous" },
];

const SCROLL_THRESHOLD = 300;

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverThreshold, setOverThreshold] = useState(false);

  const desktopLink = (text: string, href: string, isover: boolean) => (
    <Link href={href} passHref>
      <a
        aria-label={text}
        rel="noopener"
        className={`${
          isover
            ? "text-gray-300 hover:text-white"
            : "text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        } px-3 py-2 rounded-md text-base font-medium transition`}
      >
        {text}
      </a>
    </Link>
  );

  const mobileLink = (text: string, href: string, isover: boolean) => (
    <Link href={href} passHref>
      <a
        aria-label={text}
        rel="noopener"
        className={`${
          isover
            ? "text-gray-300 hover:text-white"
            : "text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        } px-3 py-2 rounded-md text-base font-medium transition block`}
      >
        {text}
      </a>
    </Link>
  );

  useEffect(() => {
    const listener = () => {
      const overThreshold = window.scrollY > SCROLL_THRESHOLD;
      setOverThreshold(overThreshold);
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [setOverThreshold]);

  return (
    <nav
      className={`transition duration-700 ${
        isOverThreshold ? "bg-gray-900 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div
          className={`flex items-center justify-between h-16 transition duration-500 ${
            isOverThreshold ? "" : "transform translate-y-4"
          }`}
        >
          <div className="flex w-full items-center">
            <div className="hidden md:block w-full">
              <div className="ml-10 flex items-baseline space-x-4">
                {NAV_LINKS.map(({ text, href }) => (
                  <React.Fragment key={text}>
                    {desktopLink(text, href, isOverThreshold)}
                  </React.Fragment>
                ))}
                <div className="flex flex-1 items-baseline justify-end">
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              aria-label={isOpen ? "Collapse Navigation" : "Expand Navigation"}
              className={`${
                isOverThreshold
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-400 hover:text-gray-700"
              } inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map(({ text, href }) => (
            <React.Fragment key={text}>
              {mobileLink(text, href, isOverThreshold)}
            </React.Fragment>
          ))}
          <div
            className={`${
              isOverThreshold
                ? "text-gray-300 hover:text-white"
                : "text-gray-400 hover:text-gray-700"
            } px-3 py-2 rounded-md text-base font-medium transition block`}
          >
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
};
