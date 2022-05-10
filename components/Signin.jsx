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
} from "@chakra-ui/react";

export { Signin };

const fields = [
  { name: "name", placeholder: "Name" },
  { name: "email", placeholder: "Email" },
  { name: "babyName", placeholder: "Baby name" },
];

const contentType = "application/json";

const Signin = () => {
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

  const signInUser = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      setError("Failed to create a user");
    }
  };

  return (
    <Flex
      direction={"column"}
      p={4}
      bg="white"
      borderRadius={"12px"}
      boxShadow="2px 3px 20px #dedede"
    >
      <Heading as="h3" mb={3}>
        New user
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
      <Button disabled={!formFilled} onClick={signInUser}>
        Sign in
      </Button>
    </Flex>
  );
};
