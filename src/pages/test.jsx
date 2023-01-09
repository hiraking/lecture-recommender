import Head from "next/head";
import { useCallback, useState } from "react";
import { Header } from "src/components/header";
import { SearchModal } from "src/components/modal";

const Test = () => {
  const [favorites, setFavorites] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

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

  const openModal = useCallback(() => {
    setIsOpen(true);
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
        <button onClick={openModal}>講義検索</button>
        <SearchModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default Test;
