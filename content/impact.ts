export type ImpactMetric = {
  value: string;
  label: string;
  pendingValidation: true;
};

export const impactMetrics: readonly ImpactMetric[] = [
  {
    value: "80 %",
    label: "Proyectos vinculados con conservación o restauración",
    pendingValidation: true,
  },
  {
    value: "47",
    label: "Proyectos de interventoría y seguimiento",
    pendingValidation: true,
  },
  {
    value: "36",
    label: "Proyectos de paisajismo y arboricultura",
    pendingValidation: true,
  },
  {
    value: "28",
    label: "Consultorías, estudios y diseños",
    pendingValidation: true,
  },
] as const;

export const environmentalEvidence = {
  title: "Conservación y restauración como eje transversal",
  description:
    "La conservación y restauración ecosistémica aparece como eje transversal en la trayectoria documentada de la Fundación.",
} as const;

export const environmentalAxes = [
  {
    title: "Restauración y conservación",
    description:
      "Procesos orientados a recuperar y sostener funciones ecosistémicas.",
  },
  {
    title: "Agroecología y producción sostenible",
    description: "Producción sostenible y conocimiento local.",
  },
  {
    title: "Gestión hídrica y residuos",
    description: "Agua y residuos con enfoque territorial.",
  },
  {
    title: "Biodiversidad y equilibrio ecosistémico",
    description: "Reconocer y cuidar la diversidad biológica.",
  },
] as const;

export const documentedFields = [
  "Interventoría y seguimiento",
  "Paisajismo y arboricultura urbana",
  "Consultorías, estudios y diseños",
  "Obras y adecuaciones",
  "Pedagogía y formación experiencial",
] as const;

export const impactProcess = [
  {
    index: "01",
    title: "Recopilar",
    description: "Recopilar evidencias y registros.",
  },
  {
    index: "02",
    title: "Verificar",
    description: "Verificar la información disponible.",
  },
  {
    index: "03",
    title: "Organizar",
    description: "Organizar resultados por campos y dimensiones.",
  },
  {
    index: "04",
    title: "Comunicar",
    description: "Comunicar aprendizajes y oportunidades de mejora.",
  },
] as const;
