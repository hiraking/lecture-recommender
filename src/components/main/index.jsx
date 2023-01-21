import { Card, CardContent, Typography } from "@mui/material";
import { createContext, useState } from "react";
import { LectureOptions } from "src/components/lectureOptions";
import { SearchModal } from "src/components/modal";
import { FacultyOptions, SemesterOptions } from "src/components/otherOptions";
import { RecommendButton } from "src/components/recommendButton";

export const ThumbContext = createContext();

export const Main = (props) => {
  const {
    semesters,
    setSemesters,
    faculties,
    setFaculties,
    favorites,
    unfavorites,
    favLectures,
    unfavLectures,
    toggleFavorites,
    toggleUnfavorites,
    removeFavorites,
    removeUnfavorites,
    resetTastes,
  } = props.tastes;

  const tastesForThumb = {
    favorites,
    unfavorites,
    toggleFavorites,
    toggleUnfavorites,
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      style={{
        height: "1000px",
        textAlign: "center",
        width: "60%",
        margin: "100px auto",
      }}
    >
      <ThumbContext.Provider value={tastesForThumb}>
        <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
      </ThumbContext.Provider>
      <LectureOptions
        setOpenModal={setOpenModal}
        favorites={favorites}
        unfavorites={unfavorites}
        favLectures={favLectures}
        unfavLectures={unfavLectures}
        resetTastes={resetTastes}
        removeFavorites={removeFavorites}
        removeUnfavorites={removeUnfavorites}
      />
      <RecommendButton
        semesters={semesters}
        faculties={faculties}
        favorites={favorites}
        unfavorites={unfavorites}
        label="おすすめを探す"
        isIndex
      />
      <Card>
        <CardContent className={openModal ? "disabled_input" : ""}>
          <Typography variant="subtitle1">オプション</Typography>
          <FacultyOptions faculties={faculties} setFaculties={setFaculties} />
          <SemesterOptions semesters={semesters} setSemesters={setSemesters} />
        </CardContent>
      </Card>
    </div>
  );
};
