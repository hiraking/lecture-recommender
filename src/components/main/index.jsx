import { Card, CardContent, Divider, Typography } from "@mui/material";
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
    <div className="main">
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
      <Card className="card">
        <CardContent className={openModal ? "disabled-input" : ""}>
          <h1 className="card-header">オプション</h1>
          <Divider className="divider-20" />
          <FacultyOptions faculties={faculties} setFaculties={setFaculties} />
          <Divider className="divider-20" />
          <SemesterOptions semesters={semesters} setSemesters={setSemesters} />
        </CardContent>
      </Card>
    </div>
  );
};
