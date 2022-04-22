// * ========== Imports ==========

import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import Login from "./Login";
import SignUp from "./SignUp";

// * ========== TS Types ==========

type AuthInputsProps = {};

// *========== Variables & Functions ==========

const AuthInputs: React.FC<AuthInputsProps> = () => {
  //   contains atom: open: false, view: "login"
  const modalState = useRecoilValue(authModalState);

  // * ========== HTML ==========

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
    </Flex>
  );
};
export default AuthInputs;
