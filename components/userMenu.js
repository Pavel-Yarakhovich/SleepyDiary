import {} from "react";

// Components
import { Box, Text, Flex, Heading, Divider } from "@chakra-ui/react";

const UserMenu = () => {
  return (
    <Flex alignItems="center" cursor="pointer">
      <Text>Юлия</Text>
      <Box ml="15px" w="50px" h="50px" borderRadius="50%" bg="gray"></Box>
    </Flex>
  );
};

export default UserMenu;
