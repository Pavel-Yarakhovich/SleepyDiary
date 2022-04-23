import React, { useState } from "react";

import {
  Text,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  useDisclosure,
  Divider,
  NumberInput,
  HStack,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Spinner,
  Flex,
} from "@chakra-ui/react";

const FinishDaySleep = ({ nap, onNapFinished }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [finishTime, setFinishTime] = useState({});
  const [wakeUp, setWakeUp] = useState("");
  const [processing, setProcessing] = useState(false);

  const finishNap = async () => {
    setProcessing(true);

    const finishNapTime = new Date();
    finishNapTime.setHours(finishTime.hour, finishTime.minute);
    const finishNapTimestamp = finishNapTime.getTime();

    const params = {
      end: finishNapTimestamp,
      endComment: wakeUp,
    };

    const updateParams = {
      start: nap.start,
      params,
    };

    const response = await fetch("/api/nap", {
      method: "PUT",
      body: JSON.stringify(updateParams),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const updatedNap = { ...data };

    if (data) {
      // updatedNap._id = napId;
    } else {
      updatedNap.error =
        "Не удалось закончить сон! Нужно попробовать еще разок.";
    }

    setProcessing(false);
    onClose();
    onNapFinished(updatedNap);
  };

  return (
    <>
      <Button ml="16px" onClick={onOpen} colorScheme="yellow">
        Закончить сон
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="3px" />
        <ModalContent>
          <ModalHeader fontSize={26}>Мама, я проснулась!</ModalHeader>
          <ModalCloseButton />
          <ModalBody position="relative">
            {processing && (
              <Flex
                position="absolute"
                zIndex={12}
                top={0}
                left={0}
                right={0}
                height="100%"
                alignItems={"center"}
                justifyContent={"center"}
                bg="rgba(255,255,255,0.7)"
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            )}
            <Text mb="8px">Время окончания сна</Text>
            <HStack>
              <NumberInput
                onChange={(str, number) =>
                  setFinishTime((prev) => ({ ...prev, hour: number }))
                }
                value={finishTime.hour ?? 0}
                min={0}
                max={23}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text ml="8px" mr="15px">
                часов
              </Text>
              <NumberInput
                onChange={(str, number) =>
                  setFinishTime((prev) => ({ ...prev, minute: number }))
                }
                value={finishTime.minute ?? 0}
                min={0}
                max={59}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text ml="8px">минут</Text>
            </HStack>
            <Divider orientation="horizontal" my="16px" />
            <Textarea
              value={wakeUp}
              onChange={({ target }) => setWakeUp(target.value)}
              placeholder="Как карапуз проснулся"
              size="md"
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="yellow" onClick={finishNap}>
              Закончить сон
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FinishDaySleep;
