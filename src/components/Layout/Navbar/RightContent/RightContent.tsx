// * ========== Imports ==========

import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { auth } from "../../../../firebase/clientApp";
import AuthModal from "../../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";

// * ========== TS Types ==========

type RightContentProps = {
  // undefined, User, null
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  // * ========== HTML ==========

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {/* if user logged in show: Logout, else: AuthButtons */}
        {user ? <Icons /> : <AuthButtons />}
        {/* <Menu/> */}
      </Flex>
    </>
  );
};
export default RightContent;
