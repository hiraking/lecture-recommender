import axios from "axios";
import { useCallback, useState } from "react";
import { URL } from "src/utils/consts";

export const useSearch = () => {
  const [hits, setHits] = useState(1);
  const [lectures, setLectures] = useState([]);
  const [page, setPage] = useState(1);
  const [faculty, setFaculty] = useState(0);
  const [query, setQuery] = useState("");
  const [queryCache, setQueryCache] = useState("");
  const [noHit, setNoHit] = useState(false);
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
        if (isLoading) {
          console.log("loading now!!!");
        }
        setIsLoading(false);
      });
  }, [faculty, query, isLoading]);

  const fetcherPagination = useCallback(
    (optPage) => {
      setPage(optPage);
      axios
        .post(URL + "/search", {
          query: queryCache,
          faculty_id: faculty,
          page: optPage,
        })
        .then((res) => {
          console.log(res.data);
          setLectures(res.data.lectures);
        });
    },
    [faculty, queryCache]
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
    noHit,
    fetcherButton,
    fetcherPagination,
  };
};
