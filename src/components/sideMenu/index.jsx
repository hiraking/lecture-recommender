import { Button, Card, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FacultyForm, SemesterForm } from "src/components/otherOptions";

export const SideMenu = (props) => {
  const {
    setOpenModal,
    favLecTemp,
    unfavLecTemp,
    removeFavTemp,
    removeUnfavTemp,
    fetcherUpdate,
    facultiesTemp,
    setFacultiesTemp,
    semestersTemp,
    setSemestersTemp,
  } = props;

  const router = useRouter();

  const handleAddLecture = useCallback(
    () => setOpenModal(true),
    [setOpenModal]
  );

  const handleClick = useCallback(() => {
    router.push({ pathname: "/result", query: { p: 1 } });
    fetcherUpdate(1);
  }, [fetcherUpdate, router]);

  return (
    <div>
      <Button variant="outlined" onClick={handleAddLecture}>
        追加
      </Button>
      <Box>
        <Typography variant="subtitle1">高評価した講義</Typography>
        {favLecTemp.length > 0
          ? favLecTemp.map((lecture) => {
              return (
                <Chip
                  key={lecture.id}
                  label={lecture.title}
                  onDelete={() => removeFavTemp(lecture.id)}
                />
              );
            })
          : null}
        <Typography variant="subtitle1">低評価した講義</Typography>
        {unfavLecTemp.length > 0
          ? unfavLecTemp.map((lecture) => {
              return (
                <Chip
                  key={lecture.id}
                  label={lecture.title}
                  onDelete={() => removeUnfavTemp(lecture.id)}
                />
              );
            })
          : null}
      </Box>
      <Box>
        <Typography variant="subtitle1">学部</Typography>
        <FacultyForm
          faculties={facultiesTemp}
          setFaculties={setFacultiesTemp}
          width="100%"
        />
      </Box>
      <Box>
        <Typography variant="subtitle1">開講区分</Typography>
        <SemesterForm
          semesters={semestersTemp}
          setSemesters={setSemestersTemp}
          width="100%"
        />
      </Box>
      <Button variant="contained" onClick={handleClick}>
        この条件で検索
      </Button>
      {/* 学部を選択していない時などのエラー*/}
    </div>
  );
};
