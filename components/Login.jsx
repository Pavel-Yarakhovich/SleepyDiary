import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from 'services';

import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

export { Login };

const fields = [
  { name: "name", placeholder: "Name" },
  { name: "email", placeholder: "Email" }
];

const contentType = "application/json";

const Login = () => {
  const [userData, setUserData] = useState({});
  const [formFilled, setFormFilled] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const noEmptyValues = fields.every(
      (field) => !!userData[field.name]?.trim()
    );
    setFormFilled(noEmptyValues);
  }, [userData]);

  function onSubmit({ username, email }) {
    return userService.login(username, email)
      .then(() => {
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
      })
      .catch(error => {
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
            onChange={({ target }) =>
              setUserData((prev) => ({
                ...prev,
                [field.name]: target.value,
              }))
            }
          />
        </FormControl>
      ))}
      <Button disabled={!formFilled} onClick={() => onSubmit({ username: userData.name, email: userData.email })}>
        Log in
      </Button>
    </Flex>
  );
};
