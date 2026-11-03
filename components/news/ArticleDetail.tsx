import Image from "next/image";
import { Breadcrumb } from "@/components/projects/Breadcrumb";
import { Button } from "@/components/ui/Button";
import type { NewsArticle } from "@/content/news";
import styles from "./ArticleDetail.module.css";

export function ArticleDetail({ article }: { article: NewsArticle }) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Actualidad", href: "/actualidad" },
              { label: "Artículo" },
            ]}
          />
          <p className={styles.kicker}>Actualidad</p>
          <h1>{article.title}</h1>
          <p className={styles.introduction}>{article.introduction}</p>
        </div>
      </header>

      <div className={styles.heroInner}>
        <div className={styles.heroImage}>
          <Image
            src={article.hero.image}
            alt={article.hero.alt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 75rem"
          />
        </div>
      </div>

      <section className={styles.body} aria-label="Contenido del artículo">
        <div className={styles.readingColumn}>
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <aside className={styles.evidence} aria-labelledby="registro-title">
            <p className={styles.kickerLight}>Registro del material</p>
            <h2 id="registro-title">{article.evidence.title}</h2>
          </aside>

          <p>{article.evidence.description}</p>
        </div>
      </section>

      <section className={styles.gallery} aria-labelledby="galeria-title">
        <div className={styles.galleryInner}>
          <div className={styles.galleryHeading}>
            <p className={styles.kicker}>Galería</p>
            <h2 id="galeria-title">Momentos de la actividad</h2>
          </div>
          <div className={styles.galleryGrid}>
            {article.gallery.map((image) => (
              <div className={styles.galleryImage} key={image.image}>
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className={styles.related} aria-labelledby="relacionados-title">
        <div className={styles.relatedInner}>
          <p className={styles.kickerLight}>Contenidos relacionados</p>
          <h2 id="relacionados-title">Sigue explorando</h2>
          <Button href="/actualidad">Ver más contenidos en Actualidad</Button>
        </div>
      </aside>
    </article>
  );
}
