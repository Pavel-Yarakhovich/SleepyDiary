import { useState } from "react";

// Components
import { Flex, Image } from "@chakra-ui/react";
import Day from "./day";
import DaysList from "./daysList";

const DiaryContent = ({ dispatch, state }) => {
  const { days, naps } = state;
  const [chosenDay, setChosenDay] = useState(null);
  console.log("DAYS ", days);
  return (
    <>
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
        <DaysList
          days={days}
          chosenDay={chosenDay}
          setChosenDay={setChosenDay}
          dispatch={dispatch}
        />

        <Day
          day={chosenDay}
          naps={naps?.filter((nap) => nap.parentDayId === chosenDay?._id)}
          onNapCreated={(nap) => {
            dispatch({
              type: "updateStore",
              payload: {
                naps: [...naps, nap],
              },
            });
          }}
          onNapFinished={(nap) => {
            dispatch({
              type: "updateStore",
              payload: {
                naps: naps.map((n) => (n._id === nap._id ? nap : n)),
              },
            });
          }}
        />
      </Flex>
    </>
  );
};

export default DiaryContent;
