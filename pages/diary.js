// Components
import Head from "next/head";
import DiaryContent from "../components/diaryContent";
import Layout from "../components/layout";

// Helpers
import { useAppState, useDispatchAppState } from "../components/appStore";

// Styling
import styles from "../styles/Home.module.css";

export default function Diary() {
  const appState = useAppState();
  const dispatch = useDispatchAppState();

  return (
    <div className={styles.container}>
      <Head>
        <title>Дневник</title>
        <meta name="description" content="Фиксируем сны" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <DiaryContent dispatch={dispatch} state={appState} />
        </main>
      </Layout>
    </div>
  );
}
