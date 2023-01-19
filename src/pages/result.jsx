import { Grid } from "@mui/material";
import Head from "next/head";
import { RecommendResult } from "src/components/recommendResult";
import { SideMenu } from "src/components/sideMenu";

const Result = (props) => {
  const { isLoading, lectures, page, hits, fetcher, noHit } = props.tastes;
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
        <Grid item xs={8} sx={{ backgroundColor: "darkcyan" }}>
          <RecommendResult
            isLoading={isLoading}
            lectures={lectures}
            page={page}
            hits={hits}
            fetcher={fetcher}
            noHit={noHit}
          />
        </Grid>
        <Grid item xs={4} sx={{ backgroundColor: "#3f0000" }}>
          <SideMenu />
        </Grid>
      </Grid>
    </>
  );
};

export default Result;
