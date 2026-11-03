import type {
  ProjectExperience,
  ProjectField,
  ProjectParticipation,
} from "@/content/projects";

export type ProjectFilters = {
  search: string;
  field: ProjectField | "";
  territory: "Valle del Cauca" | "";
  participation: ProjectParticipation | "";
};

export const EMPTY_PROJECT_FILTERS: ProjectFilters = {
  search: "",
  field: "",
  territory: "",
  participation: "",
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

export function filterProjects(
  projects: readonly ProjectExperience[],
  filters: ProjectFilters,
) {
  const search = normalize(filters.search.trim());

  return projects.filter((project) => {
    const searchable = normalize(
      `${project.title} ${project.field} ${project.description}`,
    );

    return (
      (!search || searchable.includes(search)) &&
      (!filters.field || project.field === filters.field) &&
      (!filters.territory || project.territory === filters.territory) &&
      (!filters.participation ||
        project.participation === filters.participation)
    );
  });
}

export function clearProjectFilters(): ProjectFilters {
  return { ...EMPTY_PROJECT_FILTERS };
}
