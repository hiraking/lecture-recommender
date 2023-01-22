import { Alert, Button, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const messages = [
  "講義を登録してください",
  "学部を選択してください",
  "学期を選択してください",
];

export const RecommendButton = (props) => {
  const {
    semesters,
    faculties,
    favorites,
    unfavorites,
    label,
    applyTemp,
    isIndex,
  } = props;

  const [nolecture, setNolecture] = useState(false);
  const [nofaculty, setNofaculty] = useState(false);
  const [nosemester, setNosemester] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { push } = useRouter();

  const validateOption = useCallback(() => {
    setNolecture(false);
    setNofaculty(false);
    setNosemester(false);
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
    return flag;
  }, [faculties, semesters, favorites, unfavorites]);

  const executeRecommend = useCallback(() => {
    if (validateOption()) {
      setShowAlert(false);
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
    }
  }, [nofaculty, nolecture, nosemester]);

  const handleClose = useCallback(() => {
    setShowAlert(false);
    setTimeout(() => {
      setNolecture(false);
      setNofaculty(false);
      setNosemester(false);
    }, 500);
  }, []);

  return (
    <Box
      className={
        isIndex ? "index-recommend-btn-field" : "side-recommend-btn-field"
      }
    >
      <Button
        onClick={executeRecommend}
        variant="contained"
        size="large"
        className={
          isIndex ? "bright-btn index-bright-btn" : "bright-btn side-bright-btn"
        }
      >
        {label}
      </Button>

      <Collapse in={showAlert}>
        {isIndex ? (
          <IndexAlert handleClose={handleClose}>
            {nolecture ? <p>・{messages[0]}</p> : null}
            {nofaculty ? <p>・{messages[1]}</p> : null}
            {nosemester ? <p>・{messages[2]}</p> : null}
          </IndexAlert>
        ) : (
          <div style={{ color: "darkred", fontSize: "14px" }}>
            {nolecture ? <p>・{messages[0]}</p> : null}
            {nofaculty ? <p>・{messages[1]}</p> : null}
            {nosemester ? <p>・{messages[2]}</p> : null}
          </div>
        )}
      </Collapse>
    </Box>
  );
};

const IndexAlert = (props) => {
  return (
    <Alert
      severity="error"
      variant="outlined"
      onClose={props.handleClose}
      className="alert index-alert"
      sx={{ width: "280px", margin: "0 auto" }}
    >
      {props.children}
    </Alert>
  );
};
