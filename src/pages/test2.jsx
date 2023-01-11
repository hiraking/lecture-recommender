import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Header } from "src/components/header";
import { SearchModal } from "src/components/modal";
import { useModal } from "src/hooks/useModal";
import { useTest } from "src/hooks/useTest";
import axios from "axios";
import { URL } from "src/utils/consts";
import { useSearch } from "src/hooks/useSearch";

const Test = () => {
  const search = useSearch();
  return (
    <>
      <Head>
        <title>Test2 page</title>
      </Head>
      <div style={{ height: "950px", textAlign: "center" }}>
        <h1>test2</h1>
        <input
          type="text"
          value={search.query}
          onChange={(e) => search.setQuery(e.target.value)}
        />
        <button onClick={() => search.fetcher(search.page)}>クリック</button>
        <br />
      </div>
    </>
  );
};

export default Test;
