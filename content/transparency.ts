export const transparencyCategories = [
  { id: "reports", label: "Informes de gestión" },
  { id: "financial-statements", label: "Estados financieros" },
  { id: "certifications", label: "Certificaciones" },
  { id: "institutional-policies", label: "Políticas institucionales" },
  { id: "special-tax-regime", label: "Régimen tributario especial" },
] as const;

export type TransparencyCategory =
  (typeof transparencyCategories)[number]["id"];

export type TransparencyDocument = {
  category: TransparencyCategory;
  title: string;
};

export const transparencyDocuments: readonly TransparencyDocument[] = [];

export const transparencyView = {
  controlsDisabled: true,
  count: 0,
  emptyDescription:
    "Solicita información institucional para recibir orientación sobre la disponibilidad de documentos.",
  emptyTitle:
    "No hay documentos confirmados para los filtros seleccionados.",
  hasDocuments: false,
  status: "Sin documentos",
} as const;
