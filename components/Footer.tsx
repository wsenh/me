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
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-200">
          <Image
            src="/icon-white.png"
            width={56}
            height={56}
            draggable={false}
          />
        </a>
        <p className="text-md text-gray-200 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-400 sm:py-2 sm:mt-0 mt-4">
          © 2021{year == 2021 ? "" : `-${year}`} Sen Hung Wong
        </p>
        <span className="inline-flex text-2xl sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <Link href="mailto:me@wsenh.com">
            <a className="text-gray-200" target="_blank">
              <EmailIcon />
            </a>
          </Link>
          <Link href="https://github.com/wsenh">
            <a className="ml-4 text-gray-200" target="_blank">
              <GithubIcon />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/senhungwong/">
            <a className="ml-4 text-gray-200" target="_blank">
              <LinkedInIcon />
            </a>
          </Link>
          <Link href="https://senhung.itch.io/">
            <a className="ml-4 text-gray-200">
              <ItchIcon />
            </a>
          </Link>
        </span>
      </div>
    </footer>
  );
};
