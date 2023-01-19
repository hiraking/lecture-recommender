import { Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RecommendResult } from "src/components/recommendResult";
import { SideMenu } from "src/components/sideMenu";

const Result = (props) => {
  const router = useRouter();
  const p = Number(router.query.p);
  const { isLoading, lectures, hits, fetcher, noHit } = props.tastes;

  useEffect(() => {
    fetcher(p);
  }, [fetcher, p, hits]);

  return (
    <>
      <Head>
        <title>Result</title>
      </Head>
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
            page={p}
            hits={hits}
            noHit={noHit}
          />
        </Grid>
        <Grid item xs={3} sx={{ backgroundColor: "#3f0000" }}>
          <SideMenu />
        </Grid>
      </Grid>
    </>
  );
};

export default Result;