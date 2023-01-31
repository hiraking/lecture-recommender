import Head from "next/head";
import { Main } from "src/components/main";

const Home = (props) => {
  return (
    <>
      <Head>
        <title>講義おすすめ検索</title>
      </Head>
      <Main tastes={props.tastes} />
    </>
  );
};

export default Home;
