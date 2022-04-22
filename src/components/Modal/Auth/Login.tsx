// * ========== Imports ==========

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

// * ========== TS Types ==========

type LoginProps = {};

// *========== Variables & Functions ==========

const Login: React.FC<LoginProps> = () => {
  //   contains atom: open: false, view: "login"
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  //   Firebase login
  const onSubmit = () => {};

  //   type of event: React.ChangeEvent
  // emitter of event: <HTMLInputElement>
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   update form state
    setLoginForm((prev) => ({
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
      <Button width="100%" height="36px" type="submit" mt={2} mb={2}>
        Log In
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New Here?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "signup" }))
          }
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
