import Head from "next/head";
import { Header } from "src/components/header";
import { Main } from "src/components/main";

export default function Home() {
  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <Header />
      <Main page="index" />
    </>
  );
}
