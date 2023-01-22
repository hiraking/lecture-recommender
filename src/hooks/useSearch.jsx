import axios from "axios";
import { useCallback, useState } from "react";
import { URL } from "src/utils/consts";

export const useSearch = () => {
  const [hits, setHits] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [page, setPage] = useState(1);
  const [faculty, setFaculty] = useState(0);
  const [queryCache, setQueryCache] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetcherPagination = useCallback(
    (optPage) => {
      setIsLoading(true);
      setPage(optPage);
      axios
        .post(URL + "/search", {
          query: queryCache,
          faculty_id: faculty,
          page: optPage,
        })
        .then((res) => {
          setLectures(res.data.lectures);
          setIsLoading(false);
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
    isLoading,
    setIsLoading,
    faculty,
    setFaculty,
    queryCache,
    setQueryCache,
    fetcherPagination,
  };
};
