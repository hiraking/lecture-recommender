import Head from "next/head";
import { useCallback, useState } from "react";
import { Header } from "src/components/header";
import { SearchModal } from "src/components/modal";
import { useModal } from "src/hooks/useModal";

const Test = () => {
  const [favorites, setFavorites] = useState([]);
  const modal = useModal();

  const handleFavorites = useCallback(() => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(text)) {
        alert("the same string already exists!");
        return prevFavorites;
      }
      if (!text) {
        alert("invalid");
        return prevFavorites;
      }
      console.log([...prevFavorites, text]);
      setText("");
      return [...prevFavorites, text];
    });
  }, []);

  return (
    <>
      <Head>
        <title>Test page</title>
      </Head>
      <Header />
      <div style={{ height: "950px", textAlign: "center" }}>
        <h1>test</h1>
        <br />
        <button onClick={modal.openModal}>講義検索</button>
        <SearchModal modal={modal} />
      </div>
    </>
  );
};

export default Test;
