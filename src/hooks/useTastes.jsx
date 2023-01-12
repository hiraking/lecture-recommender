import axios from "axios";
import { URL } from "src/utils/consts";
import { useCallback, useState } from "react";

export const useTastes = () => {
  const [hits, setHits] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [page, setPage] = useState(1);
  const [faculty, setFaculty] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [unfavorites, setUnfavorites] = useState([]);

  const handleAdd = useCallback((id, setState1, setState2) => {
    setState1((prevArray) => {
      if (prevArray.includes(id)) {
        return prevArray;
      }
      return [...prevArray, id];
    });
    setState2((prevArray) => {
      if (prevArray.includes(id)) {
        return prevArray.filter((n) => n !== id);
      }
      return prevArray;
    });
  }, []);

  const handleRemove = useCallback((id, setState) => {
    setState((prevArray) => {
      if (prevArray.includes(id)) {
        return prevArray.filter((n) => n !== id);
      }
      return prevArray;
    });
  }, []);

  const handleToggle = useCallback((id, setArray1, setArray2, array1) => {
    if (array1.includes(id)) {
      setArray1((prevArray) => prevArray.filter((n) => n !== id));
      return;
    }
    setArray1((prevArray) => [...prevArray, id]);
    setArray2((prevArray) => prevArray.filter((n) => n !== id));
  }, []);

  const toggleFavorites = useCallback(
    (id) => {
      handleToggle(id, setFavorites, setUnfavorites, favorites);
    },
    [handleToggle, favorites]
  );

  const toggleUnfavorites = useCallback(
    (id) => {
      handleToggle(id, setUnfavorites, setFavorites, unfavorites);
    },
    [handleToggle, unfavorites]
  );

  const addFavorites = useCallback(
    (id) => handleAdd(id, setFavorites, setUnfavorites),
    [handleAdd]
  );
  const addUnfavorites = useCallback(
    (id) => handleAdd(id, setUnfavorites, setFavorites),
    [handleAdd]
  );

  const removeFavorites = useCallback(
    (id) => handleRemove(id, setFavorites),
    [handleRemove]
  );
  const removeUnfavorites = useCallback(
    (id) => handleRemove(id, setUnfavorites),
    [handleRemove]
  );

  const resetTastes = useCallback(() => {
    setFavorites([]);
    setUnfavorites([]);
  }, []);

  const fetcher = useCallback(
    (optPage) => {
      axios
        .post(URL + "/recommend", {
          favorites: favorites,
          unfavorites: unfavorites,
          faculty_id: faculty,
          page: optPage,
        })
        .then((res) => {
          console.log(res.data);
          setHits(res.data.hits);
          setLectures(res.data.lectures);
        });
    },
    [favorites, unfavorites, faculty]
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
    favorites,
    unfavorites,
    removeFavorites,
    removeUnfavorites,
    toggleFavorites,
    toggleUnfavorites,
    resetTastes,
    fetcher,
  };
};
