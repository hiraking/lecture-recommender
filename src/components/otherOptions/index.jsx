import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useCallback } from "react";
import { FACULTIES, SEMESTERS } from "src/utils/consts";

const CheckboxColor = {
  color: "#969696",
  "&.Mui-checked": { color: "#77bbc2" },
};

export const FacultyForm = memo((props) => {
  const { faculties, setFaculties, side } = props;
  const handleChange = useCallback(
    (id) => {
      setFaculties((prevArray) => {
        if (prevArray.includes(id)) {
          return prevArray.filter((i) => i !== id);
        }
        return [...prevArray, id];
      });
    },
    [setFaculties]
  );
  return (
    <Box>
      <FormGroup
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {FACULTIES.slice(1).map((item) => {
          return (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  value={item.id}
                  onChange={() => handleChange(item.id)}
                  checked={faculties.includes(item.id)}
                  sx={CheckboxColor}
                  className="inner-checkbox"
                />
              }
              label={item.name}
              className={side ? "side-checkbox" : "index-checkbox"}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
});
FacultyForm.displayName = "FacultyForm";

export const FacultyOptions = memo((props) => {
  const { faculties, setFaculties } = props;

  const selectAll = useCallback(() => {
    setFaculties(
      Array(10)
        .fill()
        .map((_, i) => i + 1)
    );
  }, [setFaculties]);

  const unselectAll = useCallback(() => {
    setFaculties([]);
  }, [setFaculties]);

  return (
    <div>
      <div className="option-header">
        <h2 className="card-subheader">学部</h2>
        <Button
          variant="contained"
          size="small"
          className="left-btn normal-btn"
          onClick={selectAll}
        >
          全て選択
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={unselectAll}
          className="normal-btn"
        >
          全て解除
        </Button>
      </div>
      <FacultyForm faculties={faculties} setFaculties={setFaculties} />
    </div>
  );
});
FacultyOptions.displayName = "FacultyOptions";

export const SemesterForm = memo((props) => {
  const { semesters, setSemesters, side } = props;
  const handleChange = useCallback(
    (id) => {
      setSemesters((prevArray) => {
        if (prevArray.includes(id)) {
          return prevArray.filter((i) => i !== id);
        }
        return [...prevArray, id];
      });
    },
    [setSemesters]
  );
  return (
    <Box>
      <FormGroup
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {SEMESTERS.map((item) => {
          return (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  value={item.id}
                  onChange={() => handleChange(item.id)}
                  checked={semesters.includes(item.id)}
                  sx={CheckboxColor}
                />
              }
              label={item.name}
              className={side ? "side-checkbox" : "index-checkbox"}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
});
SemesterForm.displayName = "SemesterForm";

export const SemesterOptions = memo((props) => {
  const { semesters, setSemesters } = props;

  const selectAll = useCallback(() => {
    setSemesters(
      Array(8)
        .fill()
        .map((_, i) => i)
    );
  }, [setSemesters]);

  const unselectAll = useCallback(() => {
    setSemesters([]);
  }, [setSemesters]);

  return (
    <div className="option">
      <div className="option-header">
        <h2 className="card-subheader">学期</h2>
        <Button
          variant="contained"
          size="small"
          className="left-btn normal-btn"
          onClick={selectAll}
        >
          全て選択
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={unselectAll}
          className="normal-btn"
        >
          全て解除
        </Button>
      </div>
      <SemesterForm semesters={semesters} setSemesters={setSemesters} />
    </div>
  );
});
SemesterOptions.displayName = "SemesterOptions";
