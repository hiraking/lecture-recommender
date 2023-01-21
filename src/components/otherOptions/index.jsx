import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import { memo, useCallback } from "react";
import { FACULTIES, SEMESTERS } from "src/utils/consts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FacultyForm = memo((props) => {
  const { faculties, setFaculties, width } = props;
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
                />
              }
              label={item.name}
              sx={{ width: width, margin: 0 }}
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          学部
        </AccordionSummary>
        <AccordionDetails>
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
          <FacultyForm
            faculties={faculties}
            setFaculties={setFaculties}
            width="25%"
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
});
FacultyOptions.displayName = "FacultyOptions";

export const SemesterForm = memo((props) => {
  const { semesters, setSemesters, width } = props;
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
                />
              }
              label={item.name}
              sx={{ width: width, margin: 0 }}
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
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          学期
        </AccordionSummary>
        <AccordionDetails>
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
          <SemesterForm
            semesters={semesters}
            setSemesters={setSemesters}
            width="25%"
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
});
SemesterOptions.displayName = "SemesterOptions";
