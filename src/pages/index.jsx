import Head from "next/head";
import { Header } from "src/components/header";
import { Main } from "src/components/main";
import { useBGLightBlue } from "src/hooks/useBGLightBlue";
import { useCounter } from "src/hooks/useCounter";
import { useInputArray } from "src/hooks/useInputArray";

export default function Home() {
  const { count, isShow, handleClick, handleDisplay } = useCounter();
  const { text, array, handleChange, handleAdd } = useInputArray();
  useBGLightBlue();

  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <Header />

      <div style={{ textAlign: "center" }}>
        {isShow ? <h1 style={{ color: "darkgreen" }}>{count}</h1> : null}
        <button onClick={handleClick}>button</button>
        <button onClick={handleDisplay}>{isShow ? "hide" : "show"}</button>
      </div>

      <div style={{ textAlign: "center" }}>
        <input type="text" value={text} onChange={handleChange} />
        <button onClick={handleAdd}>add</button>
        <ul>
          {array.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
      <Main page="index" />
    </>
  );
}
