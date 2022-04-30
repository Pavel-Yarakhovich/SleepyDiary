import Link from "next/link";

import { Flex } from "@chakra-ui/react";

const routes = [
  {
    route: "diary",
    label: "Дневник",
  },
  {
    route: "statistics",
    label: "Графики",
  },
];

const Navigation = () => (
  <Flex
    justifyContent="center"
    flexDirection="row"
    alignItems="stretch"
    h="100%"
    ml="auto"
  >
    {routes.map((x) => (
      <Link key={x.route} href={`/${x.route}`}>
        <a>
          <Flex
            w="120px"
            h="100%"
            m="0 10px"
            bg="rgba(255,195,241,1)"
            justifyContent={"center"}
            alignItems={"center"}
            color="black"
            fontSize={26}
          >
            {x.label}
          </Flex>
        </a>
      </Link>
    ))}
  </Flex>
);

export default Navigation;
