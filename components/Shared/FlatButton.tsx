import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  as?: string;
}

export const FlatButton: React.FC<Props> = ({ href, as, children }) => {
  return (
    <Link href={href} as={as} passHref>
      <a className="mx-3 text-xl font-semibold hover:underline">{children}</a>
    </Link>
  );
};
