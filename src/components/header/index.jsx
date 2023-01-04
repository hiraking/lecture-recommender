import Link from "next/link";
import styles from "src/components/header/header.module.css";

const NAV_ITEMS = [
  { href: "/", label: "Index" },
  { href: "/about", label: "About" },
  { href: "/test", label: "Test" },
];
export const Header = () => {
  return (
    <header className={styles.header}>
      {NAV_ITEMS.map((item) => {
        return (
          <Link key={item.label} href={item.href} className={styles.anchor}>
            {item.label}
          </Link>
        );
      })}
    </header>
  );
};
