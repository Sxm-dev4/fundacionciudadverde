import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  actionFields,
  complementaryCapabilities,
  experienceMetrics,
  methodologySteps,
  relatedApplications,
  transversalCapabilities,
} from "@/content/action-lines";
import styles from "./ActionLinesPage.module.css";

export function ActionLinesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="lineas-title">
        <Image
          className={styles.coverImage}
          src="/assets/images/lineas-hero-avistamiento.jpg"
          alt="Grupo observando el dosel durante una actividad ambiental"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Líneas de acción</span>
          </nav>
          <p className={styles.kickerLight}>Capacidades para transformar territorios</p>
          <h1 id="lineas-title">
            Capacidades que conectan conocimiento, territorio y ejecución
          </h1>
          <p className={styles.heroBody}>
            Planeamos, ejecutamos y acompañamos proyectos ambientales, sociales
            y de infraestructura con experiencia técnica y participación
            territorial.
          </p>
          <Link className={styles.heroLink} href="/proyectos">
            Explorar proyectos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.introduction} aria-labelledby="experiencia-title">
        <div className={styles.introductionGrid}>
          <div className={styles.headingBlock}>
            <p className={styles.kicker}>Una experiencia multidisciplinar</p>
            <h2 id="experiencia-title">
              Una experiencia construida desde múltiples campos de acción
            </h2>
          </div>
          <div className={styles.introductionCopy}>
            <p>
              La trayectoria de la Fundación integra conservación, formación,
              paisajismo, seguimiento, infraestructura y consultoría para
              responder a desafíos territoriales desde capacidades técnicas y
              sociales complementarias.
            </p>
            <p className={styles.introductionHighlight}>
              Conocimiento técnico, ejecución y acompañamiento con enfoque
              territorial.
            </p>
            <ul className={styles.compactPoints}>
              <li>Formulación y planificación</li>
              <li>Ejecución y acompañamiento</li>
              <li>Seguimiento técnico</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className={styles.fieldsSection}
        id="campos-estrategicos"
        aria-labelledby="campos-title"
      >
        <div className={styles.fieldsInner}>
          <div className={styles.sectionLead}>
            <p className={styles.kicker}>Seis campos estratégicos</p>
            <h2 id="campos-title">Capacidades conectadas para cada desafío</h2>
            <p>
              Servicios documentados que articulan conocimiento, seguimiento y
              ejecución en el territorio.
            </p>
          </div>

          <div className={styles.desktopFields}>
            {actionFields.map((field) => (
              <article className={styles.fieldCard} key={field.index}>
                <div className={styles.fieldTopline}>
                  <span>{field.index}</span>
                  <Image src={field.icon} alt="" width={28} height={28} />
                </div>
                <h3>{field.title}</h3>
                <p>{field.description}</p>
                <ul>
                  {field.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <span className={styles.fieldLabel}>Conocer el campo&nbsp; →</span>
              </article>
            ))}
          </div>

          <div className={styles.mobileFields}>
            {actionFields.map((field, index) => (
              <details className={styles.fieldAccordion} key={field.index} open={index === 0}>
                <summary>
                  <span className={styles.fieldMeta}>
                    <span className={styles.fieldNumber}>{field.index}</span>
                    <Image src={field.icon} alt="" width={24} height={24} />
                  </span>
                  <span className={styles.fieldSummaryTitle}>{field.title}</span>
                  <span className={styles.fieldSummaryDescription}>{field.description}</span>
                  <span className={styles.fieldAction}>
                    <span className={styles.showLabel}>Ver capacidades</span>
                    <span className={styles.hideLabel}>Ocultar capacidades</span>
                    <span className={styles.chevron} aria-hidden="true">+</span>
                  </span>
                </summary>
                <div className={styles.fieldAccordionBody}>
                  <p className={styles.capabilityLabel}>Capacidades incluidas</p>
                  <ul>
                    {field.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.methodology}
        id="metodologia"
        aria-labelledby="metodologia-title"
      >
        <div className={styles.methodologyInner}>
          <div className={styles.methodologyLead}>
            <div>
              <p className={styles.kickerLight}>Una ruta para aplicar capacidades</p>
              <h2 id="metodologia-title">Del diagnóstico a resultados verificables</h2>
            </div>
            <p>
              Una estructura general para comprender, formular, ejecutar y
              documentar cada intervención.
            </p>
          </div>
          <ol className={styles.methodologySteps}>
            {methodologySteps.map((step) => (
              <li key={step.index}>
                <div className={styles.stepMarker} aria-hidden="true">
                  {step.index}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.experience} aria-labelledby="cifras-title">
        <div className={styles.experienceInner}>
          <div className={styles.experienceLead}>
            <p className={styles.kicker}>Experiencia documentada</p>
            <h2 id="cifras-title">Experiencia documentada en múltiples campos</h2>
            <p>Cifras extraídas del análisis institucional.</p>
          </div>
          <ul className={styles.experienceGrid} aria-label="Experiencia por campo">
            {experienceMetrics.map((metric) => (
              <li key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.transversal} aria-labelledby="transversal-title">
        <div className={styles.transversalGrid}>
          <div className={styles.transversalImage}>
            <Image
              className={styles.coverImage}
              src="/assets/images/lineas-capacidad-transversal.jpg"
              alt="Taller comunitario alrededor de un mapa territorial"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
          <div className={styles.transversalCopy}>
            <p className={styles.kicker}>Capacidad transversal</p>
            <h2 id="transversal-title">
              Experiencia técnica con participación territorial
            </h2>
            <p>
              La Fundación integra conocimiento técnico, trabajo comunitario y
              seguimiento para construir soluciones sostenibles con enfoque
              territorial.
            </p>
            <ul>
              {transversalCapabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.complementary} aria-labelledby="complementarias-title">
        <div className={styles.complementaryInner}>
          <div className={styles.complementaryLead}>
            <p className={styles.kicker}>Apoyo al ciclo de los proyectos</p>
            <h2 id="complementarias-title">
              Capacidades que amplían el acompañamiento
            </h2>
            <p>Ámbitos complementarios de la experiencia institucional.</p>
          </div>
          <div className={styles.complementaryGrid}>
            {complementaryCapabilities.map((capability) => (
              <article key={capability.index}>
                <span>{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="aplicaciones-title">
        <div className={styles.relatedInner}>
          <div className={styles.relatedLead}>
            <div>
              <p className={styles.kicker}>Aplicación en el territorio</p>
              <h2 id="aplicaciones-title">Proyectos relacionados</h2>
              <p className={styles.relatedDescription}>
                Capacidades aplicadas en procesos ambientales y territoriales.
              </p>
            </div>
            <Button className={styles.relatedDesktopAction} href="/proyectos">
              Ver todos los proyectos
            </Button>
          </div>
          <div className={styles.relatedGrid}>
            {relatedApplications.map((application) => (
              <article key={application.title}>
                <div className={styles.relatedImage}>
                  <Image
                    className={styles.coverImage}
                    src={application.image}
                    alt={application.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 40px), 33vw"
                  />
                </div>
                <div className={styles.relatedCopy}>
                  <p className={styles.cardKicker}>Campo de aplicación</p>
                  <h3>{application.title}</h3>
                  <p>{application.description}</p>
                  <Link href="/proyectos">Conocer la experiencia <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
          <Button className={styles.relatedMobileAction} href="/proyectos">
            Ver todos los proyectos
          </Button>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaImage}>
          <Image
            className={styles.coverImage}
            src="/assets/images/lineas-cta-colaboracion.jpg"
            alt="Grupo reunido en círculo durante un intercambio de experiencias"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
        <div className={styles.ctaCopy}>
          <p className={styles.kickerLight}>Construyamos una solución</p>
          <h2 id="cta-title">
            Convirtamos un desafío territorial en una solución sostenible
          </h2>
          <p>
            Articulamos capacidades técnicas, sociales y operativas para
            responder a retos ambientales y territoriales.
          </p>
          <div className={styles.ctaActions}>
            <Button href="/contacto">Presentar un proyecto</Button>
            <Button className={styles.ctaSecondary} href="/contacto" variant="secondary">
              Contactar a la Fundación
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
