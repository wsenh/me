import Link from "next/link";
import React from "react";

export const HomeButton: React.FC = () => {
  return (
    <div className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/" passHref>
        <a className="hover:underline">Sen Hung</a>
      </Link>
      .
    </div>
  );
};
