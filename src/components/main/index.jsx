import styles from "src/components/main/main.module.css";
import { Center } from "src/components/center";
import { Grid } from "src/components/grid";
import { Headline } from "src/components/headline";
import { useEffect } from "react";

export function Main(props) {
  useEffect(() => {
    console.log("mount");
    document.body.style.backgroundColor = "lightblue";
    return () => {
      console.log("unmount");
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <main className={styles.main}>
      <Headline page={props.page}>
        code={<code className={styles.code}>pages/{props.page}.js</code>}
      </Headline>
      <Center />
      <Grid />
    </main>
  );
}
