import { Divider, Grid } from "@mui/material";
import { isArray, isEqual } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";
import { SearchModal } from "src/components/modal";
import { RecommendResult } from "src/components/recommendResult";
import { SideMenu } from "src/components/sideMenu";

export const ThumbContextTemp = createContext();

const Result = (props) => {
  const { query, isReady } = useRouter();
  const [page, setPage] = useState(1);
  const [isWaiting, setIsWaiting] = useState(false);
  const {
    isLoading,
    lectures,
    hits,
    fetchWithQuery,
    fetchWithID,
    noHit,
    favorites,
    unfavorites,
    faculties,
    semesters,
  } = props.tastes;

  const {
    favTemp,
    unfavTemp,
    favLecTemp,
    unfavLecTemp,
    toggleFavTemp,
    toggleUnfavTemp,
    removeFavTemp,
    removeUnfavTemp,
    facultiesTemp,
    setFacultiesTemp,
    semestersTemp,
    setSemestersTemp,
  } = props.tastes.tmpHooks;

  const tastesForThumbTemp = {
    favTemp,
    unfavTemp,
    toggleFavTemp,
    toggleUnfavTemp,
  };

  const [openModal, setOpenModal] = useState(false);
  const [queryCache, setQueryCache] = useState(null);

  const preprocess = useCallback((x) => {
    if (!x) return [];
    if (isArray(x)) return x.map((i) => Number(i));
    return [Number(x)];
  }, []);

  useEffect(() => {
    if (!isReady) {
      setIsWaiting(true);
      return;
    }
    if (!isEqual(query, queryCache)) {
      setQueryCache(query);
      setPage(Number(query.p));
      fetchWithQuery(
        preprocess(query.l),
        preprocess(query.dl),
        preprocess(query.f),
        preprocess(query.s),
        query.p,
        query.at
      );
    }
    setIsWaiting(false);
  }, [
    isReady,
    preprocess,
    query,
    queryCache,
    setQueryCache,
    setFacultiesTemp,
    setSemestersTemp,
    fetchWithQuery,
  ]);

  return (
    <>
      <Head>
        <title>Result</title>
      </Head>
      <ThumbContextTemp.Provider value={tastesForThumbTemp}>
        <SearchModal openModal={openModal} setOpenModal={setOpenModal} temp />
      </ThumbContextTemp.Provider>
      <div className="result-body">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <div className="result-main">
              <h1 className="result-header">おすすめ検索結果</h1>
              <Divider className="divider-10" />
              <RecommendResult
                isLoading={isLoading}
                isWaiting={isWaiting}
                lectures={lectures}
                page={page}
                hits={hits}
                noHit={noHit}
                favorites={favorites}
                unfavorites={unfavorites}
                faculties={faculties}
                semesters={semesters}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <SideMenu
              setOpenModal={setOpenModal}
              fetchWithID={fetchWithID}
              favTemp={favTemp}
              unfavTemp={unfavTemp}
              favLecTemp={favLecTemp}
              unfavLecTemp={unfavLecTemp}
              removeFavTemp={removeFavTemp}
              removeUnfavTemp={removeUnfavTemp}
              facultiesTemp={facultiesTemp}
              setFacultiesTemp={setFacultiesTemp}
              semestersTemp={semestersTemp}
              setSemestersTemp={setSemestersTemp}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Result;
