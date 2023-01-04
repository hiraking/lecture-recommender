import Head from "next/head";
import { Header } from "src/components/header";
import { Main } from "src/components/main";

export default function About({
  doubleCount,
  isShow,
  handleClick,
  handleDisplay,
  text,
  array,
  handleChange,
  handleAdd,
}) {
  return (
    <>
      <Head>
        <title>About Page</title>
      </Head>
      <Header />

      <div style={{ textAlign: "center" }}>
        {isShow ? <h1 style={{ color: "darkgreen" }}>{doubleCount}</h1> : null}
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
      <Main page="about" />
    </>
  );
}
