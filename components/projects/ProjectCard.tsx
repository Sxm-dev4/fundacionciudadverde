import Image from "next/image";
import Link from "next/link";
import type { ProjectExperience } from "@/content/projects";
import styles from "./ProjectCard.module.css";

export function ProjectCard({
  project,
  compact = false,
}: {
  project: ProjectExperience;
  compact?: boolean;
}) {
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 45vw, 384px"
        />
      </div>
      <div className={styles.content}>
        <p className={styles.field}>{project.field}</p>
        <h3>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <p className={styles.meta}>
          {project.participation}
          {project.territory ? (
            <>
              {" "}<span aria-hidden="true">•</span>{" "}{project.territory}
            </>
          ) : null}
        </p>
        {project.slug ? (
          <Link
            className={styles.action}
            href={`/proyectos/${project.slug}`}
            aria-label={`Ver proyecto: ${project.title}`}
          >
            Ver proyecto <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
