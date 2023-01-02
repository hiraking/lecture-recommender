import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Header } from "src/components/header";
import { Main } from "src/components/main";

export default function Home() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [array, setArray] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "lightblue";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleClick = useCallback(() => {
    // console.log(count);
    if (count < 10) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]);

  // console.log(isShow);
  const handleChange = useCallback((e) => {
    if (e.target.value.length > 5) {
      alert("too many characters!");
    }
    setText(e.target.value.trim());
  }, []);

  const handleDisplay = useCallback(() => {
    setIsShow((prevIsShow) => !prevIsShow);
  }, []);

  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      if (prevArray.some((item) => item === text)) {
        alert("the same string already exists!");
        return prevArray;
      }
      if (!text) {
        alert("invalid");
        return prevArray;
      }
      return [...prevArray, text];
    });
  }, [text]);

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
