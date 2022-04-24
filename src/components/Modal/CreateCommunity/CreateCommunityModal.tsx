// * ========== Imports ==========

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../firebase/clientApp";

// * ========== TS Types ==========

type CreateCommunityModalProps = {
  open: boolean;
  //   type is a Fn. that does not return anything
  handleClose: () => void;
};

// *========== Variables & Functions ==========

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  // Name form Input
  const [communityName, setCommunityName] = useState("");
  // Name can be just max 21 chars
  const [charsRemaining, setCharsRemaining] = useState(21);
  //   for community selection
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Fn. handling name input and chars calculation
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   stop Fn if name exceeds 21
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    // recalculate how many chars left for the name
    setCharsRemaining(21 - event.target.value.length);
  };
  //   handle Community Type selection
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  // * ===== Create Communities =====
  // communications with db are async operations
  const handleCreateCommunity = async () => {
    if(error) setError("")
    // validate the community
    // using RegExp .test() function to check for a pattern match
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3-21 characters, and can only contain letters, numbers, or underscores"
      );
      return;
    }
    setLoading(true);

    try {
      // create the community document in firestore
      // Check that name is not taken
      // doc() creates a reference to db, firestore declared in clientApp.ts, "communities" name of the collection in db, communityName is the ID of the Document, it can be used because it's unique in our case
      // communityDocRef is basically a path 
      const communityDocRef = doc(firestore, "communities", communityName);
      // get the actual document from db, if it exists throw error
      const communityDoc = await getDoc(communityDocRef);
      if (communityDoc.exists()) {
        throw new Error(`Sorry, r/${communityName} is taken, Try another.`);
      }

      // If valid name, create community, use communityDocRef as path.
      await setDoc(communityDocRef, {
        // creatorId
        creatorId: user?.uid,
        // createdAt, serverTimestamp() is a firebase fn.
        createdAd: serverTimestamp(),
        // numberOfMembers,
        numberOfMembers: 1,
        // privacyType
        privacyType: communityType,
      });
    } catch (error: any) {
      console.log(`handleCreateCommunity error`, error);
      setError(error.message);
    }
    setLoading(false);
  };

  // * ========== HTML ==========

  return (
    <>
      {/* make modal bigger by adding size="lg" */}
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          {/* Box is a simple Div */}
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              {/* //*===== Error message =====
               */}
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                {/* //*===== CheckBox =====
                 */}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" mt={1}>
                        Anyone can view, post, and comment to this community{" "}
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" mt={1}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" mt={1}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
