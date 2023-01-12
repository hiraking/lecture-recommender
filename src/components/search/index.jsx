import {
  Button,
  Fade,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FACULTIES, URL } from "src/utils/consts";

export const Search = (props) => {
  const {
    setLectures,
    setPage,
    faculty,
    setFaculty,
    query,
    setQuery,
    setHits,
    noHit,
    fetcher,
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

  const executeSearch = useCallback(() => {
    fetcher(1);
    setPage(1);
  }, [fetcher, setPage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.nativeEvent.isComposing || e.key !== "Enter") return;
      executeSearch();
    },
    [executeSearch]
  );

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
      <Button variant="outlined" onClick={executeSearch}>
        検索
      </Button>
    </div>
  );
};
