import React from "react";
import { Navbar } from "../components/Navbar";
import { Title } from "../components/Title";

const IndexPage: React.FC = () => {
  return (
    <div className="w-screen h-screen dark:bg-gray-800">
      <div className="flex flex-col h-full">
        <Navbar />
        <Title />
      </div>
    </div>
  );
};

export default IndexPage;
