//* The Layout component will wrap our entire app in _app.tsx
// * ========== Imports ==========
// import ReactNode, so that children can be assign to a TS type
import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

// * ========== TS Types ==========

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  
  // * ========== HTML ==========
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
