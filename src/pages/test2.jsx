import Head from "next/head";
import { Header } from "src/components/header";
import { useTastes } from "src/hooks/useTastes";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchModal } from "src/components/modal";
import { useModal } from "src/hooks/useModal";
import { Button, Fade, Modal, TextField } from "@mui/material";
import { FacultyOptions } from "src/components/otherOptions";
import { SearchResult } from "src/components/searchresults";
import { useSearch } from "src/hooks/useSearch";
import { Search } from "src/components/search";
import { Box } from "@mui/system";

const Test = () => {
  const tastes = useTastes();
  const search = useSearch();
  const [open, setOpen] = useState(false);
  const modal = useModal();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const style = {
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
    <>
      <Head>
        <title>Experiment page</title>
      </Head>
      <Header />
      <div
        style={{
          height: "950px",
          textAlign: "center",
          width: "60%",
          margin: "0 auto",
        }}
      >
        <Button onClick={handleOpen} variant="contained">
          OPEN
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Search
              setIsLoading={search.setIsLoading}
              setPage={search.setPage}
              setLectures={search.setLectures}
              setQueryCache={search.setQueryCache}
              faculty={search.faculty}
              setFaculty={search.setFaculty}
              setHits={search.setHits}
            />
            <Button onClick={() => setOpen(false)}>CLOSE</Button>
            {search.lectures.length > 0
              ? search.lectures.map((lecture) => {
                  return (
                    <SearchResult
                      key={lecture.id}
                      lecture={lecture}
                      page={search.page}
                    />
                  );
                })
              : null}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Test;
