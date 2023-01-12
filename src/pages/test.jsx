import Head from "next/head";
import { useCallback, useState } from "react";
import { Header } from "src/components/header";
import { SearchModal } from "src/components/modal";
import { useModal } from "src/hooks/useModal";
import { useTastes } from "src/hooks/useTastes";

const Test = () => {
  const modal = useModal();
  const tastes = useTastes();
  const fetcher = tastes.fetcher;
  const executeRecommend = useCallback(() => fetcher(1), [fetcher]);

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
        <SearchModal modal={modal} tastes={tastes} />
        <br />
        <br />
        <button onClick={executeRecommend}>おすすめ検索</button>
      </div>
    </>
  );
};

export default Test;
