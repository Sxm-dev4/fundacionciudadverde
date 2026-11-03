import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  coverageFacts,
  homeMetrics,
  institutionalCapabilities,
  integratedCapabilities,
  timelineMilestones,
} from "@/content/home";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection} aria-labelledby="inicio-title">
        <div className={styles.heroMedia}>
          <Image
            className={styles.heroImage}
            src="/assets/images/inicio-hero-recorrido-ambiental.jpg"
            alt="Guías durante un recorrido de pedagogía ambiental"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.breadcrumb}>Inicio</p>
            <p className={styles.kickerLight}>Nuestra historia y propósito</p>
            <h1 id="inicio-title" className={styles.heroTitle}>
              Más de dos décadas transformando territorios
            </h1>
            <p className={styles.heroBody}>
              Desde 2005 desarrollamos proyectos que conectan conservación
              ambiental, conocimiento técnico, infraestructura y participación
              social.
            </p>
          </div>
        </div>

        <ul className={styles.metrics} aria-label="Indicadores institucionales">
          {homeMetrics.map((metric) => (
            <li className={styles.metric} key={metric.label}>
              <Image
                className={styles.metricIcon}
                src={metric.icon}
                alt=""
                width={25}
                height={25}
              />
              <div>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.aboutSection} aria-labelledby="quienes-title">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImageFrame}>
            <Image
              className={styles.sectionImage}
              src="/assets/images/inicio-formacion-ambiental.jpg"
              alt="Grupo reunido durante una actividad de formación ambiental"
              fill
              sizes="(max-width: 1023px) calc(100vw - 40px), 520px"
            />
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.kicker}>Quiénes somos</p>
            <h2 id="quienes-title" className={styles.displayHeading}>
              Conocimiento técnico al servicio del territorio
            </h2>
            <p>
              Somos una organización con experiencia en la planeación,
              ejecución, seguimiento y evaluación de proyectos ambientales,
              sociales y de infraestructura. Integramos conocimiento técnico,
              participación territorial y tecnologías verdes para proteger la
              biodiversidad y construir soluciones sostenibles.
            </p>
            <p className={styles.highlight}>
              <span aria-hidden="true">—</span>
              Articulamos capacidades técnicas, sociales y ambientales en cada
              proyecto.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.purposeSection} aria-labelledby="proposito-title">
        <div className={styles.sectionHeadingFull}>
          <p className={styles.kicker}>Nuestra razón de ser</p>
          <h2 id="proposito-title" className={styles.displayHeading}>
            Un propósito compartido, una visión de futuro
          </h2>
        </div>
        <div className={styles.purposeGrid}>
          <article className={styles.missionCard}>
            <div className={styles.accentRail} aria-hidden="true" />
            <div>
              <h3>Misión</h3>
              <p>
                Transformamos la relación entre el desarrollo humano y el
                equilibrio ecosistémico mediante la planeación y ejecución de
                proyectos en sinergia con los actores que convergen en el
                territorio, fundamentados en la transparencia y la excelencia
                técnica; convirtiendo cada proyecto en un legado vivo de
                sostenibilidad e impacto verde.
              </p>
            </div>
          </article>
          <div className={styles.visionPurpose}>
            <article className={styles.visionCard}>
              <h3>Visión</h3>
              <p>
                Liderar soluciones ambientales en la región mediante la
                convergencia entre innovación social, ciencia de datos y
                tecnología para contribuir a campos y ciudades saludables y
                sostenibles.
              </p>
            </article>
            <article className={styles.purposeCard}>
              <p className={styles.kicker}>Propósito</p>
              <p>
                Hacemos realidad proyectos que conservan nuestra biodiversidad.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.timelineSection} aria-labelledby="trayectoria-title">
        <div className={styles.splitHeading}>
          <div>
            <p className={styles.kicker}>Trayectoria</p>
            <h2 id="trayectoria-title">Una historia construida paso a paso</h2>
          </div>
        </div>
        <ol className={styles.timeline}>
          {timelineMilestones.map((milestone) => (
            <li className={styles.timelineItem} key={`${milestone.phase}-${milestone.title}`}>
              <div className={styles.timelineMarker} aria-hidden="true">
                <Image
                  src="/assets/icons/timeline-node.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </div>
              <p className={styles.timelinePhase}>{milestone.phase}</p>
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.capabilitiesSection} aria-labelledby="capacidades-title">
        <div className={styles.splitHeadingDark}>
          <div>
            <p className={styles.kickerLight}>Capacidades institucionales</p>
            <h2 id="capacidades-title">
              Experiencia para acompañar todo el ciclo del proyecto
            </h2>
          </div>
          <p>
            Integramos capacidades técnicas, territoriales y sociales en seis
            campos de trabajo.
          </p>
        </div>
        <div className={styles.capabilitiesGrid}>
          {institutionalCapabilities.map((capability) => (
            <article className={styles.capabilityCard} key={capability.index}>
              <span>{capability.index}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.organizationSection} aria-labelledby="organizacion-title">
        <div className={styles.splitHeading}>
          <div>
            <p className={styles.kicker}>Organización institucional</p>
            <h2 id="organizacion-title">
              Capacidades que se integran para transformar territorios
            </h2>
          </div>
          <p>
            Articulamos conocimiento técnico, gestión territorial y trabajo
            comunitario.
          </p>
        </div>
        <div className={styles.integratedGrid}>
          {integratedCapabilities.map((capability) => (
            <article className={styles.integratedCard} key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.territorySection} aria-labelledby="territorio-title">
        <div className={styles.territoryGrid}>
          <div className={styles.territoryCopy}>
            <p className={styles.kicker}>Territorio y cobertura</p>
            <h2 id="territorio-title" className={styles.displayHeading}>
              Nacimos en Cali con vocación regional
            </h2>
            <p>
              Nuestra experiencia se origina en Cali y se proyecta desde el
              Valle del Cauca hacia nuevos territorios, articulando capacidades
              locales y alianzas estratégicas.
            </p>
            <ul className={styles.coverageList}>
              {coverageFacts.map((fact) => (
                <li key={fact}>
                  <Image
                    src="/assets/icons/accent-dot.svg"
                    alt=""
                    width={8}
                    height={8}
                  />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mapCard}>
            <p className={styles.kicker}>Mapa editable de referencia</p>
            <Image
              className={styles.mapImage}
              src="/assets/icons/territory-map.svg"
              alt=""
              width={360}
              height={230}
            />
            <p className={styles.mapLegend}>
              Cali / origen · Valle del Cauca / cobertura · Región / proyección
            </p>
          </div>
        </div>
      </section>

      <section className={styles.transparencySection} aria-labelledby="transparencia-title">
        <div className={styles.transparencyGrid}>
          <div className={styles.transparencyCopy}>
            <p className={styles.kicker}>Transparencia</p>
            <h2 id="transparencia-title">Información institucional y transparencia</h2>
            <p>
              Consulta la información institucional disponible en la futura
              sección de Transparencia.
            </p>
            <Button href="/transparencia">Ir a transparencia</Button>
          </div>
          <div className={styles.transparencyIcon} aria-hidden="true">
            <Image
              src="/assets/icons/transparency-document.svg"
              alt=""
              width={96}
              height={112}
            />
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} aria-labelledby="alianzas-title">
        <div className={styles.ctaImageFrame}>
          <Image
            className={styles.sectionImage}
            src="/assets/images/inicio-cta-comunidades-humedales.jpg"
            alt="Grupo avanzando por un sendero forestal"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
        <div className={styles.ctaCopy}>
          <p className={styles.kickerLight}>Alianzas con propósito</p>
          <h2 id="alianzas-title">
            Construimos soluciones junto a instituciones, empresas y comunidades
          </h2>
          <p>
            Articulamos experiencia técnica y compromiso territorial para
            convertir desafíos ambientales en proyectos con impacto sostenible.
          </p>
          <div className={styles.ctaActions}>
            <Button href="/contacto">Crear una alianza</Button>
            <Button
              className={styles.ctaSecondary}
              href="/proyectos"
              variant="secondary"
            >
              Conocer nuestros proyectos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
