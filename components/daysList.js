// Components
import { Flex, useDisclosure, Heading, VStack } from "@chakra-ui/react";
import CreateDayDrawer from "./createDayDrawer";

// Helpers
import format from "date-fns/format";

const DaysList = ({ days = [], chosenDay, setChosenDay, dispatch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDayCreated = (data) => {
    if (data._id) {
      dispatch({
        type: "updateStore",
        payload: {
          days: [data, ...days],
        },
      });
      onClose();
    }
    // show toast
  };
  return (
    <VStack
      flex="30% 0 0"
      p="16px"
      mt={1}
      backgroundImage="linear-gradient(#fbebff 0%, rgba(116,9,121,0) 50%, rgba(255,255,255,1) 100%);"
    >
      <Heading>Tracked days</Heading>
      <CreateDayDrawer
        onDayCreated={onDayCreated}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <Flex
        w="100%"
        flexDirection="column"
        backdropFilter="blur(3px)"
        overflow="auto"
        p="15px 0"
      >
        {days?.map((day) => (
          <Flex
            key={day._id}
            onClick={() => setChosenDay(day)}
            justifyContent="center"
            alignItems="center"
            color={chosenDay?._id === day._id ? "white" : "rgb(26, 32, 44)"}
            p={3}
            fontSize={22}
            fontWeight="400"
            m="4px"
            bg={chosenDay?._id === day._id ? "purple" : "white"}
            cursor="pointer"
          >
            {format(Number(day.date), "PPPP")}
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
};

export default DaysList;
