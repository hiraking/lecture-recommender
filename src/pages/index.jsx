import Head from "next/head";
import { useState } from "react";
import { Header } from "src/components/header";
import { Main } from "src/components/main";

export default function Home() {
  const [count, setCount] = useState(1);

  const handleClick = (e) => {
    setCount((foo) => foo + 1);
    setCount((foo) => foo + 1);
  };

  console.log(count);
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
