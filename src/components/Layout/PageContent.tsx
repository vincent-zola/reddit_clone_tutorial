// * ========== Imports ==========

import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

// * ========== TS Types ==========

interface PageContentProps {
  // defining children as an array of ReactNode elements, so that we can indexing them
  children: ReactNode[];
}
// children are elements inside the <PageContent></PageContent> element in index.tsx
const PageContent: React.FC<PageContentProps> = ({ children }) => {
  // * ========== HTML ==========

  return (
    <Flex justify="center" p="16px 0px" border="1px solid red">
      <Flex
        width="95%"
        justify="center"
        maxWidth="860px"
        border="1px solid green"
      >
        {/* LHS */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: "0", md: "6" }}
          border="1px solid blue"
        >
          {children && children[0]}
        </Flex>
        {/* RHS */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
          border="1px solid orange"
        >
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
