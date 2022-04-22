//* The Layout component will wrap our entire app in _app.tsx
// * ========== Imports ==========

import React from "react";
import Navbar from "./Navbar/Navbar";

type Props = {
  children?: React.ReactNode
};

const Layout: React.FC<Props> = ({ children }) => {
  // * ========== HTML ==========
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
