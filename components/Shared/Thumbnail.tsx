import Link from "next/link";
import React from "react";
import { ImageDisplayer } from "./ImageDisplayer";

interface Props {
  src: string;
  href: string;
  width: number;
  height: number;
  as?: string;
  desc?: string;
}

export const Thumbnail: React.FC<Props> = ({
  src,
  href,
  as,
  desc,
  width,
  height,
}) => {
  return (
    <Link as={as} href={href} passHref>
      <a aria-label={desc} rel="noopener">
        <div
          className="p-1 rounded-xl hover:bg-gray-400 transition duration-200 bg-accent-700"
          style={{ width, height }}
        >
          <ImageDisplayer
            className="rounded-lg w-full h-full object-cover object-center"
            src={src}
            alt={desc ? `Cover image for ${desc}` : ""}
          />
        </div>
      </a>
    </Link>
  );
};
