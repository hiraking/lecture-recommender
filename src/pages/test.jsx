import Head from "next/head";
import { useCallback, useReducer, useState } from "react";
import { Header } from "src/components/header";

const Test = () => {
  // action {id: {id}, lecture: {lecture}}
  const favoritesReducer = useCallback((state, action) => {
    if (state.includes(action.id)) {
      setFavLectures((prev) => prev.filter((obj) => obj.id !== action.id));
      return state.filter((i) => i !== action.id);
    }
    setFavLectures((prev) => [...prev, action.lecture]);
    return [...state, action.id];
  }, []);

  const [favorites, favoritesDispatch] = useReducer(favoritesReducer, []);
  const [favLectures, setFavLectures] = useState([]);
  return (
    <>
      <Head>
        <title>Experiment page</title>
      </Head>
      <Header />
      <div
        style={{
          height: "950px",
          textAlign: "center",
          width: "60%",
          margin: "0 auto",
        }}
      ></div>
    </>
  );
};

export default Test;
