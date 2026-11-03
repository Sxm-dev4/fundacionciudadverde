export type ContactOptionId = "projects" | "consulting" | "alliances";

export type ContactOption = Readonly<{
  description: string;
  id: ContactOptionId;
  label: string;
}>;

export const contactOptions: readonly ContactOption[] = [
  {
    id: "projects",
    label: "Proyectos",
    description:
      "Comparte una iniciativa o necesidad relacionada con el territorio.",
  },
  {
    id: "consulting",
    label: "Consultorías",
    description: "Solicita orientación sobre un proceso ambiental o técnico.",
  },
  {
    id: "alliances",
    label: "Alianzas",
    description: "Explora oportunidades de colaboración institucional.",
  },
] as const;
