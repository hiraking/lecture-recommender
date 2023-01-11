import axios from "axios";
import { useCallback, useState } from "react";
import { URL } from "src/utils/consts";

export const useSearch = () => {
  const [hits, setHits] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [page, setPage] = useState(1);
  const [faculty, setFaculty] = useState(0);
  const [query, setQuery] = useState("");
  const fetcher = useCallback(
    (optPage) => {
      axios
        .post(URL + "/search", {
          query: query,
          faculty_id: faculty,
          page: optPage,
        })
        .then((res) => {
          console.log(res.data);
          setHits(res.data.hits);
          setLectures(res.data.lectures);
        });
    },
    [faculty, query]
  );
  return {
    hits,
    setHits,
    lectures,
    setLectures,
    page,
    setPage,
    faculty,
    setFaculty,
    query,
    setQuery,
    fetcher,
  };
};
