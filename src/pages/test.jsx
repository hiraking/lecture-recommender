import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useCallback, useState } from "react";
import { LectureOptions } from "src/components/lectureOptions";
import { SearchModal } from "src/components/modal";
import { useModal } from "src/hooks/useModal";
import { useTastes } from "src/hooks/useTastes";
import { FacultyOptions, SemesterOptions } from "src/components/otherOptions";

const Test = () => {
  const modal = useModal();
  const tastes = useTastes();
  const { fetcher, semesters, faculties, favorites, unfavorites } = tastes;
  const [nosemester, setNosemester] = useState(false);
  const [nofaculty, setNofaculty] = useState(false);
  const [nolecture, setNolecture] = useState(false);

  const validateOption = useCallback(() => {
    if (!semesters.length) {
      setNosemester(true);
      setTimeout(() => setNosemester(false), 3000);
      return false;
    }
    if (!faculties.length) {
      setNofaculty(true);
      setTimeout(() => setNofaculty(false), 3000);
      return false;
    }
    if (!favorites.length && !unfavorites.length) {
      setNolecture(true);
      setTimeout(() => setNolecture(false), 3000);
      return false;
    }
    return true;
  }, [faculties, semesters, favorites, unfavorites]);

  const executeRecommend = useCallback(() => {
    if (validateOption()) {
      fetcher(1);
    } else {
      console.log("validation failed!");
    }
  }, [fetcher, validateOption]);

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
        <SearchModal modal={modal} />
        <LectureOptions tastes={tastes} openModal={modal.openModal} />

        <Box sx={{ height: "auto", backgroundColor: "lightgreen" }}>
          <Button onClick={executeRecommend} variant="contained" size="large">
            おすすめを探す
          </Button>
          {nolecture ? (
            <Alert severity="warning" variant="outlined">
              講義を登録してください
            </Alert>
          ) : null}
          {nofaculty ? (
            <Alert severity="warning" variant="outlined">
              学部を選択してください
            </Alert>
          ) : null}
          {nosemester ? (
            <Alert severity="warning" variant="outlined">
              開講区分を登録してください
            </Alert>
          ) : null}
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
