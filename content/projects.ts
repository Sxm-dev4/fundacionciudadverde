export const projectFieldOptions = [
  "Restauración y conservación ambiental",
  "Pedagogía y formación experiencial",
  "Paisajismo y arboricultura urbana",
  "Interventoría y seguimiento",
  "Obras y adecuaciones",
  "Consultorías, estudios y diseños",
] as const;

export const projectTerritoryOptions = ["Valle del Cauca"] as const;

export const projectParticipationOptions = [
  "Ejecución",
  "Interventoría",
  "Consultoría",
  "Alianza o consorcio",
] as const;

export type ProjectField = (typeof projectFieldOptions)[number];
export type ProjectTerritory = (typeof projectTerritoryOptions)[number];
export type ProjectParticipation =
  (typeof projectParticipationOptions)[number];

export type ProjectExperience = {
  id: string;
  title: string;
  field: ProjectField;
  description: string;
  participation: ProjectParticipation;
  territory?: ProjectTerritory;
  image: string;
  alt: string;
  slug?: string;
};

export const projectExperiences: readonly ProjectExperience[] = [
  {
    id: "recuperacion-ecosistemas",
    slug: "recuperacion-participativa-de-ecosistemas",
    title: "Recuperación participativa de ecosistemas",
    field: "Restauración y conservación ambiental",
    description:
      "Acciones de conservación y recuperación construidas con participación territorial.",
    participation: "Ejecución",
    territory: "Valle del Cauca",
    image: "/assets/images/proyectos-mariposa.jpg",
    alt: "Mariposa posada sobre hojas verdes",
  },
  {
    id: "formacion-comunidades",
    title: "Formación ambiental con comunidades",
    field: "Pedagogía y formación experiencial",
    description:
      "Procesos de aprendizaje que conectan conocimiento ambiental y experiencia directa.",
    participation: "Ejecución",
    territory: "Valle del Cauca",
    image: "/assets/images/proyectos-formacion-comunidades.jpg",
    alt: "Grupo durante una orientación ambiental en un recorrido",
  },
  {
    id: "conservacion-educacion",
    title: "Conservación y educación territorial",
    field: "Restauración y conservación ambiental",
    description:
      "Recorridos y apropiación comunitaria para comprender y proteger ecosistemas.",
    participation: "Alianza o consorcio",
    territory: "Valle del Cauca",
    image: "/assets/images/inicio-cta-comunidades-humedales.jpg",
    alt: "Grupo caminando por un sendero de humedal",
  },
  {
    id: "espacios-verdes",
    title: "Diseño de espacios verdes urbanos",
    field: "Paisajismo y arboricultura urbana",
    description:
      "Criterios ambientales y territoriales para proyectar espacios verdes más funcionales.",
    participation: "Consultoría",
    image: "/assets/images/proyectos-espacios-verdes.jpg",
    alt: "Facilitadora explicando la vegetación durante un recorrido",
  },
  {
    id: "seguimiento-integral",
    title: "Seguimiento integral de proyectos",
    field: "Interventoría y seguimiento",
    description:
      "Acompañamiento técnico, administrativo y ambiental para fortalecer la ejecución.",
    participation: "Interventoría",
    territory: "Valle del Cauca",
    image: "/assets/images/proyectos-seguimiento.jpg",
    alt: "Reunión técnica de campo bajo una cubierta",
  },
  {
    id: "estudios-infraestructura",
    title: "Estudios para infraestructura sostenible",
    field: "Consultorías, estudios y diseños",
    description:
      "Análisis y formulación técnica para orientar decisiones de diseño e infraestructura.",
    participation: "Consultoría",
    image: "/assets/images/inicio-hero-recorrido-ambiental.jpg",
    alt: "Guías ambientales señalando elementos del entorno natural",
  },
  {
    id: "practicas-agroecologicas",
    title: "Fortalecimiento de prácticas agroecológicas",
    field: "Restauración y conservación ambiental",
    description:
      "Aprendizajes y capacidades para acompañar transiciones productivas sostenibles.",
    participation: "Ejecución",
    territory: "Valle del Cauca",
    image: "/assets/images/proyectos-agroecologia.jpg",
    alt: "Grupo reunido al aire libre al cierre de una actividad agroecológica",
  },
  {
    id: "gestion-participacion",
    title: "Gestión ambiental y participación social",
    field: "Pedagogía y formación experiencial",
    description:
      "Herramientas participativas para leer el territorio y construir acuerdos colectivos.",
    participation: "Alianza o consorcio",
    territory: "Valle del Cauca",
    image: "/assets/images/proyectos-gestion-participacion.jpg",
    alt: "Facilitadora y asistente conversando en una actividad ambiental",
  },
  {
    id: "adecuacion-comunitaria",
    title: "Adecuación sostenible de espacios comunitarios",
    field: "Obras y adecuaciones",
    description:
      "Soluciones de mejora que integran uso comunitario, contexto y criterios ambientales.",
    participation: "Ejecución",
    image: "/assets/images/proyectos-adecuacion.jpg",
    alt: "Montaje de una exhibición comunitaria sobre humedales",
  },
] as const;

