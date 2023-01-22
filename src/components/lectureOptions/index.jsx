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
        <h2 className="card-subheader">
          高く評価した講義（{favorites.length}個）
        </h2>
        {favorites.length > 0 ? (
          <Stack>
            {favLectures.map((lecture) => {
              return (
                <LectureChip
                  key={lecture.id}
                  id={lecture.id}
                  title={lecture.title}
                  lecturer={lecture.lecturer}
                  removeLecture={removeFavorites}
                />
              );
            })}
          </Stack>
        ) : null}
        <Divider className="divider-20" />
        <h2 className="card-subheader">
          低く評価した講義（{unfavorites.length}個）
        </h2>
        {unfavorites.length > 0 ? (
          <Stack>
            {unfavLectures.map((lecture) => {
              return (
                <LectureChip
                  key={lecture.id}
                  id={lecture.id}
                  title={lecture.title}
                  lecturer={lecture.lecturer}
                  removeLecture={removeUnfavorites}
                />
              );
            })}
          </Stack>
        ) : null}
      </CardContent>
    </Card>
  );
});
LectureOptions.displayName = "LectureOptions";
