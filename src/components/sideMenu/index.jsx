import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FacultyForm, SemesterForm } from "src/components/otherOptions";

export const SideMenu = (props) => {
  const {
    favorites,
    unfavorites,
    fetcherUpdate,
    faculties,
    setFaculties,
    facultiesTemp,
    setFacultiesTemp,
    semesters,
    setSemesters,
    semestersTemp,
    setSemestersTemp,
  } = props;

  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push({ pathname: "/result", query: { p: 1 } });
    fetcherUpdate(1);
  }, [fetcherUpdate, router]);

  return (
    <div>
      <Button variant="outlined" onClick={handleAddLecture}>
        追加
      </Button>
      <FacultyForm
        faculties={facultiesTemp}
        setFaculties={setFacultiesTemp}
        width="100%"
      />
      <SemesterForm
        semesters={semestersTemp}
        setSemesters={setSemestersTemp}
        width="100%"
      />
      <Button variant="contained" onClick={handleClick}>
        この条件で検索
      </Button>
      {/* 学部を選択していない時などのエラー*/}
    </div>
  );
};
