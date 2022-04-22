// * ========== Imports ==========

import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../../atoms/authModalAtom";

// *========== Variables & Functions ==========

const AuthButtons: React.FC = () => {
  //   contains atom: default open: false, view: "login"
  const setAuthModalState = useSetRecoilState(authModalState);

  // * ========== HTML ==========

  return (
    <>
      {/* variant declared in button.ts */}
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        // if open: true, than AuthModal.tsx opens
        onClick={() => setAuthModalState({open:true,view:"login"})}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        // if open: true, than AuthModal.tsx closes
        onClick={() => setAuthModalState({open:true,view:"signup"})}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
