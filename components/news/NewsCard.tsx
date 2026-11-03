import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/content/news";
import styles from "./NewsCard.module.css";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      </div>
      <div className={styles.copy}>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        {item.href ? (
          <Link href={item.href}>
            Leer contenido <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}

