// * ========== Imports ==========

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

// *========== Variables & Functions ==========

const AuthModal: React.FC = () => {
  //   contains atom: open: false, view: "login"
  const [modalState, setModalState] = useRecoilState(authModalState);
  // Retrieve and monitor the authentication state from Firebase.
  const [user, loading, error] = useAuthState(auth);
  //   pressing close Button
  const handleClose = () => {
    //   copy previous state and set open to false
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // initially user is null, if user changes close Modal
  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  // * ========== HTML ==========

  return (
    <>
      {/* if modalState.open = true, than show Modal */}
      <Modal isOpen={modalState.open} onClose={handleClose}>
        {/* darkens the rest of the screen */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <Text color="gray.500">OR</Text>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
