import { Pagination } from "@mui/material";
import { useCallback } from "react";
import { contentsPerPage } from "src/utils/consts";

export const MyPagination = (props) => {
  const { page, hits, fetcherPagination } = props;

  const handleChange = useCallback(
    (_, newPage) => {
      fetcherPagination(newPage);
    },
    [fetcherPagination]
  );

  return (
    <div>
      <Pagination
        count={Math.ceil(hits / contentsPerPage)}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};
