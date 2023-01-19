import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
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
    <Card>
      <CardHeader title={"面白かった・つまらなかった講義を選択"} />
      <CardContent>
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ marginRight: "20px" }}
        >
          講義を追加する
        </Button>
        <Button onClick={resetTastes} variant="contained">
          リセット
        </Button>
        <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
          高く評価した講義（{favorites.length}個）
        </Typography>
        {favorites.length > 0 ? (
          <Stack spacing={2}>
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
        <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
          低く評価した講義（{unfavorites.length}個）
        </Typography>
        {unfavorites.length > 0 ? (
          <Stack spacing={2}>
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
