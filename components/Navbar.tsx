import Link from "next/link";
import React, { useState } from "react";
import { MenuIcon } from "./MenuIcon";

const NAV_LINKS: { text: string; href: string }[] = [
  { text: "Home", href: "/#" },
  { text: "About", href: "/#about" },
  { text: "Projects", href: "/#projects" },
  { text: "Miscellaneous", href: "/#miscellaneous" },
  { text: "Contact", href: "/#contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const desktopLink = (text: string, href: string) => (
    <Link href={href}>
      <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition">
        {text}
      </a>
    </Link>
  );

  const mobileLink = (text: string, href: string) => (
    <Link href={href}>
      <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition block">
        {text}
      </a>
    </Link>
  );

  return (
    <nav className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {NAV_LINKS.map(({ text, href }) => (
                  <React.Fragment key={text}>
                    {desktopLink(text, href)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              className="text-gray-300 hover:text-gray-800 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden" style={{ display: isOpen ? "block" : "none" }}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map(({ text, href }) => (
            <React.Fragment key={text}>{mobileLink(text, href)}</React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};
