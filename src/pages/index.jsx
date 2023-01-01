import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { Header } from "src/components/header";
import { Main } from "src/components/main";

export default function Home() {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    console.log(e.target);
  }, []);

  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <Header />
      <Link href="/about" onClick={handleClick}>
        button
      </Link>
      <Main page="index" />
    </>
  );
}
