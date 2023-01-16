import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useCallback } from "react";
import { LectureOptions } from "src/components/lectureOptions";
import { SearchModal } from "src/components/modal";
import { useModal } from "src/hooks/useModal";
import { useTastes } from "src/hooks/useTastes";
import { FacultyOptions, SemesterOptions } from "src/components/otherOptions";

const Test = () => {
  const modal = useModal();
  const tastes = useTastes();
  const fetcher = tastes.fetcher;
  const executeRecommend = useCallback(() => fetcher(1), [fetcher]);

  const validateOption = useCallback(() => {
    if (!tastes.semesters.size) return false;
    // fetcherやhitsをsearchと共有したい
  });

  return (
    <>
      <Head>
        <title>Test page</title>
      </Head>
      <div
        style={{
          height: "1050px",
          textAlign: "center",
          width: "60%",
          margin: "100px auto",
        }}
      >
        <SearchModal modal={modal} tastes={tastes} />
        <LectureOptions tastes={tastes} openModal={modal.openModal} />

        <Box sx={{ height: "100px", backgroundColor: "lightgreen" }}>
          <Button onClick={executeRecommend} variant="contained" size="large">
            おすすめ検索
          </Button>
        </Box>
        <Card>
          <CardContent className={modal.modalIsOpen ? "disabled_input" : ""}>
            <Typography variant="subtitle1">オプション</Typography>
            <FacultyOptions tastes={tastes} />
            <SemesterOptions tastes={tastes} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Test;
