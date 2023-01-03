import styles from "src/components/grid/grid.module.css";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function Grid({ items, handleRedule }) {
  return (
    <div className={styles.grid}>
      <button onClick={handleRedule}>reduce</button>
      {items.map((item) => {
        return (
          <a
            key={item.href}
            href={item.href}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {item.title} <span>-&gt;</span>
            </h2>
            <p className={inter.className}>{item.description}</p>
          </a>
        );
      })}
    </div>
  );
}
