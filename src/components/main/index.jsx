import styles from "src/components/main/main.module.css";
import { Center } from "src/components/center";
import { Grid } from "src/components/grid";
import { Headline } from "src/components/headline";
import { useCallback, useState } from "react";

const ITEMS = [
  {
    href: "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "Documents",
    description: "Find in-depth information about Next.js features and API.",
  },
  {
    href: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "Learn",
    description: "Learn about Next.js in an interactive course with quizzes!",
  },
  {
    href: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "Templates",
    description: "Discover and deploy boilerplate example Next.js projects.",
  },
  {
    href: "https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
    title: "Deploy",
    description:
      "Instantly deploy your Next.js site to a shareable URL with Vercel.",
  },
];

export function Main(props) {
  const [items, setItems] = useState(ITEMS);
  const handleRedule = useCallback(() => {
    setItems((prevItems) => {
      return prevItems.slice(0, prevItems.length - 1);
    });
  }, []);

  return (
    <main className={styles.main}>
      <Headline page={props.page} handleRedule={handleRedule}>
        code={<code className={styles.code}>pages/{props.page}.js</code>}
        {items.length}
      </Headline>
      <Center />
      <Grid items={items} handleRedule={handleRedule} />
    </main>
  );
}
