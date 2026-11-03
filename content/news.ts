export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  href?: `/actualidad/${string}`;
};

export type NewsArticle = {
  slug: string;
  title: string;
  introduction: string;
  description: string;
  hero: { image: string; alt: string };
  paragraphs: readonly string[];
  evidence: { title: string; description: string };
  gallery: readonly { image: string; alt: string }[];
};

export const newsItems: readonly NewsItem[] = [
  {
    id: "feria-humedales-2024",
    title: "Feria de Humedales 2024",
    summary:
      "Conversaciones en una carpa, una exhibición comunitaria y actividades ambientales al aire libre.",
    image: "/assets/images/actualidad-feria-humedales-2024-2.jpg",
    alt: "Facilitadora conversando con una asistente en una carpa de la Feria de Humedales 2024",
    href: "/actualidad/feria-de-humedales-2024",
  },
  {
    id: "encuentro-mercados-agroecologia-2025",
    title: "Conversación entre productoras y visitantes",
    summary:
      "Registro de una conversación entre productoras y visitantes durante un encuentro de mercado agroecológico.",
    image: "/assets/images/actualidad-encuentro-agroecologia-2025.jpg",
    alt: "Productoras y visitantes conversando en un puesto de mercado agroecológico",
  },
  {
    id: "formacion-ambiental-ciudadana",
    title: "Actividad de formación al aire libre",
    summary:
      "Audiencia reunida durante una actividad de formación ambiental al aire libre.",
    image: "/assets/images/actualidad-formacion-ambiental.jpg",
    alt: "Personas reunidas durante una formación ambiental al aire libre",
  },
  {
    id: "recorridos-pedagogia-ambiental",
    title: "Observación con binoculares durante un recorrido",
    summary:
      "Observación del entorno natural durante un recorrido de pedagogía ambiental.",
    image: "/assets/images/actualidad-recorrido-pedagogia.jpg",
    alt: "Participante observando el entorno natural con binoculares",
  },
] as const;

export const newsArticles: readonly NewsArticle[] = [
  {
    slug: "feria-de-humedales-2024",
    title: "Feria de Humedales 2024",
    introduction:
      "Una serie fotográfica de una actividad ambiental al aire libre.",
    description:
      "Registro fotográfico de una actividad ambiental, conversaciones en una carpa y una exhibición comunitaria en parque.",
    hero: {
      image: "/assets/images/actualidad-feria-humedales-2024-2.jpg",
      alt: "Facilitadora conversando con una asistente en una carpa de la Feria de Humedales 2024",
    },
    paragraphs: [
      "La serie fotográfica Feria de Humedales 2024 registra señalización y montaje de una actividad ambiental, conversaciones en una carpa y una exhibición comunitaria en parque.",
      "El material disponible también muestra visitantes participando en actividades al aire libre.",
    ],
    evidence: {
      title: "Montaje · Conversación en carpa · Exhibición comunitaria",
      description:
        "Las imágenes muestran una actividad en espacio abierto y visitantes reunidos alrededor del material expuesto.",
    },
    gallery: [
      {
        image: "/assets/images/actualidad-feria-humedales-2024-3.jpg",
        alt: "Exhibición comunitaria de la Feria de Humedales 2024 en un parque",
      },
      {
        image: "/assets/images/actualidad-feria-humedales-2024-6.jpg",
        alt: "Visitantes participando en una actividad al aire libre durante la Feria de Humedales 2024",
      },
    ],
  },
] as const;

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
