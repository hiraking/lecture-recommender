import { useCallback, useState } from "react";
import axios from "axios";

const FACULTIES = [
  { name: "全学部", id: 0 },
  { name: "法学部", id: 1 },
  { name: "医学部", id: 2 },
  { name: "文学部", id: 3 },
  { name: "理学部", id: 4 },
  { name: "農学部", id: 5 },
  { name: "経済学部", id: 6 },
  { name: "教養学部", id: 7 },
  { name: "教育学部", id: 8 },
  { name: "薬学部", id: 9 },
  { name: "工学部", id: 10 },
];

export const Search = (props) => {
  const [facId, setFacId] = useState(0);
  const [query, setQuery] = useState("");
  const searchLecture = useCallback(() => {
    axios
      .post(props.URL + "/search", {
        query: query,
        faculty_id: facId,
        page: props.currentPage,
      })
      .then((res) => {
        console.log(res.data);
        props.setSearchResult(res.data.lectures);
        props.setHits(res.data.hits);
        setQuery("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query, facId, props]);

  const handleChange = useCallback((e) => {
    if (e.target.value.length > 5) {
      alert("too many characters!");
    }
    setQuery(e.target.value.trim());
  }, []);

  const selectFacId = useCallback((e) => {
    setFacId(e.target.value);
  }, []);

  return (
    <div>
      <select onChange={selectFacId}>
        {FACULTIES.map((fac) => {
          return (
            <option key={fac.id} value={fac.id}>
              {fac.name}
            </option>
          );
        })}
      </select>
      <input type="text" value={query} onChange={handleChange} />
      <button onClick={searchLecture}>検索</button>
    </div>
  );
};
