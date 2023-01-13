import { Pagination } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { contentsPerPage } from "src/utils/consts";

export const MyPagination = (props) => {
  const { page, hits, fetcher, setPage } = props;
  const [pageNum, setPageNum] = useState(0);
  useEffect(() => {
    setPageNum(Math.ceil(hits / contentsPerPage));
  }, [hits]);

  const handleChange = useCallback(
    (e, newPage) => {
      fetcher(newPage);
      setPage(newPage);
    },
    [fetcher, setPage]
  );

  return (
    <div>
      <Pagination count={pageNum} page={page} onChange={handleChange} />
    </div>
  );
};
