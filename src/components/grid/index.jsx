import styles from "src/components/grid/grid.module.css";

export const Grid = (props) => {
  return (
    <div className={styles.grid}>
      <button onClick={props.handleRedule}>reduce</button>
      {props.items.map((item) => {
        return (
          <a
            key={item.href}
            href={item.href}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              {item.title} <span>-&gt;</span>
            </h2>
            <p>{item.description}</p>
          </a>
        );
      })}
    </div>
  );
};
