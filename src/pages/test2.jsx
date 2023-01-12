import { Alert, Fade, Tooltip } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { useSearch } from "src/hooks/useSearch";
import { useTastes } from "src/hooks/useTastes";

const Test = () => {
  const search = useSearch();
  const tastes = useTastes();
  return (
    <>
      <Head>
        <title>Test2 page</title>
      </Head>
      <div style={{ height: "950px", textAlign: "center" }}>
        <h1>test2</h1>
        <Tooltip title="add" arrow open={search.noHit}>
          <input
            type="text"
            value={search.query}
            onChange={(e) => search.setQuery(e.target.value)}
          />
        </Tooltip>
        <button onClick={() => search.fetcher(1)}>検索</button>
        <Fade in={search.noHit}>
          <Alert severity="error" style={{ width: "30%", margin: "0 auto" }}>
            条件に合う講義は見つかりませんでした。
          </Alert>
        </Fade>
        <br />
        <div style={{ width: "60%" }}></div>
      </div>
    </>
  );
};

export default Test;
