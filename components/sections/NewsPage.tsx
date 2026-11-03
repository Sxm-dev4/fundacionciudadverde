import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/projects/Breadcrumb";
import { NewsCard } from "@/components/news/NewsCard";
import { Button } from "@/components/ui/Button";
import type { NewsItem } from "@/content/news";
import styles from "./NewsPage.module.css";

type NewsPageProps = {
  featured: NewsItem;
  items: readonly NewsItem[];
  query: string;
};

export function NewsPage({ featured, items, query }: NewsPageProps) {
  const isSearching = Boolean(query.trim());

  return (
    <div className={styles.page}>
      <section className={styles.editorialHeader} aria-labelledby="actualidad-title">
        <div className={styles.container}>
          <Breadcrumb
            items={[{ label: "Inicio", href: "/" }, { label: "Actualidad" }]}
          />
          <p className={styles.kicker}>Actualidad y conocimiento</p>
          <h1 id="actualidad-title">
            Historias, aprendizajes y conocimiento para transformar
          </h1>
          <p>
            Compartimos experiencias, herramientas y reflexiones que nacen del
            trabajo con comunidades, instituciones y territorios.
          </p>
        </div>
      </section>

      {!isSearching ? (
        <section className={styles.featured} aria-labelledby="destacado-title">
          <div className={styles.container}>
            <p className={styles.kicker}>Historia destacada</p>
            <article className={styles.featuredCard}>
              <div className={styles.featuredImage}>
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 57vw"
                />
              </div>
              <div className={styles.featuredCopy}>
                <p className={styles.kicker}>Actualidad</p>
                <h2 id="destacado-title">{featured.title}</h2>
                <p>{featured.summary}</p>
                {featured.href ? (
                  <Button href={featured.href} variant="text">
                    Leer contenido <span aria-hidden="true">→</span>
                  </Button>
                ) : null}
              </div>
            </article>
          </div>
        </section>
      ) : null}

      <section className={styles.explore} aria-labelledby="registros-title">
        <div className={styles.container}>
          <form className={styles.search} action="/actualidad" role="search">
            <label htmlFor="actualidad-busqueda">Buscar en Actualidad</label>
            <div>
              <input
                id="actualidad-busqueda"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Buscar registros o actividades"
              />
              <Button type="submit">Buscar</Button>
            </div>
            {isSearching ? (
              <Link href="/actualidad">Limpiar búsqueda</Link>
            ) : null}
          </form>

          <div className={styles.listingHeading}>
            <div>
              <p className={styles.kicker}>Registros recientes</p>
              <h2 id="registros-title">
                {isSearching ? "Resultados de búsqueda" : "Ideas que nacen del territorio"}
              </h2>
            </div>
            <p aria-live="polite">{items.length} contenidos</p>
          </div>

          {items.length ? (
            <div className={styles.grid}>
              {items.map((item) => (
                <NewsCard item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No se encontraron contenidos con esa búsqueda.</p>
              <Button href="/actualidad" variant="secondary">
                Ver todos los contenidos
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.community} aria-labelledby="comunidad-title">
        <div className={styles.communityInner}>
          <div className={styles.communityCopy}>
            <p className={styles.kickerViolet}>Conocimiento en comunidad</p>
            <h2 id="comunidad-title">
              Conocimiento que se construye con las comunidades
            </h2>
            <p>
              La observación, la escucha y las experiencias compartidas hacen
              parte de los procesos de formación ambiental.
            </p>
            <Button href="/lineas-de-accion" variant="text">
              Conocer las líneas de acción <span aria-hidden="true">→</span>
            </Button>
          </div>
          <div className={styles.communityImage}>
            <Image
              src="/assets/images/actualidad-conocimiento-comunidad.jpg"
              alt="Facilitadora dialogando con un grupo durante una actividad ambiental"
              fill
              sizes="(max-width: 1023px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.newsletter} aria-labelledby="boletin-title">
        <div className={styles.newsletterInner}>
          <p className={styles.kickerLight}>Boletín FCV</p>
          <h2 id="boletin-title">Historias y aprendizajes de la Fundación</h2>
          <p>
            Este espacio reúne contenido institucional y conocimiento
            territorial.
          </p>
        </div>
      </section>

      <section className={styles.projectsCta} aria-labelledby="actualidad-proyectos-title">
        <div>
          <h2 id="actualidad-proyectos-title">
            Conoce las iniciativas detrás de nuestras historias
          </h2>
          <p>Explora el catálogo de experiencias de la Fundación.</p>
          <Button href="/proyectos">Explorar proyectos</Button>
        </div>
      </section>
    </div>
  );
}

