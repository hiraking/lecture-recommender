import { Alert, Button, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const messages = [
  "講義を登録してください",
  "学部を選択してください",
  "開講区分を選択してください",
];

export const RecommendButton = (props) => {
  const { semesters, faculties, favorites, unfavorites, fetcher } = props;

  const [nolecture, setNolecture] = useState(false);
  const [nofaculty, setNofaculty] = useState(false);
  const [nosemester, setNosemester] = useState(false);

  const router = useRouter();

  const validateOption = useCallback(() => {
    let flag = true;
    if (!semesters.length) {
      setNosemester(true);
      flag = false;
    }
    if (!faculties.length) {
      setNofaculty(true);
      flag = false;
    }
    if (!favorites.length && !unfavorites.length) {
      setNolecture(true);
      flag = false;
    }
    setTimeout(() => {
      setNosemester(false);
      setNofaculty(false);
      setNolecture(false);
    }, 3000);
    return flag;
  }, [faculties, semesters, favorites, unfavorites]);

  const executeRecommend = useCallback(() => {
    if (validateOption()) {
      router.push({ pathname: "/result", query: { p: 1 } });
    }
  }, [validateOption, router]);

  return (
    <Box sx={{ height: "auto", backgroundColor: "lightgreen" }}>
      <Button onClick={executeRecommend} variant="contained" size="large">
        おすすめを探す
      </Button>

      <Collapse in={nolecture || nofaculty || nosemester}>
        <Alert
          severity="error"
          variant="outlined"
          sx={{ width: "max-content", textAlign: "left", margin: "0 auto" }}
        >
          {nolecture ? <p>・{messages[0]}</p> : null}
          {nofaculty ? <p>・{messages[1]}</p> : null}
          {nosemester ? <p>・{messages[2]}</p> : null}
        </Alert>
      </Collapse>
    </Box>
  );
};