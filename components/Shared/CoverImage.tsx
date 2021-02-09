import Link from "next/link";
import React from "react";
import { ImageDisplayer } from "./ImageDisplayer";

interface Props {
  src: string;
  href: string;
  as?: string;
  desc?: string;
  free?: boolean;
}

export const CoverImage: React.FC<Props> = ({ src, href, as, desc, free }) => {
  return (
    <div className="sm:mx-0">
      <Link as={as} href={href} passHref>
        <a aria-label={desc}>
          <ImageDisplayer
            className={`shadow-small hover:shadow-medium rounded-lg transform hover:-translate-y-0.5 transition duration-500 w-full ${
              free ? "max-h-144" : "lg:h-96 md:h-64"
            } object-cover`}
            alt={desc ? `Cover image for ${desc}` : ""}
            src={src}
            fallbackType="mp4"
          />
        </a>
      </Link>
    </div>
  );
};
