import { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";

// Helpers
import format from "date-fns/format";

export { SleepPerWeekDayRadar };

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const convertMsToHrs = (ms) => +(ms / 1000 / 60 / 60).toFixed(2);

function SleepPerWeekDayRadar({ naps }) {
  const [datasets, setDatasets] = useState([]);
  const [calculated, setCalculated] = useState(false);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    if (!naps || calculated || calculating) return;
    setCalculating(true);
    const napsDurations = labels.map((l) => 0);

    naps
      .filter((nap) => nap.start && nap.end)
      .forEach((nap) => {
        const dayOfWeek = format(Number(nap.start), "eeee");
        const dayIndex = labels.findIndex((l) => l === dayOfWeek);
        const napDuration = convertMsToHrs(nap.end - nap.start);
        napsDurations[dayIndex]
          ? (napsDurations[dayIndex] = napsDurations[dayIndex] + napDuration)
          : (napsDurations[dayIndex] = napDuration);
      });
    setDatasets((prev) => [
      ...prev,
      {
        label: "Дневной сон, часы",
        data: napsDurations,
        backgroundColor: "rgba(255,195,241,0.7)",
        borderColor: "rgba(255,195,241,1)",
        borderWidth: 2,
      },
    ]);
    setCalculated(true);
    setCalculating(false);
  }, [naps, calculated, calculating]);

  return (
    <Radar
      data={{
        labels,
        datasets,
      }}
    />
  );
}
