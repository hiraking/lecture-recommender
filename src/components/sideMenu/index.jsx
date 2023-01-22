import { Button, Chip, Divider, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
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
    <div className="side-menu">
      <h4 className="side-header">検索条件</h4>
      <Divider className="divider-20" />
      <SideTastes
        title="高評価した講義"
        setOpenModal={setOpenModal}
        lectures={favLecTemp}
        removeLecture={removeFavTemp}
      />
      <Divider className="divider-20" />
      <SideTastes
        title="低評価した講義"
        setOpenModal={setOpenModal}
        lectures={unfavLecTemp}
        removeLecture={removeUnfavTemp}
      />
      <Divider className="divider-20" />
      <SideFaculies
        facultiesTemp={facultiesTemp}
        setFacultiesTemp={setFacultiesTemp}
      />
      <Divider className="divider-20" />
      <SideSemesters
        semestersTemp={semestersTemp}
        setSemestersTemp={setSemestersTemp}
      />
      <Divider className="divider-20" />
      <RecommendButton
        semesters={semestersTemp}
        faculties={facultiesTemp}
        favorites={favTemp}
        unfavorites={unfavTemp}
        label="この条件で探す"
        applyTemp={1}
      />
      <Divider className="divider-20" />
      <Link href="/" passHref>
        <Button variant="textt" size="small" className="go-top-btn">
          トップに戻る
        </Button>
      </Link>
    </div>
  );
};

const SideTastes = memo((props) => {
  const { title, setOpenModal, lectures, removeLecture } = props;
  const handleAdd = useCallback(() => setOpenModal(true), [setOpenModal]);
  return (
    <Box>
      <Typography variant="subtitle1" className="side-subheader">
        {title}
      </Typography>
      {lectures.length > 0 ? (
        <div className="side-lecture-chip-wrapper">
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
        </div>
      ) : null}
      <div className="side-open-modal">
        <Button
          variant="outlined"
          onClick={handleAdd}
          size="small"
          className="normal-btn"
        >
          追加
        </Button>
      </div>
    </Box>
  );
});
SideTastes.displayName = "SideTastes";

const SideLectureChip = (props) => {
  const { id, title, lecturer, removeLecture } = props;
  return (
    <Tooltip title={title + " ｜ " + lecturer} placement="left" arrow>
      <Chip
        label={title}
        onDelete={() => removeLecture(id)}
        className="side-lecture-chip"
      />
    </Tooltip>
  );
};

const SideFaculies = memo((props) => {
  const { facultiesTemp, setFacultiesTemp } = props;
  return (
    <Box>
      <Typography variant="subtitle1" className="side-subheader">
        学部
      </Typography>
      <FacultyForm
        faculties={facultiesTemp}
        setFaculties={setFacultiesTemp}
        side
      />
    </Box>
  );
});
SideFaculies.displayName = "SideFaculies";

const SideSemesters = (props) => {
  const { semestersTemp, setSemestersTemp } = props;
  return (
    <Box>
      <Typography variant="subtitle1" className="side-subheader">
        学期
      </Typography>
      <SemesterForm
        semesters={semestersTemp}
        setSemesters={setSemestersTemp}
        side
      />
    </Box>
  );
};
