"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  projectFieldOptions,
  projectParticipationOptions,
  projectTerritoryOptions,
} from "@/content/projects";
import type { ProjectFilters } from "@/lib/project-filters";
import styles from "./ProjectFilterMobile.module.css";

type Props = {
  draft: ProjectFilters;
  activeCount: number;
  onChange: (draft: ProjectFilters) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
};

export function ProjectFilterMobile({
  draft,
  activeCount,
  onChange,
  onApply,
  onClear,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const selectedFilters = [
    draft.field ? { key: "field", label: draft.field } : null,
    draft.territory ? { key: "territory", label: draft.territory } : null,
    draft.participation
      ? { key: "participation", label: draft.participation }
      : null,
  ].filter(Boolean) as {
    key: "field" | "territory" | "participation";
    label: string;
  }[];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), select:not(:disabled), [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className={styles.layer}>
      <button
        className={styles.backdrop}
        type="button"
        aria-label="Cerrar filtros"
        onClick={onClose}
      />
      <div
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-dialog-title"
        onKeyDown={handleKeyDown}
      >
        <div className={styles.handle} aria-hidden="true" />
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <h2 id="filter-dialog-title">Filtrar proyectos</h2>
            <span>{activeCount} activos</span>
          </div>
          <button
            className={styles.close}
            ref={closeRef}
            type="button"
            aria-label="Cerrar filtros"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        {selectedFilters.length ? (
          <div className={styles.selectedFilters}>
            <p>Filtros seleccionados</p>
            <div>
              {selectedFilters.map((filter) => (
                <button
                  type="button"
                  key={filter.key}
                  onClick={() => onChange({ ...draft, [filter.key]: "" })}
                  aria-label={`Quitar filtro ${filter.label}`}
                >
                  {filter.label} <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className={styles.scrollArea}>
          <fieldset>
            <legend>Campo estratégico</legend>
            {projectFieldOptions.map((field) => (
              <label className={styles.option} key={field}>
                <input
                  type="radio"
                  name="campo-mobile"
                  checked={draft.field === field}
                  onChange={() => onChange({ ...draft, field })}
                />
                <span>{field}</span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Territorio</legend>
            <label className={styles.option}>
              <input
                type="radio"
                name="territorio-mobile"
                checked={!draft.territory}
                onChange={() => onChange({ ...draft, territory: "" })}
              />
              <span>Todos los territorios</span>
            </label>
            {projectTerritoryOptions.map((territory) => (
              <label className={styles.option} key={territory}>
                <input
                  type="radio"
                  name="territorio-mobile"
                  checked={draft.territory === territory}
                  onChange={() => onChange({ ...draft, territory })}
                />
                <span>{territory}</span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Tipo de participación</legend>
            <label className={styles.option}>
              <input
                type="radio"
                name="participacion-mobile"
                checked={!draft.participation}
                onChange={() => onChange({ ...draft, participation: "" })}
              />
              <span>Todas</span>
            </label>
            {projectParticipationOptions.map((participation) => (
              <label className={styles.option} key={participation}>
                <input
                  type="radio"
                  name="participacion-mobile"
                  checked={draft.participation === participation}
                  onChange={() => onChange({ ...draft, participation })}
                />
                <span>{participation}</span>
              </label>
            ))}
          </fieldset>
        </div>

        <footer className={styles.actions}>
          <Button variant="secondary" onClick={onClear}>
            Limpiar
          </Button>
          <Button onClick={onApply}>
            Aplicar filtros{activeCount ? ` (${activeCount})` : ""}
          </Button>
        </footer>
      </div>
    </div>
  );
}
