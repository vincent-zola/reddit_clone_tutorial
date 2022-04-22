// * ========== Imports ==========

import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  // * ========== HTML ==========

  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      {/* // * ===== Logo =====
       */}
      <Flex align="center">
        <Image src="/images/redditFace.svg" height="30px" />
        {/* display = mediaquery, base = mobile  */}
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {/* <Directory/> */}
      <SearchInput />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
