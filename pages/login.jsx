// Components
import Head from "next/head";
import { Login } from "components/Login";
import { Flex, Grid, GridItem, Heading, Image } from "@chakra-ui/react";

// Helpers
import { useAppState, useDispatchAppState } from "../components/appStore";

// Styling
import styles from "../styles/Home.module.css";

export default LoginPage;

function LoginPage() {
  const appState = useAppState();
  const dispatch = useDispatchAppState();

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to Sleepy Diary" />
      </Head>
      <Grid
        h="100%"
        w="100%"
        templateRows="repeat(3, 1fr)"
        templateColumns="60% 1fr"
        gap={4}
        p={4}
        bg="linear-gradient(to top, white 70%, #e5fdff)"
      >
        <GridItem>
          <Flex flexDirection={'column'} justifyContent="center">
          <Heading as="h1" size="2xl" textAlign={"center"}>
            Sleepy Diary
          </Heading>
          <Heading as="h3" size="lg" textAlign={"center"}>
            Track baby&apos;s sleeps to grow healthier
          </Heading>
          </Flex>
        </GridItem>
        <GridItem rowSpan={3}>
          <Flex h="100%" direction={"column"} justifyContent={"center"}>
            <Login />
          </Flex>
        </GridItem>

        <GridItem rowSpan={2} p={4} className={styles.ads}>
          {/* ADS */}
        </GridItem>
      </Grid>
    </div>
  );
}
