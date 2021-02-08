import Link from "next/link";
import React from "react";

interface Props {
  src: string;
  href: string;
  as?: string;
  desc?: string;
}

export const CoverImage: React.FC<Props> = ({ src, href, as, desc }) => {
  return (
    <div className="sm:mx-0">
      <Link as={as} href={href} passHref>
        <a aria-label={desc}>
          <img
            className="shadow-small hover:shadow-medium rounded-lg transform hover:-translate-y-0.5 transition duration-500 w-full max-h-144 object-cover"
            alt={desc ? `Cover image for ${desc}` : ""}
            src={src}
            draggable={false}
          />
        </a>
      </Link>
    </div>
  );
};
