import Image from "next/image";
import React from "react";

export const Title: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="select-none mx-8 mb-8">
        <Image
          src="/SenHungWong.png"
          alt="Sen Hung Wong"
          width={598}
          height={241}
          draggable={false}
        />
      </div>
    </div>
  );
};
