import { Alert, Button, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const messages = [
  "講義を登録してください",
  "学部を選択してください",
  "開講区分を選択してください",
];

export const RecommendButton = (props) => {
  const { semesters, faculties, favorites, unfavorites, label, applyTemp } =
    props;

  const [nolecture, setNolecture] = useState(false);
  const [nofaculty, setNofaculty] = useState(false);
  const [nosemester, setNosemester] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { push } = useRouter();

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
    }, 3500);
    return flag;
  }, [faculties, semesters, favorites, unfavorites]);

  const executeRecommend = useCallback(() => {
    if (validateOption()) {
      push({
        pathname: "/result",
        query: {
          l: favorites,
          dl: unfavorites,
          f: faculties,
          s: semesters,
          p: 1,
          at: applyTemp,
        },
      });
    }
  }, [
    validateOption,
    push,
    favorites,
    unfavorites,
    faculties,
    semesters,
    applyTemp,
  ]);

  useEffect(() => {
    if (nofaculty || nolecture || nosemester) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [nofaculty, nolecture, nosemester]);

  return (
    <Box>
      <Button onClick={executeRecommend} variant="contained" size="large">
        {label}
      </Button>

      <Collapse in={showAlert}>
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
