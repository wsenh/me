import React from "react";

interface Props {
  src: string;
  alt?: string;
  className?: string;
  fallbackType?: string;
}

export const ImageDisplayer: React.FC<Props> = ({
  src,
  alt,
  className,
  fallbackType,
}) => {
  const withoutExt = src.split(".").slice(0, -1).join(".");
  const ext = src.split(".").pop();
  const isVideo = ext === "webm" || ext === "mp4";
  return isVideo ? (
    <video className={className} about={alt} autoPlay loop muted playsInline>
      <source src={src} type={`video/${ext}`} />
      {fallbackType && (
        <source
          src={`${withoutExt}.${fallbackType}`}
          type={`video/${fallbackType}`}
        />
      )}
    </video>
  ) : (
    <img className={className} alt={alt} src={src} draggable={false} />
  );
};
