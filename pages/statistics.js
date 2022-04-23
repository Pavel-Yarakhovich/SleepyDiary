import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Statistics() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Статистика</title>
        <meta name="description" content="Фиксируем сны" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>Вся статистика будет здесь</main>
    </div>
  );
}
