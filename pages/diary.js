import { useState, useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { Flex, Image, useDisclosure } from "@chakra-ui/react";

import CreateDayDrawer from "../components/createDayDrawer";
import Day from "../components/day";

import { format } from "date-fns";

export default function Diary() {
  const [allDays, setAllDays] = useState([]);
  const [chosenDay, setChosenDay] = useState(null);

  const [allNaps, setAllNaps] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log("chosenDay", chosenDay);
  }, [chosenDay]);

  useEffect(() => {
    const getAllDays = async () => {
      const response = await fetch("/api/sleep-day", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setAllDays(data);
    };

    getAllDays();
  }, []);

  useEffect(() => {
    const getAllNaps = async () => {
      const response = await fetch("/api/nap", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setAllNaps(data);
    };

    getAllNaps();
  }, []);

  const onDayCreated = (data) => {
    if (data._id) {
      setAllDays((prev) => [...prev, data]);
      onClose();
    }
    // show toast
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Дневник</title>
        <meta name="description" content="Фиксируем сны" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image
          src={`/images/Sofa_Julia.jpg`}
          alt=""
          h="100%"
          w="100%"
          objectFit="cover"
          objectPosition="center"
          opacity={0.25}
        />
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="100%"
          flexDirection="row"
        >
          <CreateDayDrawer
            onDayCreated={onDayCreated}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
          <Flex
            flex="30% 0 0"
            flexDirection="column"
            backdropFilter="blur(3px)"
            overflow="auto"
            p="15px 15px 15px 0"
          >
            {allDays.map((day) => (
              <Flex
                key={day._id}
                onClick={() => setChosenDay(day)}
                justifyContent="center"
                alignItems="center"
                color="white"
                p={3}
                fontSize={22}
                fontWeight="400"
                m="4px"
                borderRadius={"0 30px 30px 0"}
                bg={
                  chosenDay?._id === day._id
                    ? "linear-gradient(to left, #355c7d, #6c5b7b, #c06c84)"
                    : "linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)"
                }
              >
                {format(Number(day.date), "PPPP")}
              </Flex>
            ))}
          </Flex>

          <Day
            day={chosenDay}
            naps={allNaps.filter((nap) => nap.parentDayId === chosenDay?._id)}
          />
        </Flex>
      </main>
    </div>
  );
}
