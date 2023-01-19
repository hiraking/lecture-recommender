import { Alert, Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { createContext, useCallback, useState } from "react";
import { LectureOptions } from "src/components/lectureOptions";
import { SearchModal } from "src/components/modal";
import { useTastes } from "src/hooks/useTastes";
import { FacultyOptions, SemesterOptions } from "src/components/otherOptions";

export const ThumbContext = createContext();

const Test = () => {
  const tastes = useTastes();
  const {
    fetcher,
    semesters,
    faculties,
    favorites,
    unfavorites,
    toggleFavorites,
    toggleUnfavorites,
  } = tastes;
  const [nosemester, setNosemester] = useState(false);
  const [nofaculty, setNofaculty] = useState(false);
  const [nolecture, setNolecture] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const tastesForThumb = {
    favorites,
    unfavorites,
    toggleFavorites,
    toggleUnfavorites,
  };

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
        <ThumbContext.Provider value={tastesForThumb}>
          <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
        </ThumbContext.Provider>
        <LectureOptions tastes={tastes} setOpenModal={setOpenModal} />
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
          <CardContent className={openModal ? "disabled_input" : ""}>
            <Typography variant="subtitle1">オプション</Typography>
            <FacultyOptions
              faculties={tastes.faculties}
              setFaculties={tastes.setFaculties}
            />
            <SemesterOptions
              semesters={tastes.semesters}
              setSemesters={tastes.setSemesters}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Test;
