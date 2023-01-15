import Head from "next/head";
import { Header } from "src/components/header";
import { useTastes } from "src/hooks/useTastes";
import { useEffect, useRef } from "react";
import { SearchModal } from "src/components/modal";
import { useModal } from "src/hooks/useModal";
import { Button } from "@mui/material";

const Test = () => {
  const modal = useModal();

  const ref = useRef(null);
  useEffect(() => {
    console.log(ref);
    console.log(ref.current);
  }, []);

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
        <Button variant="contained" onClick={() => modal.setIsOpen(true)}>
          OPEN
        </Button>
        <SearchModal modal={modal} tastes={useTastes()} />
      </div>
    </>
  );
};

export default Test;
