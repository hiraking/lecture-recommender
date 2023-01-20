import axios from "axios";
import { URL } from "src/utils/consts";
import { useCallback, useReducer, useState } from "react";

export const useTastes = () => {
  const [hits, setHits] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [pageCache, setPageCache] = useState(1);
  const [faculties, setFaculties] = useState(
    [...Array(10)].map((_, i) => i + 1)
  );
  const [facultiesTemp, setFacultiesTemp] = useState([]);
  const [semesters, setSemesters] = useState([...Array(8)].map((_, i) => i));
  const [semestersTemp, setSemestersTemp] = useState([]);
  const [noHit, setNoHit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorites = useCallback((id, lecture) => {
    favoritesDispatch({
      type: "toggle",
      datatype: "number",
      fav: true,
      id: id,
    });
    favLecturesDispatch({
      type: "toggle",
      datatype: "object",
      fav: true,
      id: id,
      lecture: lecture,
    });
  }, []);

  const toggleUnfavorites = useCallback((id, lecture) => {
    unfavoritesDispatch({
      type: "toggle",
      datatype: "number",
      fav: false,
      id: id,
    });
    unfavLecturesDispatch({
      type: "toggle",
      datatype: "object",
      fav: false,
      id: id,
      lecture: lecture,
    });
  }, []);

  const removeFavorites = useCallback((id) => {
    favoritesDispatch({ type: "remove", datatype: "number", id: id });
    favLecturesDispatch({ type: "remove", datatype: "object", id: id });
  }, []);

  const removeUnfavorites = useCallback((id) => {
    unfavoritesDispatch({ type: "remove", datatype: "number", id: id });
    unfavLecturesDispatch({ type: "remove", datatype: "object", id: id });
  }, []);

  const checkTastes = useCallback(
    (fav, id) => {
      if (fav) removeUnfavorites(id);
      else removeFavorites(id);
    },
    [removeFavorites, removeUnfavorites]
  );

  const resetTastes = useCallback(() => {
    favoritesDispatch({ type: "reset" });
    favLecturesDispatch({ type: "reset" });
    unfavoritesDispatch({ type: "reset" });
    unfavLecturesDispatch({ type: "reset" });
  }, []);

  const arrayReducer = useCallback(
    (state, action) => {
      switch (action.type) {
        case "reset":
          return [];

        case "toggle":
          switch (action.datatype) {
            case "object":
              if (state.some((obj) => obj.id === action.id)) {
                return state.filter((obj) => obj.id !== action.id);
              }
              checkTastes(action.fav, action.id);
              return [...state, action.lecture];

            case "number":
              if (state.includes(action.id)) {
                return state.filter((i) => i !== action.id);
              }
              checkTastes(action.fav, action.id);
              return [...state, action.id];
          }

        case "remove":
          switch (action.datatype) {
            case "object":
              if (state.some((obj) => obj.id === action.id)) {
                return state.filter((obj) => obj.id !== action.id);
              }
              return state;

            case "number":
              if (state.includes(action.id)) {
                return state.filter((i) => i !== action.id);
              }
              return state;
          }

        default:
          return state;
      }
    },
    [checkTastes]
  );
  const [favorites, favoritesDispatch] = useReducer(arrayReducer, []);
  const [favLectures, favLecturesDispatch] = useReducer(arrayReducer, []);
  const [unfavorites, unfavoritesDispatch] = useReducer(arrayReducer, []);
  const [unfavLectures, unfavLecturesDispatch] = useReducer(arrayReducer, []);

  const getRecommend = useCallback(
    (favorites, unfavorites, faculties, semesters, page) => {
      setIsLoading(true);
      setPageCache(page);
      axios
        .post(URL + "/recommend", {
          favorites: favorites,
          unfavorites: unfavorites,
          faculty_ids: faculties,
          semester_ids: semesters,
          page: page,
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  const fetcher = useCallback(
    (page) => {
      setSemestersTemp(semesters);
      setFacultiesTemp(faculties);
      getRecommend(favorites, unfavorites, faculties, semesters, page);
    },
    [getRecommend, favorites, unfavorites, faculties, semesters]
  );

  const fetcherUpdate = useCallback(
    (page) => {
      setSemesters(semestersTemp);
      setFaculties(facultiesTemp);
      getRecommend(favorites, unfavorites, facultiesTemp, semestersTemp, page);
    },
    [getRecommend, favorites, unfavorites, semestersTemp, facultiesTemp]
  );

  return {
    hits,
    setHits,
    lectures,
    setLectures,
    pageCache,
    noHit,
    isLoading,
    faculties,
    setFaculties,
    facultiesTemp,
    setFacultiesTemp,
    semesters,
    setSemesters,
    semestersTemp,
    setSemestersTemp,
    favorites,
    unfavorites,
    removeFavorites,
    removeUnfavorites,
    toggleFavorites,
    toggleUnfavorites,
    resetTastes,
    fetcher,
    fetcherUpdate,
    favLectures,
    unfavLectures,
  };
};
