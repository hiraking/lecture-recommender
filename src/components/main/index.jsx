import styles from "src/components/main/main.module.css";
import { Center } from "src/components/center";
import { Grid } from "src/components/grid";
import { Headline } from "src/components/headline";
export function Main(props) {
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
