import { useCallback, useMemo, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Search } from "src/components/modal/search";

export const SearchModal = (props) => {
  Modal.setAppElement("body");
  const URL = "http://127.0.0.1:8000";
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hits, setHits] = useState(0);

  const customStyles = useMemo(() => {
    return {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "#f5dfbc",
        width: "80%",
        height: "80%",
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    };
  }, []);

  const afterOpenModal = useCallback(() => {}, []);

  const closeModal = useCallback(() => {
    props.setIsOpen(false);
  }, [props]);

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Search
        setSearchResult={setSearchResult}
        URL={URL}
        setHits={setHits}
        currentPage={currentPage}
      />
      {searchResult.length > 0 ? (
        <ul>
          {searchResult.map((item) => {
            return <li key={item["code1"]}>{item["title"]}</li>;
          })}
        </ul>
      ) : null}
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};
