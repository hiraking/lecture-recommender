import Head from "next/head";
import { Header } from "src/components/header";
import { Main } from "src/components/main";

const Home = (props) => {
  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <Header />

      <div style={{ textAlign: "center" }}>
        {props.isShow ? (
          <h1 style={{ color: "darkgreen" }}>{props.count}</h1>
        ) : null}
        <button onClick={props.handleClick}>button</button>
        <button onClick={props.handleDisplay}>
          {props.isShow ? "hide" : "show"}
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        <input type="text" value={props.text} onChange={props.handleChange} />
        <button onClick={props.handleAdd}>add</button>
        <ul>
          {props.array.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
      <Main page="index" />
    </>
  );
};

export default Home;
