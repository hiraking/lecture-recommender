import { useCallback, useMemo, useState } from "react";
import { backfaceFixed } from "src/utils/backfaceFixed";

export const useModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalStyles = useMemo(() => {
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
        color: "#17214d",
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
      },
    };
  }, []);

  const afterOpenModal = useCallback(() => {
    backfaceFixed(true);
  }, []);

  const afterCloseModal = useCallback(() => {
    backfaceFixed(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    modalIsOpen,
    setIsOpen,
    modalStyles,
    afterOpenModal,
    afterCloseModal,
    openModal,
    closeModal,
  };
};
