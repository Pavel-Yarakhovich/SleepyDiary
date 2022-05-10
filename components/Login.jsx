import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { MdError } from "react-icons/md";

export { Login };

const fields = [
  { name: "name", placeholder: "Name" },
  { name: "email", placeholder: "Email" },
];

const Login = () => {
  const [userData, setUserData] = useState({});
  const [formFilled, setFormFilled] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const noEmptyValues = fields.every(
      (field) => !!userData[field.name]?.trim()
    );
    setFormFilled(noEmptyValues);
  }, [userData]);

  function onSubmit({ username, email }) {
    setProcessing(true);
    return userService
      .login(username, email)
      .then(() => {
        setProcessing(false);
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((error) => {
        console.log("err ", error);
        setProcessing(false);
        setError(error);
      });
  }

  return (
    <Flex
      direction={"column"}
      p={4}
      bg="white"
      borderRadius={"12px"}
      boxShadow="2px 3px 20px #dedede"
    >
      <Heading as="h3" mb={3}>
        Log in
      </Heading>
      {fields.map((field) => (
        <FormControl key={field.name} isRequired mb={3}>
          <FormLabel htmlFor={field.name}>{field.placeholder}</FormLabel>
          <Input
            id={field.name}
            placeholder={field.placeholder}
            value={userData[field.name] ?? ""}
            onChange={({ target }) => {
              setError("");
              setUserData((prev) => ({
                ...prev,
                [field.name]: target.value,
              }));
            }}
          />
        </FormControl>
      ))}
      {error && (
        <Flex m="5px auto" alignItems="center">
          <MdError color="red" />
          <Text ml={2} color="red">
            {error}
          </Text>
        </Flex>
      )}
      <Button
        isLoading={processing}
        disabled={!formFilled}
        onClick={() =>
          onSubmit({ username: userData.name, email: userData.email })
        }
      >
        Log in
      </Button>
    </Flex>
  );
};
