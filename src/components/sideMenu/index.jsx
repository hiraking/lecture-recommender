import { ChangeConditions } from "src/components/changeConditions";

export const SideMenu = (props) => {
  const {
    favorites,
    unfavorites,
    faculties,
    setFaculties,
    fetcherUpdate,
    semesters,
    setSemesters,
    semestersTemp,
    setSemestersTemp,
  } = props;
  return (
    <ChangeConditions
      favorites={favorites}
      unfavorites={unfavorites}
      faculties={faculties}
      setFaculties={setFaculties}
      fetcherUpdate={fetcherUpdate}
      semesters={semesters}
      setSemesters={setSemesters}
      semestersTemp={semestersTemp}
      setSemestersTemp={setSemestersTemp}
    />
  );
};
