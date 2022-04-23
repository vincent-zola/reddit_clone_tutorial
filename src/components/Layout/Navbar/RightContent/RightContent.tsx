// * ========== Imports ==========

import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../../../firebase/clientApp";
import AuthModal from "../../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";

// * ========== TS Types ==========

type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  // * ========== HTML ==========

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {/* if user logged in show: Logout, else: AuthButtons */}
        {user ? <Button onClick={() => signOut(auth)} >Logout</Button> : <AuthButtons />}
      </Flex>
    </>
  );
};
export default RightContent;
