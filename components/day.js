import React from "react";

import { Box, Text, Flex, Heading, Divider } from "@chakra-ui/react";
import StartDaySleep from "./startDaySleepModal";
import FinishDaySleep from "./finishDaySleepModal";
import {
  MdOutlineDoubleArrow,
  MdAssignmentTurnedIn,
  MdToggleOff,
  MdToggleOn,
} from "react-icons/md";

import { format } from "date-fns";

const Day = ({ day, naps, onNapCreated, onNapFinished }) => {
  return (
    <Flex flexDirection={"column"} w="100%" p="16px" overflow={"auto"}>
      {day ? (
        <>
          <Heading>{format(Number(day.date), "PPPP")}</Heading>
          <Text fontSize="xl">
            Сегодня мы проснулись в {format(Number(day.wakeUpTime), "p")}
          </Text>
          <Divider orientation="horizontal" my="16px" />
          {naps.length === 0 ? (
            <Text fontSize="xl">Днем я еще не спала</Text>
          ) : (
            <Flex flexDirection={"column"}>
              <Text fontSize="xl">Мои дневные сны</Text>
              {naps.map((nap) => (
                <Flex key={nap._id} flexDirection="column">
                  <Flex alignItems={"center"}>
                    <Text fontSize="30px" mr="15px">
                      {format(Number(nap.start), "p")}
                    </Text>
                    {nap.end ? (
                      <>
                        <MdOutlineDoubleArrow fontSize={30} />
                        <Text fontSize="30px" ml="15px">
                          {format(Number(nap.end), "p")}
                        </Text>
                      </>
                    ) : (
                      <FinishDaySleep nap={nap} onNapFinished={onNapFinished} />
                    )}
                  </Flex>
                  <Flex alignItems={"center"}>
                    <MdAssignmentTurnedIn />
                    <Text ml="8px">{nap.ritual || "Не указан"}</Text>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <MdToggleOff />
                    <Text ml="8px">{nap.startComment || "Не указан"}</Text>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <MdToggleOn />
                    <Text ml="8px">{nap.endComment || "Не указан"}</Text>
                  </Flex>
                  <Divider orientation="horizontal" mb="12px" />
                </Flex>
              ))}
            </Flex>
          )}
          <StartDaySleep dayId={day._id} onNapCreated={onNapCreated} />
        </>
      ) : (
        <Box m="auto" color="#87035d" fontSize="36px" textTransform="uppercase">
          Выберите день
        </Box>
      )}
    </Flex>
  );
};

export default Day;
