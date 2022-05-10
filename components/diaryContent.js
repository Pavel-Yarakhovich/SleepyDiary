import { useState } from "react";

// Components
import { Flex, Image } from "@chakra-ui/react";
import { Day } from "Components/Day";
import DaysList from "./daysList";

const DiaryContent = ({ dispatch, state }) => {
  const { days, naps } = state;
  const [chosenDay, setChosenDay] = useState(null);

  return (
    <>
      <Flex
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="100%"
        flexDirection="row"
        bg="rgba(255,255,255,0.7)"
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
