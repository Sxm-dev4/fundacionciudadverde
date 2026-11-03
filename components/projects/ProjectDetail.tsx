import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  getProjectExperienceById,
  type ProjectDetailContent,
} from "@/content/projects";
import { Breadcrumb } from "./Breadcrumb";
import { ProjectCard } from "./ProjectCard";
import { ShareProjectButton } from "./ShareProjectButton";
import styles from "./ProjectDetail.module.css";

const mobileImpactDescriptions = {
  Ecosistemas: "Recuperación y cuidado ambiental.",
  Comunidades: "Participación y capacidades locales.",
  Conocimiento: "Aprendizajes y memoria territorial.",
  Gestión: "Herramientas para orientar decisiones.",
} as const;

export function ProjectDetail({ project }: { project: ProjectDetailContent }) {
  const related = project.relatedIds
    .map(getProjectExperienceById)
    .filter((item) => item !== undefined);

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <Image
          className={styles.coverImage}
          src="/assets/images/inicio-cta-comunidades-humedales.jpg"
          alt="Grupo avanzando por un sendero de humedal"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroInner}>
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Proyectos", href: "/proyectos" },
              { label: project.title },
            ]}
          />
          <p className={styles.badge}>{project.field}</p>
          <h1>{project.title}</h1>
          <p className={styles.heroIntroduction}>{project.introduction}</p>
          <div className={styles.heroActions}>
            <Button href="/proyectos" variant="secondary">
              <span aria-hidden="true">←</span> Volver a proyectos
            </Button>
            <ShareProjectButton title={project.title} />
          </div>
        </div>
      </header>

      <section className={styles.metadata} aria-labelledby="metadata-title">
        <div className={styles.metadataInner}>
          <h2 className={styles.mobileKicker} id="metadata-title">Datos del proyecto</h2>
          <dl>
            {project.metadata.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.summary} aria-labelledby="summary-title">
        <div className={styles.summaryInner}>
          <div className={styles.summaryCopy}>
            <p className={styles.kicker}>Resumen del proyecto</p>
            <h2 id="summary-title">Una intervención construida desde el territorio</h2>
            <p className={styles.desktopCopy}>
              La intervención parte de una lectura compartida del contexto y de
              los actores locales. Integra criterios técnicos, acciones de
              restauración, acompañamiento comunitario y seguimiento para
              fortalecer capacidades y orientar decisiones sostenibles.
            </p>
            <p className={styles.mobileCopy}>
              El proyecto integra restauración, formación y participación para
              construir respuestas ambientales desde el territorio.
            </p>
          </div>
          <div className={styles.axes}>
            <h3>Ejes de intervención</h3>
            <ol>
              {project.axes.map((axis, index) => (
                <li key={axis}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {axis}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.challenge} aria-labelledby="challenge-title">
        <div className={styles.challengeInner}>
          <div className={styles.challengeCopy}>
            <p className={styles.kicker}>Lectura del contexto</p>
            <h2 id="challenge-title">
              <span className={styles.desktopTitle}>El desafío</span>
              <span className={styles.mobileTitle}>Recuperar ecosistemas con las comunidades</span>
            </h2>
            <p className={styles.desktopCopy}>
              El territorio plantea retos ambientales y sociales que requieren
              una lectura cuidadosa, articulación entre actores y decisiones
              ajustadas a las condiciones del entorno. El proceso busca reconocer
              esas dinámicas y convertirlas en criterios para una intervención
              responsable.
            </p>
            <p className={styles.mobileCopy}>
              El territorio requería una mirada integral: comprender sus dinámicas
              ambientales, reconocer el conocimiento local y convertir ambos
              insumos en acciones viables de recuperación.
            </p>
            <blockquote>
              Comprender el territorio es el primer paso para actuar con pertinencia.
            </blockquote>
          </div>
          <div className={styles.challengeImage}>
            <Image
              className={styles.coverImage}
              src="/assets/images/proyectos-espacios-verdes.jpg"
              alt="Facilitadora señalando vegetación durante un recorrido"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.solution} aria-labelledby="solution-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>Solución integrada</p>
              <h2 id="solution-title">Una solución que conecta conocimiento y comunidad</h2>
            </div>
            <p>Cinco momentos editoriales que articulan análisis, participación e implementación.</p>
          </div>
          <ol className={styles.solutionSteps}>
            {project.solutionSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <p className={styles.swipeHint}>Desliza para recorrer las acciones&nbsp; →</p>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>Proceso</p>
              <h2 id="process-title">Del reconocimiento a los aprendizajes</h2>
            </div>
            <p>Una secuencia para explicar el acompañamiento territorial.</p>
          </div>
          <ol className={styles.processSteps}>
            {project.processSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.impact} aria-labelledby="impact-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeadingDark}>
            <div>
              <p className={styles.kickerLight}>Impacto cualitativo</p>
              <h2 id="impact-title">Impacto construido en múltiples dimensiones</h2>
            </div>
            <p>Una lectura cualitativa de la experiencia documentada.</p>
          </div>
          <div className={styles.impactGrid}>
            {project.impactAxes.map((axis) => (
              <article key={axis.title}>
                <span aria-hidden="true">●</span>
                <h3>{axis.title}</h3>
                <p className={styles.desktopCopy}>{axis.description}</p>
                <p className={styles.mobileCopy}>
                  {mobileImpactDescriptions[
                    axis.title as keyof typeof mobileImpactDescriptions
                  ]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.evidence} aria-labelledby="evidence-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>Evidencias</p>
              <h2 id="evidence-title">Evidencias del proceso</h2>
            </div>
            <p>Registro institucional seleccionado por pertinencia editorial.</p>
          </div>
          <div className={styles.evidenceGrid}>
            {project.evidence.map((item) => (
              <article key={item.title}>
                <div className={styles.evidenceImage}>
                  <Image className={styles.coverImage} src={item.image} alt={item.alt} fill sizes="(max-width: 767px) calc(100vw - 40px), 33vw" />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery} id="galeria-proyecto" aria-labelledby="gallery-title">
        <div className={styles.sectionInner}>
          <div className={styles.galleryHeading}>
            <div>
              <p className={styles.kicker}>Galería</p>
              <h2 id="gallery-title">Territorio, biodiversidad y participación</h2>
            </div>
            <span>Ver galería completa&nbsp; →</span>
          </div>
          <div className={styles.galleryGrid}>
            {project.gallery.map((item, index) => (
              <div className={index === 0 ? styles.galleryMain : ""} key={item.image}>
                <Image className={styles.coverImage} src={item.image} alt={item.alt} fill sizes={index === 0 ? "(max-width: 1023px) 100vw, 50vw" : "25vw"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.community} aria-labelledby="community-title">
        <div className={styles.communityInner}>
          <div>
            <p className={styles.kicker}>Participación territorial</p>
            <h2 id="community-title">Las decisiones se fortalecen con la participación</h2>
            <p className={styles.desktopCopy}>
              El proceso conecta conocimiento técnico y saberes comunitarios para
              comprender el territorio, construir acuerdos y orientar acciones con
              mayor pertinencia.
            </p>
            <p className={styles.mobileCopy}>
              La participación permitió reconocer experiencias locales, construir
              acuerdos y fortalecer capacidades para sostener el cuidado ambiental.
            </p>
          </div>
          <blockquote>
            <span aria-hidden="true">“</span>
            El conocimiento técnico adquiere mayor valor cuando dialoga con quienes
            habitan y conocen el territorio.
          </blockquote>
        </div>
      </section>

      <section className={styles.location} aria-labelledby="location-title">
        <div className={styles.locationInner}>
          <div className={styles.locationMap}>
            <Image src="/assets/icons/territory-map.svg" alt="Esquema del alcance territorial institucional" width={360} height={230} />
          </div>
          <div className={styles.locationCopy}>
            <p className={styles.kicker}>Contexto institucional</p>
            <h2 id="location-title">Alcance territorial institucional</h2>
            <p>
              La Fundación tiene su origen en Cali y experiencia territorial en
              el Valle del Cauca.
            </p>
            <ul>
              <li>Cali — origen institucional</li>
              <li>Valle del Cauca — experiencia territorial</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.documents} id="documentacion" aria-labelledby="documents-title">
        <div className={styles.sectionInner}>
          <div className={styles.documentsHeading}>
            <div>
              <p className={styles.kicker}>Información institucional</p>
              <h2 id="documents-title">Transparencia institucional</h2>
            </div>
            <Button href="/transparencia" variant="secondary">Ir a Transparencia</Button>
          </div>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className={styles.sectionInner}>
          <div className={styles.relatedHeading}>
            <div>
              <p className={styles.kicker}>Continúa explorando</p>
              <h2 id="related-title">Proyectos relacionados</h2>
            </div>
            <Link href="/proyectos">Ver todos los proyectos&nbsp; →</Link>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <ProjectCard key={item.id} project={item} compact />
            ))}
          </div>
          <Button className={styles.relatedMobileAction} href="/proyectos" variant="secondary">Ver todos los proyectos</Button>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="detail-cta-title">
        <div className={styles.ctaCopy}>
          <p className={styles.kickerLight}>Capacidades para tu territorio</p>
          <h2 id="detail-cta-title">Construyamos una solución para tu territorio</h2>
          <p className={styles.desktopCopy}>
            Articulamos capacidades técnicas, ambientales y comunitarias para
            acompañar proyectos con impacto sostenible.
          </p>
          <p className={styles.mobileCopy}>
            Conversemos sobre los retos y capacidades que pueden dar forma a una
            iniciativa ambiental con impacto territorial.
          </p>
          <div className={styles.ctaActions}>
            <Button href="/contacto">Presentar un proyecto</Button>
            <Button className={styles.ctaSecondary} href="/contacto" variant="secondary">Contactar a la Fundación</Button>
          </div>
        </div>
        <div className={styles.ctaImage}>
          <Image className={styles.coverImage} src="/assets/images/proyectos-formacion-comunidades.jpg" alt="Grupo recibiendo orientación durante un recorrido ambiental" fill sizes="(max-width: 1023px) 100vw, 50vw" />
        </div>
      </section>
    </article>
  );
}
