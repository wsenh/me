import Image from "next/image";
import Link from "next/link";
import React from "react";
import { EmailIcon } from "./EmailIcon";
import { GithubIcon } from "./GithubIcon";
import { ItchIcon } from "./ItchIcon";
import { LinkedInIcon } from "./LinkedInIcon";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-200">
          <Image
            src="/icon-white.png"
            width={56}
            height={56}
            draggable={false}
          />
        </div>
        <p className="text-md text-gray-200 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-400 sm:py-2 sm:mt-0 mt-4">
          © 2021{year == 2021 ? "" : `-${year}`} Sen Hung Wong
        </p>
        <span className="inline-flex text-2xl sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <Link href="mailto:me@wsenh.com" passHref>
            <a
              aria-label="Email"
              rel="noopener"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
            >
              <EmailIcon />
            </a>
          </Link>
          <Link href="https://github.com/wsenh" passHref>
            <a
              aria-label="Github"
              rel="noopener"
              className="ml-4 text-gray-400 hover:text-white transition"
              target="_blank"
            >
              <GithubIcon />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/senhungwong/" passHref>
            <a
              aria-label="LinkedIn"
              rel="noopener"
              className="ml-4 text-gray-400 hover:text-white transition"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
          </Link>
          <Link href="https://senhung.itch.io/" passHref>
            <a
              aria-label="Itch.io"
              rel="noopener"
              className="ml-4 text-gray-400 hover:text-white transition"
              target="_blank"
            >
              <ItchIcon />
            </a>
          </Link>
        </span>
      </div>
    </footer>
  );
};
