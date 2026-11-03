import type { ProjectExperience } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectGrid.module.css";

export function ProjectGrid({
  projects,
  showAll = false,
}: {
  projects: readonly ProjectExperience[];
  showAll?: boolean;
}) {
  if (projects.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <h3>No hay experiencias que coincidan con estos filtros</h3>
        <p>Prueba otra búsqueda o limpia los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${showAll ? styles.showAll : ""}`}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
