// * ========== Imports ==========

import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";

// *========== Variables & Functions ==========

const OAuthButtons: React.FC = () => {
  // Extract variables from react-firebase-hook library
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  // *Push created user to db or replacing existing user data
  // takes in User from auth
  const createUserDocument = async (user: User) => {
    // userDocRef now stores the path to our collection
    // user.uid is an unique identifier in the collection for separate user
    const userDocRef = doc(firestore, "users", user.uid);
    // adding or replacing user data to firebase db, "users" is the collection and user will be the value of the collection
    await setDoc(
      userDocRef,
      // convert user to an JS object
      // kind of cloning an object, so that you get a complete copy that is unique but has the same properties as the cloned object, changes it although a bit, so that firebase does not complain
      JSON.parse(JSON.stringify(user))
    );
   
    
  };
  // every time user changes push user data to firebase db
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  // * ========== HTML ==========

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;
