// * ========== Imports ==========

import { Menu, MenuButton, MenuList, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

// *========== Variables & Functions ==========

const UserMenu: React.FC = () => {
  // * ========== HTML ==========

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontSize="10pt" fontWeight={600}>
                Home
              </Text>
            </Flex>
          </Flex>

          {/* Arrow down Icon */}
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      {/* // * ===== user logged in display menu items =====
       */}
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
