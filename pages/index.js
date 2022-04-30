import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Image, Flex, Spinner, Text } from "@chakra-ui/react";
import Layout from "../components/layout";

// Helpers
import { useAppState, useDispatchAppState } from "../components/appStore";

export default function Home() {
  const dispatch = useDispatchAppState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const getDays = fetch("/api/sleep-day", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const getNaps = fetch("/api/nap", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(true);
      Promise.all([getDays, getNaps]).then(async ([days, naps]) => {
        const daysData = await days.json();
        const napsData = await naps.json();
        dispatch({
          type: "updateStore",
          payload: {
            days: daysData,
            naps: napsData,
          },
        });
        setLoading(false);
      });
    };

    getData();
  }, [dispatch]);

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
      <Layout>
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
            flexFlow="column"
            top="0px"
            left="0px"
            right="0px"
            h="100%"
            bg="rgba(255,255,255,0.4)"
            alignItems="center"
            justifyContent="center"
          >
            {loading && (
              <>
                <Text>Загружаем данные</Text>
                <Spinner size="xl" />
              </>
            )}
          </Flex>
        </main>
      </Layout>
    </div>
  );
}
