import axios from "axios";
import { URL } from "src/utils/consts";
import { useCallback, useState } from "react";

export const useTastes = () => {
  const [hits, setHits] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [page, setPage] = useState(1);
  const [faculties, setFaculties] = useState(
    [...Array(10)].map((_, i) => i + 1)
  );
  const [semesters, setSemesters] = useState([...Array(8)].map((_, i) => i));
  const [favorites, setFavorites] = useState([]);
  const [unfavorites, setUnfavorites] = useState([]);
  const [favLectures, setFavLectures] = useState([]);
  const [unfavLectures, setUnfavLectures] = useState([]);
  const [noHit, setNoHit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setFavLectures([]);
    setUnfavLectures([]);
  }, []);

  const fetcher = useCallback(
    (optPage) => {
      setIsLoading(true);
      setPage(optPage);
      axios
        .post(URL + "/recommend", {
          favorites: favorites,
          unfavorites: unfavorites,
          faculty_ids: faculties,
          semester_ids: semesters,
          page: optPage,
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
    },
    [favorites, unfavorites, faculties, semesters]
  );

  return {
    hits,
    setHits,
    lectures,
    setLectures,
    page,
    setPage,
    noHit,
    isLoading,
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
