import Head from "next/head";
import { useCallback, useMemo, useState } from "react";
import { Header } from "src/components/header";
import { useModal } from "src/hooks/useModal";
import { useTastes } from "src/hooks/useTastes";
import { OtherOptions } from "src/components/otherOptions";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { FACULTIES, SEMESTERS } from "src/utils/consts";

const Test = () => {
  const tastes = useTastes();
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
        <Card>
          <CardContent>
            <OtherOptions
              stateArray={tastes.faculties}
              setStateArray={tastes.setFaculties}
              header="学部"
              itemList={FACULTIES}
            />
            <OtherOptions
              stateArray={tastes.semesters}
              setStateArray={tastes.setSemesters}
              header="開講区分"
              itemList={SEMESTERS}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Test;
