import { useCallback } from "react";
import { contentsPerPage } from "src/utils/consts";

export const Pagenation = (props) => {
  const goPrevPage = useCallback(() => {
    props.fetcher(props.page - 1);
    props.setPage((prev) => prev - 1);
  }, [props]);

  const goNextPage = useCallback(() => {
    props.fetcher(props.page + 1);
    props.setPage((prev) => prev + 1);
  }, [props]);

  const lastPage = Math.ceil(props.hits / contentsPerPage);

  return (
    <div>
      {props.page > 1 ? <a onClick={goPrevPage}>前</a> : null}
      {props.hits > 0 ? props.page : null}
      {props.page < lastPage ? <a onClick={goNextPage}>次</a> : null}
    </div>
  );
};
