import { Alert, Button, CircularProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { MyPagination } from "src/components/pagination";
import { Search } from "src/components/search";
import { SearchResult } from "src/components/searchresults";
import { useSearch } from "src/hooks/useSearch";
import { useTastes } from "src/hooks/useTastes";

const Spinner = memo(() => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
    >
      <CircularProgress />
    </Box>
  );
});
Spinner.displayName = "Spinner";

export const SearchModal = memo((props) => {
  const { openModal, setOpenModal } = props;
  const {
    lectures,
    setLectures,
    page,
    setPage,
    faculty,
    setFaculty,
    // query,
    setQuery,
    hits,
    setHits,
    // noHit,
    isLoading,
    setIsLoading,
    queryCache,
    setQueryCache,
    // fetcherButton,
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
                  <SearchResult
                    key={lecture.id}
                    lecture={lecture}
                    page={page}
                    tastes={props.tastes}
                  />
                );
              })}
              <MyPagination
                page={page}
                hits={hits}
                fetcherPagination={fetcherPagination}
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
    </Modal>
  );
});
SearchModal.displayName = "SearchModal";
