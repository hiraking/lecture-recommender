import {
  Alert,
  Button,
  Collapse,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { memo, useCallback, useRef, useState } from "react";
import { FACULTIES, URL } from "src/utils/consts";

export const Search = memo((props) => {
  const [query, setQuery] = useState("");
  const [noHit, setNoHit] = useState(false);

  const {
    setIsLoading,
    setPage,
    setLectures,
    setQueryCache,
    faculty,
    setFaculty,
    setHits,
  } = props;

  const fetcherButton = useCallback(() => {
    setIsLoading(true);
    setPage(1);
    setQueryCache(query);
    axios
      .post(URL + "/search", {
        query: query,
        faculty_id: faculty,
        page: 1,
      })
      .then((res) => {
        console.log(res.data);
        setHits(res.data.hits);
        setLectures(res.data.lectures);
        if (res.data.hits === 0) {
          setNoHit(true);
          setTimeout(() => setNoHit(false), 3000);
        }
        setIsLoading(false);
      });
  }, [
    faculty,
    query,
    setIsLoading,
    setPage,
    setLectures,
    setQueryCache,
    setHits,
  ]);

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
    if (query.length === 0) {
      return;
    }
    fetcherButton();
    inputRef.current.blur();
  }, [fetcherButton, query]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.nativeEvent.isComposing || e.key !== "Enter") return;
      if (query.length === 0) {
        return;
      }
      fetcherButton();
      e.target.blur();
    },
    [fetcherButton, query]
  );

  return (
    <div className="search-window">
      <FormControl size="small">
        <Select
          value={faculty}
          onChange={handleFaculty}
          className="faculty-select normal-btn"
        >
          {FACULTIES.map((fac) => {
            return (
              <MenuItem key={fac.id} value={fac.id}>
                {fac.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        ref={inputRef}
        className="search-input"
        variant="outlined"
        size="small"
        value={query}
        autoFocus
        onChange={handleQueryChange}
        placeholder="キーワード"
        onKeyDown={handleKeyDown}
        sx={{ borderRadius: "0px" }}
      />
      <Button className="normal-btn search-btn" onClick={handleClick}>
        検索
      </Button>
      <Collapse in={noHit}>
        <Alert severity="warning" variant="contained">
          講義が見つかりませんでした
        </Alert>
      </Collapse>
    </div>
  );
});

Search.displayName = "Search";
