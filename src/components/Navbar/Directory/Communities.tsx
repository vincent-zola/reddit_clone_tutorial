// * ========== Imports ==========

import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";

// * ========== TS Types ==========

type CommunitiesProps = {};

// *========== Variables & Functions ==========

const Communities: React.FC<CommunitiesProps> = () => {
    // if user clicked on Create Community, Modal for it will appear
  const [open, setOpen] = useState(false);

  // * ========== HTML ==========

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};
export default Communities;
