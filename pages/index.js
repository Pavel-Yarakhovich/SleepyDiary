import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { Flex, Image } from "@chakra-ui/react";

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

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sleep Diary</title>
        <meta
          name="description"
          content="Следим за сном, чтобы расти здоровыми"
        />
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
        />
        <Flex
          position="absolute"
          bottom={-10}
          justifyContent="center"
          flexDirection="row"
          w="100%"
        >
          {routes.map((x) => (
            <Link key={x.route} href={`/${x.route}`}>
              <a>
                <Flex
                  w="100px"
                  h="100px"
                  m="20px"
                  borderRadius={"50%"}
                  bg="rgba(227, 36, 141, 0.7)"
                  justifyContent={"center"}
                  alignItems={"center"}
                  color="white"
                  fontSize={26}
                >
                  {x.label}
                </Flex>
              </a>
            </Link>
          ))}
        </Flex>
      </main>
    </div>
  );
}
