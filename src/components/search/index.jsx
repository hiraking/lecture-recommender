import {
  Button,
  Fade,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { FACULTIES } from "src/utils/consts";

export const Search = (props) => {
  const {
    setLectures,
    page,
    setPage,
    faculty,
    setFaculty,
    query,
    setQuery,
    setHits,
    noHit,
    fetcherButton,
  } = props.search;

  useEffect(() => {
    setQuery("");
    setFaculty(0);
    setPage(1);
    setHits(0);
    setLectures([]);
  }, [setQuery, setPage, setFaculty, setLectures, setHits]);

  const handleQueryChange = useCallback(
    (e) => setQuery(e.target.value),
    [setQuery]
  );

  const handleFaculty = useCallback(
    (e) => setFaculty(e.target.value),
    [setFaculty]
  );

  const inputRef = useRef(null);

  const handleClick = useCallback(() => {
    fetcherButton();
    inputRef.current.blur();
  }, [fetcherButton]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.nativeEvent.isComposing || e.key !== "Enter") return;
      fetcherButton();
      e.target.blur();
    },
    [fetcherButton]
  );

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.scrollIntoView(false, {
        behavior: "smooth",
        block: "start",
      });
    }
  }, [page]);

  return (
    <div>
      <FormControl sx={{ minWidth: 120, margin: 0 }} size="small">
        <Select value={faculty} onChange={handleFaculty} id="faculty-select">
          {FACULTIES.map((fac) => {
            return (
              <MenuItem key={fac.id} value={fac.id}>
                {fac.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Tooltip
        title="該当する講義はありません。"
        arrow
        open={noHit}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <TextField
          ref={inputRef}
          id="search-input"
          variant="outlined"
          size="small"
          value={query}
          autoFocus
          onChange={handleQueryChange}
          placeholder="キーワード"
          onKeyDown={handleKeyDown}
        />
      </Tooltip>
      <Button variant="outlined" onClick={handleClick}>
        検索
      </Button>
    </div>
  );
};
