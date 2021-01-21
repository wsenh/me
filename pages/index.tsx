import React from "react";
import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { Miscellaneous } from "../components/Miscellaneous";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Projects";
import { Title } from "../components/Title";

const IndexPage: React.FC = () => {
  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-gray-800 flex flex-col">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div id="home" className="border-b border-gray-300 dark:border-gray-500">
        <Title />
      </div>
      <div id="about" className="border-b border-gray-300 dark:border-gray-500">
        <About />
      </div>
      <div
        id="projects"
        className="border-b border-gray-300 dark:border-gray-500"
      >
        <Projects />
      </div>
      <div id="miscellaneous">
        <Miscellaneous />
      </div>
      <Footer />
    </div>
  );
};

export default IndexPage;
