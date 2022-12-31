import styles from "./main.module.css";
import { Center } from "./center";
import { Grid } from "./grid";
import { Headline } from "./headline";

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
