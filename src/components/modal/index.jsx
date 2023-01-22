import { Button, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useCallback, useEffect, useRef } from "react";
import { MyPagination } from "src/components/pagination";
import { Search } from "src/components/search";
import { SearchedLecture } from "src/components/lectureSummary";
import { useSearch } from "src/hooks/useSearch";
import { Spinner } from "src/utils/common";

export const SearchModal = memo((props) => {
  const { openModal, setOpenModal, temp } = props;
  const {
    lectures,
    setLectures,
    page,
    setPage,
    faculty,
    setFaculty,
    hits,
    setHits,
    isLoading,
    setIsLoading,
    setQueryCache,
    fetcherPagination,
  } = useSearch();

  const topRef = useRef(null);

  useEffect(() => {
    if (topRef && topRef.current) {
      topRef.current.scrollIntoView(false, {
        behavior: "smooth",
        block: "start",
      });
    }
  }, [page]);

  const handleClose = useCallback(() => {
    setOpenModal(false);
    setQueryCache("");
    setFaculty(0);
    setPage(1);
    setHits(0);
    setLectures([]);
  }, [setOpenModal, setQueryCache, setFaculty, setPage, setHits, setLectures]);

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Fade in={openModal}>
        <div className="modal">
          <div className="modal-wrapper">
            <div ref={topRef} style={{ display: "none" }}></div>

            <Search
              setIsLoading={setIsLoading}
              setPage={setPage}
              setLectures={setLectures}
              setQueryCache={setQueryCache}
              faculty={faculty}
              setFaculty={setFaculty}
              setHits={setHits}
            />

            {isLoading ? (
              <Spinner />
            ) : lectures.length > 0 ? (
              <div className="search-result">
                {lectures.map((lecture) => {
                  return (
                    <SearchedLecture
                      key={lecture.id}
                      lecture={lecture}
                      page={page}
                      temp={temp}
                    />
                  );
                })}
                <MyPagination
                  page={page}
                  hits={hits}
                  handlePageChange={fetcherPagination}
                />
              </div>
            ) : null}
            <Button
              variant="outlined"
              onClick={handleClose}
              className="modal-close-btn"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
});
SearchModal.displayName = "SearchModal";
