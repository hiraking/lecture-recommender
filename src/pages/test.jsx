import { Button, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useCallback } from "react";
import { LectureOptions } from "src/components/lectureOptions";
import { Header } from "src/components/header";
import { SearchModal } from "src/components/modal";
import { useModal } from "src/hooks/useModal";
import { useTastes } from "src/hooks/useTastes";
import { FacultyOptions } from "src/components/otherOptions";
import { FACULTIES } from "src/utils/consts";

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
      <div
        style={{
          height: "950px",
          textAlign: "center",
          width: "60%",
          margin: "0 auto",
        }}
      >
        <SearchModal modal={modal} tastes={tastes} />
        <LectureOptions tastes={tastes} openModal={modal.openModal} />

        <Box sx={{ height: "100px", backgroundColor: "lightgreen" }}>
          <Button onClick={executeRecommend} variant="contained">
            おすすめ検索
          </Button>
        </Box>
        <Card>
          <CardContent>
            <FacultyOptions tastes={tastes} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Test;
