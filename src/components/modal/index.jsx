import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";
import Modal from "react-modal/lib/components/Modal";
import { MyPagination } from "src/components/pagination";
import { Search } from "src/components/search";
import { SearchResult } from "src/components/searchresults";
import { useSearch } from "src/hooks/useSearch";

export const SearchModal = (props) => {
  const modal = props.modal;
  const search = useSearch();
  Modal.setAppElement("body");

  const spinner = useMemo(() => {
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
  }, []);

  return (
    <Modal
      isOpen={modal.modalIsOpen}
      onAfterOpen={modal.afterOpenModal}
      onAfterClose={modal.afterCloseModal}
      onRequestClose={modal.closeModal}
      style={modal.modalStyles}
    >
      <Search search={search} />
      {search.isLoading ? (
        spinner
      ) : search.lectures.length > 0 ? (
        <>
          {search.lectures.map((lecture) => {
            return (
              <SearchResult
                key={lecture.id}
                lecture={lecture}
                page={search.page}
                tastes={props.tastes}
              />
            );
          })}
          <MyPagination
            page={search.page}
            hits={search.hits}
            fetcherPagination={search.fetcherPagination}
          />
        </>
      ) : null}
      <Button
        onClick={modal.closeModal}
        sx={{ position: "absolute", bottom: "10px", right: "40px" }}
      >
        CLOSE
      </Button>
    </Modal>
  );
};
