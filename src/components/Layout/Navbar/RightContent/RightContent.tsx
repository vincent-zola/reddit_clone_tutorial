// * ========== Imports ==========

import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthModal from "../../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";

// * ========== TS Types ==========

type RightContentProps = {
  // user: any;
};

const RightContent: React.FC<RightContentProps> = () => {
  // * ========== HTML ==========

  return (
    <>
      <AuthModal/>
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
