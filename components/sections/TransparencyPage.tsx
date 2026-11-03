import { Breadcrumb } from "@/components/projects/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { transparencyCategories, transparencyView } from "@/content/transparency";
import styles from "./TransparencyPage.module.css";

const consultationStates = [
  "Documento disponible",
  "Sin documentos",
  "Filtro aplicado",
] as const;

export function TransparencyPage() {
  const view = transparencyView;

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="transparencia-title">
        <div className={styles.narrowContainer}>
          <Breadcrumb
            items={[{ label: "Inicio", href: "/" }, { label: "Transparencia" }]}
          />
          <p className={styles.kickerLight}>Información institucional</p>
          <h1 id="transparencia-title">Transparencia</h1>
          <p className={styles.heroIntroduction}>
            Accede a la información institucional disponible y solicita aquella
            que aún no está publicada.
          </p>
        </div>
      </section>

      <section className={styles.categories} aria-labelledby="categorias-title">
        <div className={styles.wideContainer}>
          <p className={styles.kicker}>Categorías</p>
          <h2 id="categorias-title">Consulta por tipo de información</h2>
          <ul className={styles.categoryList}>
            {transparencyCategories.map((category) => (
              <li key={category.id}>
                <h3>{category.label}</h3>
                <p>Sin documentos confirmados</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.filters} aria-labelledby="filtros-title">
        <div className={styles.narrowContainer}>
          <fieldset
            className={styles.filterFieldset}
            disabled={view.controlsDisabled}
            aria-describedby="filtros-disponibilidad"
          >
            <legend className={styles.kicker} id="filtros-title">
              Buscador y filtros
            </legend>
            <p className="sr-only" id="filtros-disponibilidad">
              Los controles están deshabilitados porque no hay documentos
              confirmados para consultar.
            </p>
            <div className={styles.filterControls}>
              <label>
                <span className="sr-only">Buscar documento</span>
                <input
                  type="search"
                  name="documento"
                  placeholder="Buscar documento"
                />
              </label>
              <label>
                <span className="sr-only">Categoría del documento</span>
                <select name="categoria" defaultValue="">
                  <option value="">Todas las categorías</option>
                  {transparencyCategories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="sr-only">Año del documento</span>
                <select name="anio" defaultValue="">
                  <option value="">Todos los años</option>
                </select>
              </label>
            </div>
          </fieldset>

          <div className={styles.stateLegend} aria-label="Estados del listado">
            {consultationStates.map((state) => {
              const isCurrent = state === view.status;

              return (
                <span
                  className={isCurrent ? styles.currentState : undefined}
                  aria-current={isCurrent ? "true" : undefined}
                  aria-disabled={isCurrent ? undefined : "true"}
                  key={state}
                >
                  {state}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.documents} aria-labelledby="documentos-title">
        <div className={styles.narrowContainer}>
          <h2 id="documentos-title">Documentos institucionales</h2>
          <div className={styles.documentTable}>
            <table>
              <caption className="sr-only">
                Documentos institucionales disponibles
              </caption>
              <thead>
                <tr>
                  <th scope="col">Documento</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <div
                      className={styles.emptyState}
                      role="status"
                      aria-live="polite"
                    >
                      <p className={styles.emptyLabel}>{view.status}</p>
                      <h3>{view.emptyTitle}</h3>
                      <p>{view.emptyDescription}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <aside className={styles.request} aria-labelledby="solicitud-title">
        <div className={styles.narrowContainer}>
          <div>
            <p className={styles.kickerLight}>Solicitud de información</p>
            <h2 id="solicitud-title">
              ¿No encuentras la información que buscas?
            </h2>
          </div>
          <Button className={styles.requestButton} href="/contacto">
            Solicitar información
          </Button>
        </div>
      </aside>
    </div>
  );
}
