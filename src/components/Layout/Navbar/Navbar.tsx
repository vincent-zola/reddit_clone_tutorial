// * ========== Imports ==========

import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

// *========== Variables & Functions ==========

const Navbar: React.FC = () => {
  // The user data for firebase authentication is stored in firebaseLocalStorageDb in IndexedDB. After login to website, if you delete firebaseLocalStorageDb, the login user data for firebase authentication is all deleted so you need to log in website again.
  // Retrieve and monitor the authentication state from Firebase.
  const [user, loading, error] = useAuthState(auth);

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
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
