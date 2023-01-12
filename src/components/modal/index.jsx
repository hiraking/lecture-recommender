import Modal from "react-modal/lib/components/Modal";
import { MyPagination } from "src/components/pagenation";
import { Search } from "src/components/search";
import { SearchResult } from "src/components/searchresults";
import { useSearch } from "src/hooks/useSearch";

export const SearchModal = (props) => {
  const modal = props.modal;
  const search = useSearch();
  Modal.setAppElement("body");

  console.log(props.tastes.favorites, props.tastes.unfavorites);
  return (
    <Modal
      isOpen={modal.modalIsOpen}
      onAfterOpen={modal.afterOpenModal}
      onAfterClose={modal.afterCloseModal}
      onRequestClose={modal.closeModal}
      style={modal.modalStyles}
      contentLabel="Example Modal"
    >
      <Search search={search} />
      {search.lectures.length > 0 ? (
        <>
          <SearchResult
            lecture={search.lectures[0]}
            page={search.page}
            tastes={props.tastes}
          />
          <SearchResult
            lecture={search.lectures[1]}
            page={search.page}
            tastes={props.tastes}
          />
          <SearchResult
            lecture={search.lectures[2]}
            page={search.page}
            tastes={props.tastes}
          />
          <MyPagination
            page={search.page}
            setPage={search.setPage}
            hits={search.hits}
            fetcher={search.fetcher}
          />
        </>
      ) : null}
      <button onClick={modal.closeModal}>close</button>
    </Modal>
  );
};
