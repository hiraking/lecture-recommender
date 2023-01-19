import { Button, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useCallback, useEffect, useRef } from "react";
import { MyPagination } from "src/components/pagination";
import { Search } from "src/components/search";
import { SearchedLecture } from "src/components/lectureSummary";
import { useSearch } from "src/hooks/useSearch";
import { Spinner } from "src/utils/common";

export const SearchModal = memo((props) => {
  const { openModal, setOpenModal } = props;
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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    maxWidth: "800px",
    background: "#f5dfbc",
    border: "0",
    boxShadow: 24,
    color: "#17214d",
    height: "80%",
    overflowY: "auto",
  };

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Fade in={openModal}>
        <Box sx={modalStyle}>
          <Box sx={{ position: "relative", minHeight: "100%" }}>
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
              <>
                {lectures.map((lecture) => {
                  return (
                    <SearchedLecture
                      key={lecture.id}
                      lecture={lecture}
                      page={page}
                    />
                  );
                })}
                <MyPagination
                  page={page}
                  hits={hits}
                  handlePageChange={fetcherPagination}
                />
              </>
            ) : null}
            <Button
              onClick={handleClose}
              sx={{ position: "absolute", bottom: "10px", right: "40px" }}
            >
              CLOSE
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
});
SearchModal.displayName = "SearchModal";
