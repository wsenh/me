import Link from "next/link";
import React from "react";

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
          className="p-1 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-500 bg-accent-700"
          style={{ width, height }}
        >
          <img
            className="rounded-lg w-full h-full object-cover object-center"
            src={src}
            alt={desc ? `Cover image for ${desc}` : ""}
            draggable={false}
          />
        </div>
      </a>
    </Link>
  );
};
