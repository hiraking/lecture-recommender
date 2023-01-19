import { Pagination } from "@mui/material";
import { memo, useCallback } from "react";
import { contentsPerPage } from "src/utils/consts";

export const MyPagination = memo((props) => {
  const { page, hits, handlePageChange } = props;

  const handleChange = useCallback(
    (_, newPage) => {
      handlePageChange(newPage);
    },
    [handlePageChange]
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
});
MyPagination.displayName = "MyPagination";
