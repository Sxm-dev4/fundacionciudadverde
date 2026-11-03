export type ActionField = {
  index: `0${1 | 2 | 3 | 4 | 5 | 6}`;
  title: string;
  description: string;
  capabilities: readonly string[];
  icon: string;
};

export const actionFields: readonly ActionField[] = [
  {
    index: "01",
    title: "Restauración y conservación ambiental",
    description:
      "Recuperamos ecosistemas con soluciones técnicas y comunitarias.",
    capabilities: [
      "Restauración ecológica y reforestación",
      "Agroecología y reconversión",
      "Gestión hídrica y gestión de residuos",
      "Educación ambiental",
      "Manejo de especies invasoras",
    ],
    icon: "/assets/icons/lineas-restauracion.svg",
  },
  {
    index: "02",
    title: "Pedagogía y formación experiencial",
    description:
      "Diseñamos procesos educativos que conectan conocimiento y territorio.",
    capabilities: [
      "Educación ambiental y formación comunitaria",
      "Enfoques poblacionales",
      "Gestión de residuos",
      "Soberanía alimentaria",
      "Planes municipales de educación ambiental",
    ],
    icon: "/assets/icons/lineas-pedagogia.svg",
  },
  {
    index: "03",
    title: "Paisajismo y arboricultura urbana",
    description:
      "Planificamos y mantenemos infraestructura verde y arbolado urbano.",
    capabilities: [
      "Diseño paisajístico",
      "Mantenimiento fitosanitario y arboricultura urbana",
      "Reforestación",
      "Mantenimiento de zonas verdes",
      "Podas y disposición de material vegetal",
    ],
    icon: "/assets/icons/lineas-arboricultura.svg",
  },
  {
    index: "04",
    title: "Interventoría y seguimiento",
    description:
      "Acompañamos el cumplimiento técnico, financiero, ambiental y administrativo.",
    capabilities: [
      "Seguimiento técnico y financiero",
      "Seguimiento ambiental y administrativo",
      "Cumplimiento normativo",
      "Control de cronogramas",
      "Control de presupuestos",
    ],
    icon: "/assets/icons/lineas-interventoria.svg",
  },
  {
    index: "05",
    title: "Obras y adecuaciones",
    description:
      "Ejecutamos adecuaciones y obras que responden a necesidades territoriales.",
    capabilities: [
      "Adecuación de infraestructuras",
      "Obras civiles y obras viales",
      "Muelles",
      "Cerramientos",
      "Adecuación de terrenos",
    ],
    icon: "/assets/icons/lineas-obras.svg",
  },
  {
    index: "06",
    title: "Consultorías, estudios y diseños",
    description:
      "Convertimos diagnósticos y estudios especializados en soluciones viables.",
    capabilities: [
      "Estudios, diseños y diagnóstico",
      "Geotecnia y suelos",
      "Muros de contención y diseño paisajístico",
      "Proyectos productivos",
      "Formulación de soluciones",
    ],
    icon: "/assets/icons/lineas-consultorias.svg",
  },
] as const;

export const methodologySteps = [
  {
    index: "01",
    title: "Comprender el territorio",
    description: "Leer actores, condiciones y retos.",
  },
  {
    index: "02",
    title: "Formular la solución",
    description: "Definir alcance, enfoque y propósito.",
  },
  {
    index: "03",
    title: "Diseñar y planificar",
    description: "Crear recursos, tiempos y criterios.",
  },
  {
    index: "04",
    title: "Ejecutar y acompañar",
    description: "Implementar con seguimiento técnico y social.",
  },
  {
    index: "05",
    title: "Medir y documentar",
    description: "Registrar resultados y aprendizajes.",
  },
] as const;

export const experienceMetrics = [
  { value: "197", label: "proyectos ejecutados" },
  { value: "47", label: "interventorías" },
  { value: "36", label: "paisajismo y arboricultura" },
  { value: "28", label: "consultorías" },
  { value: "16", label: "obras y adecuaciones" },
  { value: "15", label: "pedagogía y formación" },
] as const;

export const transversalCapabilities = [
  "Conocimiento técnico",
  "Trabajo comunitario",
  "Interventoría",
  "Seguimiento",
  "Sostenibilidad",
  "Enfoque territorial",
] as const;

export const complementaryCapabilities = [
  {
    index: "01",
    title: "Gestión social",
    description:
      "Articulación con actores, comunidades y procesos de participación alrededor de cada intervención.",
  },
  {
    index: "02",
    title: "Logística y suministros",
    description:
      "Apoyo operativo para movilizar recursos, materiales y condiciones requeridas por los proyectos.",
  },
] as const;

export const relatedApplications = [
  {
    title: "Restauración ambiental",
    description:
      "Recuperación de ecosistemas y procesos de conservación con participación territorial.",
    image: "/assets/images/lineas-restauracion-territorio.jpg",
    alt: "Grupo recorriendo un entorno de vegetación densa",
  },
  {
    title: "Formación comunitaria",
    description:
      "Procesos pedagógicos y experienciales para fortalecer capacidades locales.",
    image: "/assets/images/lineas-formacion-comunitaria.jpg",
    alt: "Actividad de formación ambiental al aire libre",
  },
  {
    title: "Intervención territorial",
    description:
      "Acompañamiento técnico y social para responder a necesidades del territorio.",
    image: "/assets/images/lineas-intervencion-territorial.jpg",
    alt: "Encuentro comunitario en un parque",
  },
] as const;
