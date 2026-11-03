"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Breadcrumb } from "@/components/projects/Breadcrumb";
import { ProjectFilterMobile } from "@/components/projects/ProjectFilterMobile";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { projectExperiences } from "@/content/projects";
import {
  clearProjectFilters,
  filterProjects,
  type ProjectFilters as ProjectFilterState,
} from "@/lib/project-filters";
import styles from "./ProjectsPage.module.css";

const participationModes = [
  ["01", "Liderazgo directo", "Planeación y ejecución integral."],
  ["02", "Alianzas", "Capacidades complementarias."],
  ["03", "Consorcios", "Participación coordinada."],
  ["04", "Interventoría", "Seguimiento integral."],
  ["05", "Consultoría", "Estudios, diseños y decisiones."],
] as const;

function countFilters(filters: ProjectFilterState) {
  return [filters.field, filters.territory, filters.participation].filter(
    Boolean,
  ).length;
}

export function ProjectsPage() {
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [filters, setFilters] = useState<ProjectFilterState>(() =>
    clearProjectFilters(),
  );
  const [draft, setDraft] = useState<ProjectFilterState>(() =>
    clearProjectFilters(),
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const filteredProjects = useMemo(
    () => filterProjects(projectExperiences, filters),
    [filters],
  );
  const activeCount = countFilters(filters);
  const draftCount = countFilters(draft);
  const activeChips = [
    filters.field
      ? { key: "field", label: filters.field }
      : null,
    filters.territory
      ? { key: "territory", label: filters.territory }
      : null,
    filters.participation
      ? { key: "participation", label: filters.participation }
      : null,
  ].filter(Boolean) as { key: keyof ProjectFilterState; label: string }[];

  function clearFilters() {
    const cleared = clearProjectFilters();
    setFilters(cleared);
    setDraft({ ...cleared });
    setShowAllMobile(false);
  }

  function removeFilter(key: keyof ProjectFilterState) {
    const next = { ...filters, [key]: "" };
    setFilters(next);
    setDraft({ ...next });
    setShowAllMobile(false);
  }

  function openFilters() {
    setDraft({ ...filters });
    setIsFilterOpen(true);
  }

  function closeFilters() {
    setIsFilterOpen(false);
    window.requestAnimationFrame(() => filterButtonRef.current?.focus());
  }

  function applyMobileFilters() {
    setFilters({ ...draft });
    setShowAllMobile(false);
    closeFilters();
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="proyectos-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Proyectos" },
              ]}
            />
            <p className={styles.kicker}>Experiencia que se convierte en acción</p>
            <h1 id="proyectos-title">
              Proyectos que convierten experiencia en transformación
            </h1>
            <p>
              Explora iniciativas ambientales, sociales, técnicas y de
              infraestructura desarrolladas desde distintos campos de acción.
            </p>
          </div>
          <aside className={styles.heroMetric} aria-label="Trayectoria documentada">
            <p>Trayectoria documentada</p>
            <strong>197</strong>
            <span>Proyectos ejecutados</span>
          </aside>
        </div>
      </section>

      <section className={styles.exploration} aria-labelledby="exploration-title">
        <div className={styles.explorationInner}>
          <div className={styles.explorationHeading}>
            <h2 id="exploration-title">
              Encuentra experiencias por campo, territorio o participación
            </h2>
            <p aria-live="polite">
              {filteredProjects.length} resultados editoriales
            </p>
          </div>

          <ProjectFilters
            filters={filters}
            onChange={(next) => {
              setFilters(next);
              setDraft({ ...next });
              setShowAllMobile(false);
            }}
            onClear={clearFilters}
          />

          <label className={styles.mobileSearch}>
            <span className={styles.srOnly}>Buscar proyecto</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Buscar proyecto…"
              value={filters.search}
              onChange={(event) => {
                const next = { ...filters, search: event.target.value };
                setFilters(next);
                setDraft({ ...next });
                setShowAllMobile(false);
              }}
            />
          </label>
          <button
            className={styles.mobileFilterButton}
            ref={filterButtonRef}
            type="button"
            onClick={openFilters}
          >
            <span>☷&nbsp; Filtrar proyectos</span>
            <span className={styles.filterCount}>{activeCount}</span>
          </button>

          <div className={styles.viewToggle} aria-label="Vista de proyectos">
            <span aria-current="true">▦&nbsp; Cuadrícula</span>
            <Link href="#mapa-proyectos">⌖&nbsp; Mapa</Link>
          </div>

          <div className={styles.summaryRow}>
            <p>{filteredProjects.length} experiencias</p>
            <button type="button" onClick={clearFilters} disabled={!filters.search && !activeCount}>
              Limpiar filtros
            </button>
          </div>

          {activeChips.length ? (
            <div className={styles.chips} aria-label="Filtros activos">
              {activeChips.map((chip) => (
                <button type="button" key={chip.key} onClick={() => removeFilter(chip.key)}>
                  {chip.label} <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          ) : null}
          <p className={styles.filterNote}>
            Tipos de participación propuestos: Ejecución · Interventoría ·
            Consultoría · Alianza o consorcio
          </p>
        </div>
      </section>

      <section className={styles.listing} aria-labelledby="listing-title">
        <div className={styles.listingInner}>
          <div className={styles.listingHeading}>
            <div>
              <p className={styles.kicker}>Proyectos documentados</p>
              <h2 id="listing-title">
                Una trayectoria construida desde distintos campos
              </h2>
              <p className={styles.mobileIntro}>
                Seis experiencias visibles para una exploración móvil clara y
                progresiva.
              </p>
            </div>
          </div>

          <ProjectGrid projects={filteredProjects} showAll={showAllMobile} />

          <div className={styles.mobileLoad}>
            <p>
              Mostrando {Math.min(showAllMobile ? 9 : 6, filteredProjects.length)} de 197 proyectos
            </p>
            {filteredProjects.length > 6 && !showAllMobile ? (
              <Button variant="secondary" onClick={() => setShowAllMobile(true)}>
                Cargar más proyectos
              </Button>
            ) : null}
          </div>

          <div className={styles.pagination} aria-label="Paginación de proyectos">
            <p>Mostrando {filteredProjects.length} de 197 proyectos</p>
            <div>
              <button type="button" disabled>Anterior</button>
              <span aria-current="page">1</span>
              <button type="button" disabled>Siguiente</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.territory} id="mapa-proyectos" aria-labelledby="territory-title">
        <div className={styles.territoryInner}>
          <div className={styles.territoryHeading}>
            <div>
              <p className={styles.kicker}>Experiencia territorial</p>
              <h2 id="territory-title">Explora nuestra experiencia en el territorio</h2>
            </div>
            <p>
              Cali como origen institucional y Valle del Cauca como principal
              territorio documentado.
            </p>
          </div>
          <div className={styles.mapLayout}>
            <div className={styles.map}>
              <span>Valle del Cauca<small>Área general documentada</small></span>
              <Image
                src="/assets/icons/territory-map.svg"
                alt="Esquema territorial general de Cali y Valle del Cauca"
                width={360}
                height={230}
              />
              <p>● Cali — origen institucional</p>
            </div>
            <aside className={styles.mapPanel}>
              <p className={styles.kickerLight}>Vista mapa</p>
              <h3>Proyectos en el territorio</h3>
              <p>
                La vista reúne el origen institucional en Cali y la experiencia
                territorial general en el Valle del Cauca.
              </p>
              <ul>
                <li>● Cali — origen institucional</li>
                <li>◌ Valle del Cauca — área general</li>
              </ul>
              <small>La vista no atribuye ubicaciones específicas a proyectos.</small>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.participation} aria-labelledby="participation-title">
        <div className={styles.participationInner}>
          <div className={styles.participationCopy}>
            <p className={styles.kicker}>Formas de participación</p>
            <h2 id="participation-title">Distintas formas de construir impacto</h2>
            <p>
              La experiencia institucional combina liderazgo, colaboración y
              acompañamiento técnico según cada proyecto.
            </p>
          </div>
          <ol className={styles.participationModes}>
            {participationModes.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="projects-cta-title">
        <div className={styles.ctaCopy}>
          <p className={styles.kickerLight}>Construyamos una solución</p>
          <h2 id="projects-cta-title">
            ¿Tienes un proyecto que necesita experiencia técnica y territorial?
          </h2>
          <p>
            Conversemos sobre el reto, el territorio y las capacidades necesarias
            para construir una solución sostenible.
          </p>
          <div className={styles.ctaActions}>
            <Button href="/contacto">Presentar un proyecto</Button>
            <Button href="/contacto" variant="secondary" className={styles.ctaSecondary}>
              Contactar a la Fundación
            </Button>
          </div>
        </div>
        <div className={styles.ctaImage}>
          <Image
            src="/assets/images/proyectos-cta.jpg"
            alt="Facilitadora exponiendo durante una formación ambiental"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
      </section>

      {isFilterOpen ? (
        <ProjectFilterMobile
          draft={draft}
          activeCount={draftCount}
          onChange={setDraft}
          onApply={applyMobileFilters}
          onClear={() => setDraft(clearProjectFilters())}
          onClose={closeFilters}
        />
      ) : null}
    </div>
  );
}
