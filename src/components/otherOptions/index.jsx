import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import { FACULTIES, SEMESTERS } from "src/utils/consts";

export const FacultyOptions = (props) => {
  const { faculties, setFaculties } = props.tastes;

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
    <div>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h5" sx={{ marginRight: "30px" }}>
          学部
        </Typography>
        <div>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: "20px" }}
            onClick={selectAll}
          >
            全て選択
          </Button>
          <Button variant="contained" size="small" onClick={unselectAll}>
            全て解除
          </Button>
        </div>
      </Box>

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
                  />
                }
                label={item.name}
                sx={{ width: "25%", margin: 0 }}
              />
            );
          })}
        </FormGroup>
      </Box>
    </div>
  );
};

export const SemesterOptions = (props) => {
  const { semesters, setSemesters } = props.tastes;

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
    <div>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h5" sx={{ marginRight: "30px" }}>
          開講区分
        </Typography>
        <div>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: "20px" }}
            onClick={selectAll}
          >
            全て選択
          </Button>
          <Button variant="contained" size="small" onClick={unselectAll}>
            全て解除
          </Button>
        </div>
      </Box>

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
                  />
                }
                label={item.name}
                sx={{ width: "25%", margin: 0 }}
              />
            );
          })}
        </FormGroup>
      </Box>
    </div>
  );
};