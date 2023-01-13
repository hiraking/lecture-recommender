import axios from "axios";
import { URL } from "src/utils/consts";
import { useCallback, useState } from "react";

export const useTastes = () => {
  const [hits, setHits] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [page, setPage] = useState(1);
  const [faculties, setFaculties] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unfavorites, setUnfavorites] = useState([]);
  const [favLectures, setFavLectures] = useState([]);
  const [unfavLectures, setUnfavLectures] = useState([]);

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

  const handleRemove = useCallback((id, array, setArray, setObjArray) => {
    if (array.includes(id)) {
      setArray((prevArray) => prevArray.filter((n) => n !== id));
      setObjArray((prevArray) => prevArray.filter((obj) => obj.id !== id));
    }
    setArray((prevArray) => {
      if (prevArray.includes(id)) {
        return prevArray.filter((n) => n !== id);
      }
      return prevArray;
    });
  }, []);

  /* const handleToggle = useCallback((id, setArray1, setArray2, array1) => {
    if (array1.includes(id)) {
      setArray1((prevArray) => prevArray.filter((n) => n !== id));
      return;
    }
    setArray1((prevArray) => [...prevArray, id]);
    setArray2((prevArray) => prevArray.filter((n) => n !== id));
  }, []); */
  const handleToggle = useCallback(
    (
      id,
      lecture,
      setArray1,
      setArray2,
      array1,
      array2,
      setObjArray1,
      setObjArray2
    ) => {
      if (array1.includes(id)) {
        setArray1((prevArray) => prevArray.filter((n) => n !== id));
        setObjArray1((prevArray) => prevArray.filter((obj) => obj.id !== id));
        return;
      }
      setArray1((prevArray) => [...prevArray, id]);
      setObjArray1((prevArray) => [...prevArray, lecture]);
      if (array2.includes(id)) {
        setArray2((prevArray) => prevArray.filter((n) => n !== id));
        setObjArray2((prevArray) => prevArray.filter((obj) => obj.id !== id));
      }
    },
    []
  );

  const toggleFavorites = useCallback(
    (id, lecture) => {
      handleToggle(
        id,
        lecture,
        setFavorites,
        setUnfavorites,
        favorites,
        unfavorites,
        setFavLectures,
        setUnfavLectures
      );
    },
    [favorites, unfavorites, handleToggle]
  );

  const toggleUnfavorites = useCallback(
    (id, lecture) => {
      handleToggle(
        id,
        lecture,
        setUnfavorites,
        setFavorites,
        unfavorites,
        favorites,
        setUnfavLectures,
        setFavLectures
      );
    },
    [favorites, unfavorites, handleToggle]
  );
  /* const toggleFavorites = useCallback(
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
  ); */

  const addFavorites = useCallback(
    (id) => handleAdd(id, setFavorites, setUnfavorites),
    [handleAdd]
  );
  const addUnfavorites = useCallback(
    (id) => handleAdd(id, setUnfavorites, setFavorites),
    [handleAdd]
  );

  const removeFavorites = useCallback(
    (id) => handleRemove(id, favorites, setFavorites, setFavLectures),
    [handleRemove, favorites]
  );
  const removeUnfavorites = useCallback(
    (id) => handleRemove(id, unfavorites, setUnfavorites, setUnfavLectures),
    [handleRemove, unfavorites]
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
          faculty_id: faculties,
          page: optPage,
        })
        .then((res) => {
          console.log(res.data);
          setHits(res.data.hits);
          setLectures(res.data.lectures);
        });
    },
    [favorites, unfavorites, faculties]
  );

  return {
    hits,
    setHits,
    lectures,
    setLectures,
    page,
    setPage,
    faculties,
    setFaculties,
    semesters,
    setSemesters,
    favorites,
    unfavorites,
    removeFavorites,
    removeUnfavorites,
    toggleFavorites,
    toggleUnfavorites,
    resetTastes,
    fetcher,
    favLectures,
    unfavLectures,
  };
};