export type ProjectDetailContent = ProjectExperience & {
  slug: string;
  introduction: string;
  metadata: readonly { label: string; value: string }[];
  axes: readonly string[];
  solutionSteps: readonly { title: string; description: string }[];
  processSteps: readonly { title: string; description: string }[];
  impactAxes: readonly { title: string; description: string }[];
  evidence: readonly {
    title: string;
    description: string;
    image: string;
    alt: string;
  }[];
  gallery: readonly { image: string; alt: string }[];
  relatedIds: readonly string[];
};

const approvedProject = projectExperiences[0];

export const projectDetails: readonly ProjectDetailContent[] = [
  {
    ...approvedProject,
    slug: "recuperacion-participativa-de-ecosistemas",
    introduction:
      "Un proceso territorial que integra conocimiento técnico, restauración ambiental y participación comunitaria para fortalecer la relación entre las personas y su entorno.",
    metadata: [
      { label: "Campo", value: "Restauración ambiental" },
      { label: "Participación", value: "Ejecución" },
      { label: "Territorio", value: "Valle del Cauca" },
      { label: "Enfoque", value: "Participación comunitaria" },
    ],
    axes: [
      "Restauración ecológica",
      "Formación ambiental",
      "Participación comunitaria",
      "Seguimiento técnico",
    ],
    solutionSteps: [
      {
        title: "Diagnóstico territorial",
        description: "Reconocer condiciones, actores y oportunidades.",
      },
      {
        title: "Diseño de acciones",
        description: "Traducir la lectura técnica en una ruta pertinente.",
      },
      {
        title: "Participación de la comunidad",
        description: "Integrar saberes y decisiones del territorio.",
      },
      {
        title: "Implementación técnica",
        description: "Acompañar acciones con criterios ambientales.",
      },
      {
        title: "Seguimiento y documentación",
        description: "Registrar aprendizajes y orientar ajustes.",
      },
    ],
    processSteps: [
      {
        title: "Reconocimiento del territorio",
        description: "Lectura inicial de actores y condiciones.",
      },
      {
        title: "Diagnóstico ambiental",
        description: "Análisis técnico y comprensión compartida.",
      },
      {
        title: "Diseño participativo",
        description: "Definición de acciones y responsabilidades.",
      },
      {
        title: "Implementación y acompañamiento",
        description: "Desarrollo técnico con presencia territorial.",
      },
      {
        title: "Seguimiento y aprendizajes",
        description: "Documentación, lectura de avances y ajustes.",
      },
    ],
    impactAxes: [
      {
        title: "Ecosistemas",
        description: "Recuperación de coberturas y relaciones ecológicas.",
      },
      {
        title: "Comunidades",
        description: "Fortalecimiento de vínculos y participación territorial.",
      },
      {
        title: "Conocimiento",
        description: "Aprendizajes técnicos y saberes compartidos.",
      },
      {
        title: "Gestión",
        description: "Articulación de capacidades para decisiones sostenibles.",
      },
    ],
    evidence: [
      {
        title: "Reconocimiento territorial",
        description: "Lectura colectiva de las condiciones del entorno.",
        image: "/assets/images/lineas-restauracion-territorio.jpg",
        alt: "Grupo recorriendo vegetación densa",
      },
      {
        title: "Trabajo comunitario",
        description: "Espacios para conversar, mapear y construir acuerdos.",
        image: "/assets/images/lineas-capacidad-transversal.jpg",
        alt: "Taller comunitario alrededor de un mapa territorial",
      },
      {
        title: "Acompañamiento técnico",
        description: "Orientación en campo y transferencia de conocimiento.",
        image: "/assets/images/proyectos-acompanamiento-tecnico.jpg",
        alt: "Facilitadora dialogando con un grupo bajo un árbol",
      },
    ],
    gallery: [
      {
        image: "/assets/images/proyectos-galeria-pato.jpg",
        alt: "Ave acuática entre vegetación",
      },
      {
        image: "/assets/images/proyectos-mariposa.jpg",
        alt: "Mariposa posada sobre hojas verdes",
      },
      {
        image: "/assets/images/proyectos-galeria-avistamiento.jpg",
        alt: "Participantes observando fauna desde una pasarela",
      },
      {
        image: "/assets/images/proyectos-galeria-humedal.jpg",
        alt: "Grupo observando un entorno de bosque y humedal",
      },
      {
        image: "/assets/images/lineas-cta-colaboracion.jpg",
        alt: "Círculo comunitario reunido bajo un árbol",
      },
      {
        image: "/assets/images/proyectos-galeria-recorrido.jpg",
        alt: "Grupo caminando por un entorno natural",
      },
    ],
    relatedIds: [
      "formacion-comunidades",
      "conservacion-educacion",
      "practicas-agroecologicas",
    ],
  },
] as const;

export function getProjectBySlug(slug: string) {
  return projectDetails.find((project) => project.slug === slug);
}

export function getProjectExperienceById(id: string) {
  return projectExperiences.find((project) => project.id === id);
}
