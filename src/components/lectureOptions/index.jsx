import { Box, Button, Card, CardContent, Divider, Stack } from "@mui/material";
import { memo, useCallback } from "react";
import { LectureChip } from "src/components/lectureChip";

export const LectureOptions = memo((props) => {
  const {
    setOpenModal,
    favorites,
    unfavorites,
    favLectures,
    unfavLectures,
    resetTastes,
    removeFavorites,
    removeUnfavorites,
  } = props;
  const handleOpen = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  return (
    <Card className="card">
      <CardContent>
        <h1 className="card-header">面白かった・つまらなかった講義を選択</h1>
        <Divider className="divider-20" />
        <Box className="card-lecture-btns">
          <Button
            onClick={handleOpen}
            variant="contained"
            className="normal-btn left-btn"
          >
            講義を追加する
          </Button>
          <Button
            onClick={resetTastes}
            variant="contained"
            className="normal-btn"
          >
            リセット
          </Button>
        </Box>
        <LectureStack
          header="高く評価した講義"
          idArray={favorites}
          lectureArray={favLectures}
          removeLecture={removeFavorites}
        />
        <Divider className="divider-20" />
        <LectureStack
          header="低く評価した講義"
          idArray={unfavorites}
          lectureArray={unfavLectures}
          removeLecture={removeUnfavorites}
        />
      </CardContent>
    </Card>
  );
});
LectureOptions.displayName = "LectureOptions";

const LectureStack = (props) => {
  const { header, idArray, lectureArray, removeLecture } = props;
  return (
    <>
      <h2 className="card-subheader">
        {header}（{idArray.length}個）
      </h2>
      {idArray.length > 0 ? (
        <Stack>
          {lectureArray.map((lecture) => {
            return (
              <LectureChip
                key={lecture.id}
                id={lecture.id}
                title={lecture.title}
                lecturer={lecture.lecturer}
                removeLecture={removeLecture}
              />
            );
          })}
        </Stack>
      ) : null}
    </>
  );
};
