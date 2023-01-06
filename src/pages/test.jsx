import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { Header } from "src/components/header";

const Test = () => {
  const [data, setData] = useState();
  const url = "http://127.0.0.1:8000";

  const getData = () => {
    axios.get(url).then((res) => {
      setData(res.data);
      console.log(res);
    });
  };

  return (
    <>
      <Head>
        <title>Test page</title>
      </Head>
      <Header />
      <div>
        <h1>test</h1>
      </div>
      <div>
        {data ? (
          <div>
            <h1>{data.fastapi}</h1>
          </div>
        ) : (
          <buttton onClick={getData}>get data</buttton>
        )}
      </div>
    </>
  );
};

export default Test;
