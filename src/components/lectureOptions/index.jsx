import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { LectureChip } from "src/components/lectureChip";

export const LectureOptions = (props) => {
  const tastes = props.tastes;
  return (
    <Card>
      <CardHeader title={"面白かった・つまらなかった講義を選択"} />
      <CardContent>
        <Button onClick={props.openModal} variant="contained">
          講義を追加する
        </Button>
        <Button onClick={tastes.resetTastes} variant="contained">
          リセット
        </Button>
        <Typography variant="subtitle1">
          高く評価した講義（{tastes.favorites.length}個）
        </Typography>
        {tastes.favorites.length > 0 ? (
          <Stack spacing={2}>
            {tastes.favLectures.map((lecture) => {
              return (
                <LectureChip
                  key={lecture.id}
                  id={lecture.id}
                  title={lecture.title}
                  lecturer={lecture.lecturer}
                  removeLecture={tastes.removeFavorites}
                />
              );
            })}
          </Stack>
        ) : null}
        <Typography variant="subtitle1">
          低く評価した講義（{tastes.unfavorites.length}個）
        </Typography>
        {tastes.unfavorites.length > 0 ? (
          <Stack spacing={2}>
            {tastes.unfavLectures.map((lecture) => {
              return (
                <LectureChip
                  key={lecture.id}
                  id={lecture.id}
                  title={lecture.title}
                  lecturer={lecture.lecturer}
                  removeLecture={tastes.removeUnfavorites}
                />
              );
            })}
          </Stack>
        ) : null}
      </CardContent>
    </Card>
  );
};
