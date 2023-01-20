import { Button, Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";
import { SearchModal } from "src/components/modal";
import { RecommendResult } from "src/components/recommendResult";
import { SideMenu } from "src/components/sideMenu";

export const ThumbContextTemp = createContext();

const Result = (props) => {
  const router = useRouter();
  const page = Number(router.query.p);
  const {
    isLoading,
    lectures,
    hits,
    fetcher,
    fetcherUpdate,
    pageCache,
    noHit,
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

  useEffect(() => {
    if (page !== pageCache) {
      console.log("useEffect", pageCache, "->", page);
      fetcher(page);
    }
  });

  const goIndex = useCallback(() => {
    router.push({ pathname: "/" });
  }, [router]);

  return (
    <>
      <Head>
        <title>Result</title>
      </Head>
      <Button variant="contained" onClick={goIndex}>
        戻る
      </Button>
      <ThumbContextTemp.Provider value={tastesForThumbTemp}>
        <SearchModal openModal={openModal} setOpenModal={setOpenModal} temp />
      </ThumbContextTemp.Provider>
      <Grid
        container
        spacing={2}
        sx={{
          width: "60%",
          minWidth: "800px",
          margin: "100px auto",
          minHeightt: "1000px",
          backgroundColor: "#113122",
        }}
      >
        <Grid item xs={9} sx={{ backgroundColor: "darkcyan" }}>
          <RecommendResult
            isLoading={isLoading}
            lectures={lectures}
            page={page}
            hits={hits}
            noHit={noHit}
          />
        </Grid>
        <Grid item xs={3} sx={{ backgroundColor: "#3f0000" }}>
          <SideMenu
            setOpenModal={setOpenModal}
            favLecTemp={favLecTemp}
            unfavLecTemp={unfavLecTemp}
            removeFavTemp={removeFavTemp}
            removeUnfavTemp={removeUnfavTemp}
            fetcherUpdate={fetcherUpdate}
            facultiesTemp={facultiesTemp}
            setFacultiesTemp={setFacultiesTemp}
            semestersTemp={semestersTemp}
            setSemestersTemp={setSemestersTemp}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Result;
