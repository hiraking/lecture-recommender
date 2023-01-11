import { useCallback, useState } from "react";
import { FACULTIES, URL } from "src/utils/consts";

export const Search = (props) => {
  const search = props.search;

  const handleQueryChange = useCallback(
    (e) => search.setQuery(e.target.value.trim()),
    [search]
  );

  const handleFaculty = useCallback(
    (e) => search.setFaculty(e.target.value),
    [search]
  );

  const executeSearch = useCallback(() => {
    search.fetcher(1);
    search.setPage(1);
  }, [search]);

  return (
    <div>
      <select onChange={handleFaculty}>
        {FACULTIES.map((fac) => {
          return (
            <option key={fac.id} value={fac.id}>
              {fac.name}
            </option>
          );
        })}
      </select>
      <input type="text" value={search.query} onChange={handleQueryChange} />
      <button onClick={executeSearch}>検索</button>
    </div>
  );
};
