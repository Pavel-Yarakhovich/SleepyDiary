import { useRef, useState, useEffect } from "react";

import {
  Drawer,
  Flex,
  DrawerOverlay,
  Button,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  NumberInput,
  HStack,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const CreateDayDrawer = ({ onDayCreated, isOpen, onOpen, onClose }) => {
  const [wakeUpTime, setWakeUpTime] = useState({});

  const btnRef = useRef();

  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      const hour = today.getHours();
      const minute = today.getMinutes();

      setWakeUpTime({
        hour,
        minute,
      });
    }
  }, [isOpen]);

  const createNewDay = async () => {
    const today = new Date();
    today.setHours(wakeUpTime.hour, wakeUpTime.minute);
    const todayTimestamp = today.getTime();

    const response = await fetch("/api/sleep-day", {
      method: "POST",
      body: JSON.stringify({
        date: todayTimestamp,
        wakeUpTime: todayTimestamp,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const newDay = {
      date: todayTimestamp,
      wakeUpTime: todayTimestamp,
    };

    if (data) {
      newDay._id = data.insertedId;
    } else {
      newDay.error =
        "Не удалось создать новый день! Нужно попробовать еще разок.";
    }

    onDayCreated(newDay);
  };

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="yellow"
        onClick={onOpen}
        height="60px"
        borderRadius="12px"
        fontSize={24}
        fontWeight="400"
        m={4}
      >
        Новый день
      </Button>
      <Drawer
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bgImg={"/images/Sofa.jpg"}
          bgPosition="center"
          bgSize="cover"
          backdropBrightness={0.3}
        >
          <Flex flexDirection="column" bg="rgba(255,255,255,0.75)" h="100%">
            <DrawerCloseButton />
            <DrawerHeader fontSize="26px">
              А кто это проснулся? Кто миру улыбнулся?
            </DrawerHeader>

            <DrawerBody>
              <Text mb="8px" fontSize="2xl">
                Время пробуждения карапуза
              </Text>
              <HStack>
                <NumberInput
                  onChange={(str, number) =>
                    setWakeUpTime((prev) => ({ ...prev, hour: number }))
                  }
                  value={wakeUpTime.hour ?? 0}
                  borderColor="black"
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
                    setWakeUpTime((prev) => ({ ...prev, minute: number }))
                  }
                  value={wakeUpTime.minute ?? 0}
                  borderColor="black"
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
            </DrawerBody>

            <DrawerFooter justifyContent="space-between">
              <Button variant="outline" mr={3} onClick={onClose}>
                Отмена
              </Button>
              <Button colorScheme="yellow" onClick={createNewDay}>
                Сохранить
              </Button>
            </DrawerFooter>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateDayDrawer;
