import Link from "next/link";

import { Flex } from "@chakra-ui/react";
import { HiChartBar, HiPencilAlt } from "react-icons/hi";

export { Navigation };

const routes = [
  {
    route: "diary",
    label: "Diary",
    icon: <HiPencilAlt />,
  },
  {
    route: "statistics",
    label: "Charts",
    icon: <HiChartBar />,
  },
];

function Navigation() {
  return (
    <Flex
      justifyContent="center"
      flexDirection="row"
      alignItems="stretch"
      h="100%"
      ml="auto"
    >
      {routes.map((x) => (
        <Link key={x.route} href={`/${x.route}`}>
          <a
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 22,
            }}
          >
            {x.icon}
            <Flex
              minW="90px"
              h="100%"
              m="0 10px 0 6px"
              justifyContent={"flex-start"}
              alignItems={"center"}
              color="black"
            >
              {x.label}
            </Flex>
          </a>
        </Link>
      ))}
    </Flex>
  );
}
