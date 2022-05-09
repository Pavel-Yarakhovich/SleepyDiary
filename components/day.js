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

const mapCommentToIcon = {
  ritual: <MdAssignmentTurnedIn />,
  startComment: <MdToggleOff />,
  endComment: <MdToggleOn />,
};

const Day = ({ day, naps, onNapCreated, onNapFinished }) => {
  return (
    <Flex flexDirection={"column"} w="100%" p="16px" overflow={"auto"}>
      {day ? (
        <>
          <Heading>{format(Number(day.date), "PPPP")}</Heading>
          <Text fontSize="xl">
            We woke up at {format(Number(day.wakeUpTime), "p")} today
          </Text>
          <Divider orientation="horizontal" my="16px" />
          {naps.length === 0 ? (
            <Text fontSize="xl">I haven&apos;t slept yet, mommy</Text>
          ) : (
            <Flex flexDirection={"column"}>
              <Text fontSize="xl">My naps</Text>
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
                  {["ritual", "startComment", "endComment"].map((x) => (
                    <Flex key={x} alignItems={"center"}>
                      {mapCommentToIcon[x]}
                      <Text ml="8px">{nap[x] || "No data"}</Text>
                    </Flex>
                  ))}
                  <Divider orientation="horizontal" mb="12px" />
                </Flex>
              ))}
            </Flex>
          )}
          <StartDaySleep dayId={day._id} onNapCreated={onNapCreated} />
        </>
      ) : (
        <Box m="auto" color="#87035d" fontSize="36px" textTransform="uppercase">
          Select a Day
        </Box>
      )}
    </Flex>
  );
};

export default Day;
