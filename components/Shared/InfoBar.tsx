import React from "react";
import { Container } from "../Layout/Container";

export const InfoBar: React.FC = ({ children }) => {
  return (
    <div className="border-b bg-accent-100 border-accent-200">
      <Container>
        <div className="py-2 text-center text-sm">{children}</div>
      </Container>
    </div>
  );
};
