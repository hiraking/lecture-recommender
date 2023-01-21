import { Button, Card, Chip, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect } from "react";
import { FacultyForm, SemesterForm } from "src/components/otherOptions";
import { RecommendButton } from "src/components/recommendButton";

export const SideMenu = (props) => {
  const {
    setOpenModal,
    fetchWithID,
    favTemp,
    unfavTemp,
    favLecTemp,
    unfavLecTemp,
    removeFavTemp,
    removeUnfavTemp,
    facultiesTemp,
    setFacultiesTemp,
    semestersTemp,
    setSemestersTemp,
  } = props;

  const { isReady } = useRouter();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (
      favTemp.length !== favLecTemp.length ||
      unfavTemp.length !== unfavLecTemp.length
    ) {
      fetchWithID(favTemp, unfavTemp);
    }
  });

  return (
    <div>
      <SideTastes
        title="高評価した講義"
        setOpenModal={setOpenModal}
        lectures={favLecTemp}
        removeLecture={removeFavTemp}
      />
      <SideTastes
        title="低評価した講義"
        setOpenModal={setOpenModal}
        lectures={unfavLecTemp}
        removeLecture={removeUnfavTemp}
      />
      <SideFaculies
        facultiesTemp={facultiesTemp}
        setFacultiesTemp={setFacultiesTemp}
      />
      <SideSemesters
        semestersTemp={semestersTemp}
        setSemestersTemp={setSemestersTemp}
      />
      <RecommendButton
        semesters={semestersTemp}
        faculties={facultiesTemp}
        favorites={favTemp}
        unfavorites={unfavTemp}
        label="この条件で探す"
        applyTemp={1}
      />
    </div>
  );
};

const SideTastes = memo((props) => {
  const { title, setOpenModal, lectures, removeLecture } = props;
  const handleAdd = useCallback(() => setOpenModal(true), [setOpenModal]);
  return (
    <Box>
      <Typography variant="subtitle1">{title}</Typography>
      {lectures.length > 0 ? (
        <Box sx={{ width: "90%" }}>
          {lectures.map((lecture) => {
            return (
              <SideLectureChip
                key={lecture.id}
                id={lecture.id}
                title={lecture.title}
                lecturer={lecture.lecturer}
                removeLecture={removeLecture}
              />
            );
          })}
        </Box>
      ) : null}
      <Box>
        <Button variant="outlined" onClick={handleAdd} size="small">
          追加
        </Button>
      </Box>
    </Box>
  );
});
SideTastes.displayName = "SideTastes";

const SideLectureChip = (props) => {
  const { id, title, lecturer, removeLecture } = props;
  return (
    <Tooltip title={title + "　/　" + lecturer} placement="left" arrow>
      <Chip
        label={title}
        onDelete={() => removeLecture(id)}
        sx={{ width: "100%", justifyContent: "space-between" }}
      />
    </Tooltip>
  );
};

const SideFaculies = memo((props) => {
  const { facultiesTemp, setFacultiesTemp } = props;
  return (
    <Box>
      <Typography variant="subtitle1">学部</Typography>
      <FacultyForm
        faculties={facultiesTemp}
        setFaculties={setFacultiesTemp}
        width="100%"
      />
    </Box>
  );
});
SideFaculies.displayName = "SideFaculies";

const SideSemesters = (props) => {
  const { semestersTemp, setSemestersTemp } = props;
  return (
    <Box>
      <Typography variant="subtitle1">学期</Typography>
      <SemesterForm
        semesters={semestersTemp}
        setSemesters={setSemestersTemp}
        width="100%"
      />
    </Box>
  );
};
