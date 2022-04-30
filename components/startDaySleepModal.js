import React, { useState, useEffect } from "react";

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

const StartDaySleep = ({ dayId, onNapCreated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startTime, setStartTime] = useState({});
  const [ritual, setRitual] = useState("");
  const [fellAsleep, setFellAsleep] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {}, [startTime]);

  const createNap = async () => {
    setProcessing(true);

    const startNap = new Date();
    startNap.setHours(startTime.hour ?? 0, startTime.minute ?? 0);
    const startNapTimestamp = startNap.getTime();

    const newNap = {
      parentDayId: dayId,
      start: startNapTimestamp,
      ritual,
      startComment: fellAsleep,
    };

    const response = await fetch("/api/nap", {
      method: "POST",
      body: JSON.stringify(newNap),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const createdNap = { ...newNap };
    console.log("createdNap ", createdNap);
    if (data) {
      createdNap._id = data.insertedId;
    } else {
      createdNap.error = "Не удалось начать сон! Нужно попробовать еще разок.";
    }

    setProcessing(false);
    onClose();
    onNapCreated(createdNap);
  };

  return (
    <>
      <Button mt={4} onClick={onOpen} colorScheme="yellow">
        Добавить дневной сон
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="3px" />
        <ModalContent>
          <ModalHeader fontSize={26}>Ура! Я, кажется, уснула</ModalHeader>
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
            <Text mb="8px">Время начала сна</Text>
            <HStack>
              <NumberInput
                onChange={(str, number) =>
                  setStartTime((prev) => ({ ...prev, hour: number }))
                }
                value={startTime.hour ?? 0}
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
                  setStartTime((prev) => ({ ...prev, minute: number }))
                }
                value={startTime.minute ?? 0}
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
              value={ritual}
              onChange={({ target }) => setRitual(target.value)}
              placeholder="Ритуал"
              size="md"
            />
            <Divider orientation="horizontal" my="16px" />
            <Textarea
              value={fellAsleep}
              onChange={({ target }) => setFellAsleep(target.value)}
              placeholder="Как карапуз засыпал"
              size="md"
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="yellow" onClick={createNap}>
              Начать сон
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StartDaySleep;
