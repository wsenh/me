import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  src: string;
}

export const Project: React.FC<Props> = ({ href, src }) => {
  return (
    <Link href={href} passHref>
      <a
        aria-label={src} // TODO: Use project name
        rel="noopener"
        className="relative shadow-md hover:shadow-xl rounded-2xl bg-white dark:bg-gray-300 m-auto pt-2 px-2 pb-1 transition duration-500 transform hover:-translate-y-1 select-none cursor-pointer"
        target="_blank"
      >
        <Image
          src={src}
          width={350}
          height={350}
          className="rounded-xl"
          draggable={false}
          objectFit="cover"
          objectPosition="center"
        />
      </a>
    </Link>
  );
};
