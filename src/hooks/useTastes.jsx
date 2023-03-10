import axios from "axios";
import { URL } from "src/utils/consts";
import { useCallback, useReducer, useState } from "react";

export const useTastes = () => {
  const [hits, setHits] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [faculties, setFaculties] = useState(
    [...Array(10)].map((_, i) => String(i + 1))
  );
  const [facultiesTemp, setFacultiesTemp] = useState([]);
  const [semesters, setSemesters] = useState(
    [...Array(8)].map((_, i) => String(i))
  );
  const [semestersTemp, setSemestersTemp] = useState([]);
  const [noHit, setNoHit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorites = useCallback((id, lecture) => {
    favoritesDispatch({
      type: "toggle",
      datatype: "number",
      fav: true,
      id: id,
      temp: false,
    });
    favLecturesDispatch({
      type: "toggle",
      datatype: "object",
      fav: true,
      id: id,
      temp: false,
      lecture: lecture,
    });
  }, []);

  const toggleFavTemp = useCallback((id, lecture) => {
    favTempDispatch({
      type: "toggle",
      datatype: "number",
      fav: true,
      id: id,
      temp: true,
    });
    favLecTempDispatch({
      type: "toggle",
      datatype: "object",
      fav: true,
      id: id,
      temp: true,
      lecture: lecture,
    });
  }, []);

  const toggleUnfavorites = useCallback((id, lecture) => {
    unfavoritesDispatch({
      type: "toggle",
      datatype: "number",
      fav: false,
      id: id,
      temp: false,
    });
    unfavLecturesDispatch({
      type: "toggle",
      datatype: "object",
      fav: false,
      id: id,
      temp: false,
      lecture: lecture,
    });
  }, []);

  const toggleUnfavTemp = useCallback((id, lecture) => {
    unfavTempDispatch({
      type: "toggle",
      datatype: "number",
      fav: false,
      id: id,
      temp: true,
    });
    unfavLecTempDispatch({
      type: "toggle",
      datatype: "object",
      fav: false,
      id: id,
      temp: true,
      lecture: lecture,
    });
  }, []);

  const removeFavorites = useCallback((id) => {
    favoritesDispatch({ type: "remove", datatype: "number", id: id });
    favLecturesDispatch({ type: "remove", datatype: "object", id: id });
  }, []);

  const removeFavTemp = useCallback((id) => {
    favTempDispatch({ type: "remove", datatype: "number", id: id });
    favLecTempDispatch({ type: "remove", datatype: "object", id: id });
  }, []);

  const removeUnfavorites = useCallback((id) => {
    unfavoritesDispatch({ type: "remove", datatype: "number", id: id });
    unfavLecturesDispatch({ type: "remove", datatype: "object", id: id });
  }, []);

  const removeUnfavTemp = useCallback((id) => {
    unfavTempDispatch({ type: "remove", datatype: "number", id: id });
    unfavLecTempDispatch({ type: "remove", datatype: "object", id: id });
  }, []);

  const checkTastes = useCallback(
    (fav, id, temp) => {
      if (temp) {
        if (fav) removeUnfavTemp(id);
        else removeFavTemp(id);
      } else {
        if (fav) removeUnfavorites(id);
        else removeFavorites(id);
      }
    },
    [removeFavorites, removeUnfavorites, removeFavTemp, removeUnfavTemp]
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
              checkTastes(action.fav, action.id, action.temp);
              return [...state, action.lecture];

            case "number":
              if (state.includes(action.id)) {
                return state.filter((i) => i !== action.id);
              }
              checkTastes(action.fav, action.id, action.temp);
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

        case "replace":
          return action.new;

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
  const [favTemp, favTempDispatch] = useReducer(arrayReducer, []);
  const [favLecTemp, favLecTempDispatch] = useReducer(arrayReducer, []);
  const [unfavTemp, unfavTempDispatch] = useReducer(arrayReducer, []);
  const [unfavLecTemp, unfavLecTempDispatch] = useReducer(arrayReducer, []);

  const getRecommend = useCallback(
    (favorites, unfavorites, faculties, semesters, page) => {
      setIsLoading(true);
      setNoHit(false);
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
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  const fetchWithID = useCallback((favorites, unfavorites) => {
    axios
      .post(URL + "/get", {
        favorites: favorites,
        unfavorites: unfavorites,
      })
      .then((res) => {
        console.log(res.data);
        favLecturesDispatch({ type: "replace", new: res.data.favorites });
        unfavLecturesDispatch({ type: "replace", new: res.data.unfavorites });
        favLecTempDispatch({ type: "replace", new: res.data.favorites });
        unfavLecTempDispatch({ type: "replace", new: res.data.unfavorites });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const syncLectures = useCallback(
    (applyTemp) => {
      if (applyTemp) {
        favLecturesDispatch({ type: "replace", new: favLecTemp });
        unfavLecturesDispatch({ type: "replace", new: unfavLecTemp });
      } else {
        favLecTempDispatch({ type: "replace", new: favLectures });
        unfavLecTempDispatch({ type: "replace", new: unfavLectures });
      }
    },
    [favLecTemp, unfavLecTemp, favLectures, unfavLectures]
  );

  const fetchWithQuery = useCallback(
    (favorites, unfavorites, faculties, semesters, page, applyTemp) => {
      favoritesDispatch({ type: "replace", new: favorites });
      unfavoritesDispatch({ type: "replace", new: unfavorites });
      setSemesters(semesters);
      setFaculties(faculties);
      favTempDispatch({ type: "replace", new: favorites });
      unfavTempDispatch({ type: "replace", new: unfavorites });
      setSemestersTemp(semesters);
      setFacultiesTemp(faculties);
      syncLectures(applyTemp);
      getRecommend(favorites, unfavorites, faculties, semesters, page);
    },
    [getRecommend, syncLectures]
  );

  const tmpHooks = {
    favTemp,
    unfavTemp,
    favLecTemp,
    unfavLecTemp,
    toggleFavTemp,
    toggleUnfavTemp,
    removeFavTemp,
    removeUnfavTemp,
    facultiesTemp,
    setFacultiesTemp,
    semestersTemp,
    setSemestersTemp,
  };

  return {
    hits,
    setHits,
    lectures,
    setLectures,
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
    fetchWithQuery,
    fetchWithID,
    favLectures,
    unfavLectures,
    tmpHooks,
  };
};
