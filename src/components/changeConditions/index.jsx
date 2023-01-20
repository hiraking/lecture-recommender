import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SemesterForm } from "src/components/otherOptions";

export const ChangeConditions = (props) => {
  const {
    favorites,
    unfavorites,
    faculties,
    semesters,
    fetcherUpdate,
    setSemesters,
    semestersTemp,
    setSemestersTemp,
  } = props;

  const router = useRouter();

  const handleclick = useCallback(() => {
    setSemesters(semestersTemp);
    router.push({ pathname: "/result", query: { p: 1 } });
    fetcherUpdate(1);
  }, [fetcherUpdate, router, setSemesters, semestersTemp]);

  return (
    <div>
      <SemesterForm
        semesters={semestersTemp}
        setSemesters={setSemestersTemp}
        width="100%"
      />
      <Button variant="contained" onClick={handleclick}>
        この条件で検索
      </Button>
      {/* 学部を選択していない時などのエラー*/}
    </div>
  );
};
