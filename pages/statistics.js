import Head from "next/head";

// Components
import Charts from "../components/charts";
import Layout from "../components/layout";

// Helpers
import { useAppState, useDispatchAppState } from "../components/appStore";

// Styling
import styles from "../styles/Home.module.css";

export default function Statistics() {
  const appState = useAppState();
  const dispatch = useDispatchAppState();

  console.log("appState ", appState);

  return (
    <div className={styles.container}>
      <Head>
        <title>Статистика</title>
        <meta name="description" content="Фиксируем сны" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <Charts appState={appState} />
        </main>
      </Layout>
    </div>
  );
}
