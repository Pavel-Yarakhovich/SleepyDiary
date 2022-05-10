import { useState } from "react";

// Components
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import { SleepPerWeekDayRadar } from "./charts/sleepPerWeekDay";

const mapKeyToChart = {
  sleepPerWeekDay: (props) => <SleepPerWeekDayRadar {...props} />,
};

const charts = [
  { label: "Длительность снов по дням недели", value: "sleepPerWeekDay" },
];

const Charts = ({ appState }) => {
  const [chosenChart, setChosenChart] = useState();
  const { naps } = appState;

  return (
    <Flex h="100%" w="100%" flexDirection="row">
      <VStack
        flex="30% 0 0"
        p="16px"
        mt={1}
        backgroundImage="linear-gradient(#fbebff 0%, rgba(116,9,121,0) 50%, rgba(255,255,255,1) 100%);"
      >
        <Heading fontSize={24}>All Charts</Heading>
        <Flex
          w="100%"
          flexDirection="column"
          backdropFilter="blur(3px)"
          overflow="auto"
          p="15px 0"
        >
          {charts.map((chart) => (
            <Flex
              key={chart.label}
              onClick={() =>
                setChosenChart(mapKeyToChart[chart.value]({ naps }))
              }
              justifyContent="center"
              alignItems="center"
              color="black"
              p={3}
              fontSize={20}
              fontWeight="400"
              m="4px"
              bg="white"
              borderRadius="4px"
              cursor="pointer"
            >
              {chart.label}
            </Flex>
          ))}
        </Flex>
      </VStack>
      <Flex
        flex="70% 0 0"
        bg="rgba(255,255,255,0.9)"
        m="4px 0 0 4px"
        boxSizing="border-box"
      >
        <Box m="auto" width={400} height={400}>
          {chosenChart && chosenChart}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Charts;
