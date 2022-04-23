// * ========== Imports ==========

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

// *========== Variables & Functions ==========

const SignUp: React.FC = () => {
  //   contains atom: open: false, view: "login"
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // will be displayed beneath input element
  const [error, setError] = useState("");
  // Extract variables from react-firebase-hook library
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  //   Firebase sign up
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    // check passwords
    if (signUpForm.password !== signUpForm.confirmPassword) {
      // set Error if passwords dont match
      setError("Passwords do not match");
      return;
    }

    // password match
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  //   type of event: React.ChangeEvent
  // emitter of event: <HTMLInputElement>
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   update form state
    setSignUpForm((prev) => ({
      ...prev,
      // event.target.name either email or password
      [event.target.name]: event.target.value,
    }));
  };

  // * ========== HTML ==========

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      {/* // * ===== Error display ===== */}

      <Text textAlign="center" color="red" fontSize="10pt">
        {/* errors are stored in errors.ts */}
        {/* as keyof typeof = assign a type for TS */}
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        type="submit"
        mt={2}
        mb={2}
        // for loading animation
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "login" }))
          }
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
