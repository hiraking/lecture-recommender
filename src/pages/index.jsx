import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Header } from "src/components/header";
import { Main } from "src/components/main";

export default function Home() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    document.body.style.backgroundColor = "lightblue";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleClick = useCallback(() => {
    console.log(count);
    if (count < 10) {
      setCount((count) => count + 1);
    }
  }, [count]);

  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "darkgreen" }}>{count}</h1>
        <button onClick={handleClick}>button</button>
      </div>
      <Main page="index" />
    </>
  );
}
