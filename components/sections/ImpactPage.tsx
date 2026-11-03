import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  documentedFields,
  environmentalEvidence,
  environmentalAxes,
  impactMetrics,
  impactProcess,
} from "@/content/impact";
import styles from "./ImpactPage.module.css";

export function ImpactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.heroAndMetrics} aria-labelledby="impacto-title">
        <div className={styles.hero}>
          <Image
            className={styles.coverImage}
            src="/assets/images/impacto-hero-avistamiento.jpg"
            alt="Grupo observando las copas de los árboles durante una actividad ambiental"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Migas de pan">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Impacto</span>
            </nav>
            <p className={styles.kickerLight}>Impacto institucional</p>
            <h1 id="impacto-title">
              Impacto que se construye, se mide y se comparte
            </h1>
            <p className={styles.heroBody}>
              Integramos conocimiento técnico, gestión ambiental, participación
              y seguimiento institucional.
            </p>
            <div className={styles.heroActions}>
              <Button href="/proyectos">Explorar proyectos</Button>
              <Button
                className={styles.heroSecondary}
                href="/transparencia"
                variant="secondary"
              >
                Ver transparencia
              </Button>
            </div>
          </div>
        </div>

        <ul className={styles.metricsGrid} aria-label="Indicadores de impacto">
          {impactMetrics.map((metric) => (
            <li key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.introduction} aria-labelledby="impacto-alcance-title">
        <div className={styles.introductionInner}>
          <div className={styles.sectionCopy}>
            <p className={styles.kicker}>Alcance y capacidades</p>
            <h2 id="impacto-alcance-title">
              El impacto se expresa en el territorio y en las capacidades que
              permanecen
            </h2>
            <p>
              La experiencia de la Fundación combina conservación ambiental,
              formación, infraestructura, seguimiento, consultoría y
              participación territorial.
            </p>
          </div>
          <blockquote>
            <span aria-hidden="true">“</span>
            <p>
              La conservación y restauración ecosistémica aparece como eje
              transversal en la trayectoria documentada de la Fundación.
            </p>
          </blockquote>
        </div>
      </section>

      <div className={styles.dimensionTabs} aria-label="Dimensiones de impacto">
        <span aria-current="true">
          Ambiental
        </span>
        <span aria-disabled="true">
          Social
        </span>
        <span aria-disabled="true">
          Institucional
        </span>
      </div>

      <section className={styles.environmental} aria-labelledby="ambiental-title">
        <div className={styles.sectionInner}>
          <div className={styles.environmentalHeading}>
            <div>
              <p className={styles.kicker}>Dimensión ambiental</p>
              <h2 id="ambiental-title">
                Una trayectoria conectada con la restauración y la conservación
              </h2>
            </div>
            <p>
              La muestra documentada reúne líneas vinculadas con restauración,
              conservación, manejo territorial y educación ambiental.
            </p>
          </div>

          <figure className={styles.qualitativeFigure}>
            <div className={styles.evidenceMark} aria-hidden="true" />
            <figcaption>{environmentalEvidence.title}</figcaption>
            <p>{environmentalEvidence.description}</p>
          </figure>
        </div>
      </section>

      <section className={styles.axes} aria-labelledby="ejes-title">
        <div className={styles.sectionInner}>
          <h2 id="ejes-title">Ejes ambientales de la experiencia</h2>
          <div className={styles.axesGrid}>
            {environmentalAxes.map((axis, index) => (
              <article key={axis.title}>
                <span className={styles.axisIcon} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{axis.title}</h3>
                <p>{axis.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.capacity} aria-labelledby="capacidad-title">
        <div className={styles.sectionInner}>
          <div className={styles.capacityHeading}>
            <p className={styles.kickerLight}>Experiencia documentada</p>
            <h2 id="capacidad-title">Capacidad acumulada en distintos campos</h2>
          </div>
          <ul>
            {documentedFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.territory} aria-labelledby="territorio-impacto-title">
        <div className={styles.sectionInner}>
          <div className={styles.territoryHeading}>
            <h2 id="territorio-impacto-title">
              Experiencia ambiental con enfoque territorial
            </h2>
            <p>
              La documentación institucional integra conocimiento técnico,
              gestión ambiental, participación y seguimiento.
            </p>
          </div>
          <div className={styles.territoryLayout}>
            <div className={styles.mapSurface}>
              <span aria-hidden="true" />
              <p>Conocimiento técnico</p>
              <p>Gestión ambiental</p>
              <p>Participación</p>
            </div>
            <aside>
              <p className={styles.kickerLight}>Enfoque institucional</p>
              <h3>Capacidades que se articulan</h3>
              <p>
                La experiencia documentada combina capacidades ambientales,
                sociales y técnicas.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="proceso-impacto-title">
        <div className={styles.sectionInner}>
          <div className={styles.processHeading}>
            <p className={styles.kicker}>Propuesta editorial</p>
            <h2 id="proceso-impacto-title">
              Del registro de actividades a la comunicación de aprendizajes
            </h2>
          </div>
          <ol>
            {impactProcess.map((step) => (
              <li key={step.index}>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className={styles.closingSections}>
        <section className={styles.stories} aria-labelledby="historias-impacto-title">
          <div className={styles.storiesInner}>
            <div className={styles.storiesHeading}>
              <div>
                <p className={styles.kicker}>Experiencia documentada</p>
                <h2 id="historias-impacto-title">Explora los proyectos</h2>
                <p>
                  Consulta el catálogo de experiencias organizado por campos
                  estratégicos.
                </p>
              </div>
              <Button href="/proyectos" variant="secondary">
                Explorar todos los proyectos
              </Button>
            </div>
          </div>
        </section>

        <section className={styles.transparency} aria-labelledby="transparencia-impacto-title">
          <div className={styles.transparencyInner}>
            <div>
              <p className={styles.kickerLight}>Documentación y rendición de cuentas</p>
              <h2 id="transparencia-impacto-title">
                Transparencia para fortalecer la confianza
              </h2>
              <p>
                Consulta información institucional y contenidos relacionados
                con seguimiento y rendición de cuentas.
              </p>
            </div>
            <div className={styles.transparencyActions}>
              <Button href="/transparencia">Ir a transparencia</Button>
              <Button
                className={styles.darkSecondary}
                href="/contacto"
                variant="secondary"
              >
                Solicitar información
              </Button>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.cta} aria-labelledby="cta-impacto-title">
        <div className={styles.ctaCopy}>
          <p className={styles.kickerLight}>Alianzas con propósito</p>
          <h2 id="cta-impacto-title">
            Convirtamos información en decisiones para el territorio
          </h2>
          <p>
            Articulamos experiencia técnica, seguimiento y participación para
            acompañar proyectos sostenibles.
          </p>
          <div className={styles.ctaActions}>
            <Button href="/contacto">Presentar un proyecto</Button>
            <Button
              className={styles.darkSecondary}
              href="/contacto"
              variant="secondary"
            >
              Contactar a la Fundación
            </Button>
          </div>
        </div>
        <div className={styles.ctaImage}>
          <Image
            className={styles.coverImage}
            src="/assets/images/impacto-cta-formacion.jpg"
            alt="Facilitadora exponiendo durante una formación ambiental"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
      </section>
    </div>
  );
}
