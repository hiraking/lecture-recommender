import Head from "next/head";
import { Header } from "src/components/header";
import { useTastes } from "src/hooks/useTastes";
import { FacultyOptions, SemesterOptions } from "src/components/otherOptions";
import { Card, CardContent } from "@mui/material";

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
            <FacultyOptions tastes={tastes} />
            <SemesterOptions tastes={tastes} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Test;
