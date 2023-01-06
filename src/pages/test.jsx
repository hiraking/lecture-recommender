import axios from "axios";
import Head from "next/head";
import { useCallback, useState } from "react";
import { Header } from "src/components/header";

const Test = () => {
  const [data, setData] = useState();
  const url = "http://127.0.0.1:8000";

  const getData = () => {
    axios.get(url + "/test").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  const postData = () => {
    axios
      .post(url + "/test", {
        favorites: array,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [text, setText] = useState("");
  const [array, setArray] = useState([]);

  const handleChange = useCallback((e) => {
    if (e.target.value.length > 5) {
      alert("too many characters!");
    }
    setText(e.target.value.trim());
  }, []);

  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      if (prevArray.includes(text)) {
        alert("the same string already exists!");
        return prevArray;
      }
      if (!text) {
        alert("invalid");
        return prevArray;
      }
      console.log([...prevArray, text]);
      setText("");
      return [...prevArray, text];
    });
  }, [text]);

  return (
    <>
      <Head>
        <title>Test page</title>
      </Head>
      <Header />
      <div style={{ height: "900px", textAlign: "center" }}>
        <h1>test</h1>
        <input type="text" value={text} onChange={handleChange} />
        <buttton onClick={handleAdd}>add</buttton>
        {array.length > 0 ? <buttton onClick={postData}>submit</buttton> : null}
        <br />
        {data ? (
          <ul>
            {data.map((item) => {
              return <li key={item["時間割コード"]}>{item["講義名"]}</li>;
            })}
          </ul>
        ) : (
          <buttton onClick={getData}>get data</buttton>
        )}
      </div>
    </>
  );
};

export default Test;
