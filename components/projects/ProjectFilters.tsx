import { Button } from "@/components/ui/Button";
import {
  projectFieldOptions,
  projectParticipationOptions,
  projectTerritoryOptions,
} from "@/content/projects";
import type { ProjectFilters as ProjectFilterState } from "@/lib/project-filters";
import styles from "./ProjectFilters.module.css";

type Props = {
  filters: ProjectFilterState;
  onChange: (filters: ProjectFilterState) => void;
  onClear: () => void;
};

export function ProjectFilters({ filters, onChange, onClear }: Props) {
  return (
    <div className={styles.desktopFilters}>
      <label className={styles.search}>
        <span className={styles.visuallyHidden}>Buscar proyecto</span>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={filters.search}
          placeholder="Buscar proyecto…"
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value })
          }
        />
      </label>
      <label>
        <span className={styles.visuallyHidden}>Campo estratégico</span>
        <select
          value={filters.field}
          onChange={(event) =>
            onChange({
              ...filters,
              field: event.target.value as ProjectFilterState["field"],
            })
          }
        >
          <option value="">Campo estratégico</option>
          {projectFieldOptions.map((field) => (
            <option value={field} key={field}>
              {field}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={styles.visuallyHidden}>Territorio</span>
        <select
          value={filters.territory}
          onChange={(event) =>
            onChange({
              ...filters,
              territory: event.target.value as ProjectFilterState["territory"],
            })
          }
        >
          <option value="">Territorio</option>
          {projectTerritoryOptions.map((territory) => (
            <option value={territory} key={territory}>
              {territory}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={styles.visuallyHidden}>Participación</span>
        <select
          value={filters.participation}
          onChange={(event) =>
            onChange({
              ...filters,
              participation:
                event.target.value as ProjectFilterState["participation"],
            })
          }
        >
          <option value="">Participación</option>
          {projectParticipationOptions.map((participation) => (
            <option value={participation} key={participation}>
              {participation}
            </option>
          ))}
        </select>
      </label>
      <Button variant="secondary" onClick={onClear}>
        Limpiar
      </Button>
    </div>
  );
}
