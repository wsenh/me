import React from "react";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Miscellaneous } from "../components/Miscellaneous";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Projects";
import { Title } from "../components/Title";

const IndexPage: React.FC = () => {
  return (
    <div className="w-full h-screen dark:bg-gray-800 flex flex-col">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div
        id="home"
        className="flex flex-none items-center justify-center h-screen w-full"
      >
        <Title />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="miscellaneous">
        <Miscellaneous />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default IndexPage;
