import type { Metadata, MetadataRoute } from "next";

export const SITE_NAME = "Fundación Ciudad Verde";
export const SITE_DESCRIPTION =
  "Experiencia ambiental, social y técnica para transformar territorios.";
export const SITE_LOCALE = "es_CO";
export const SITE_URL_FALLBACK = "http://localhost:3000";
export const OPEN_GRAPH_IMAGE_PATH = "/opengraph-image";
export const OFFICIAL_LOGO_PATH =
  "/assets/logos/fcv-logo-horizontal-green.svg";

export const PUBLIC_ROUTES = [
  "/",
  "/lineas-de-accion",
  "/proyectos",
  "/proyectos/recuperacion-participativa-de-ecosistemas",
  "/impacto",
  "/actualidad",
  "/actualidad/feria-de-humedales-2024",
  "/transparencia",
  "/contacto",
] as const;

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    try {
      return new URL(new URL(configuredUrl).origin);
    } catch {
      // El build local debe seguir funcionando; producción exige una URL válida.
    }
  }

  return new URL(SITE_URL_FALLBACK);
}

function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

type PageMetadataInput = Readonly<{
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}>;

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: path,
      images: [
        {
          url: OPEN_GRAPH_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  };
}

export function createSitemapEntries(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((path) => ({ url: absoluteUrl(path) }));
}

export function createRobotsConfig(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

export function createGlobalStructuredData() {
  const siteUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: SITE_NAME,
        url: siteUrl,
        logo: absoluteUrl(OFFICIAL_LOGO_PATH),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: SITE_NAME,
        url: siteUrl,
        inLanguage: "es",
        publisher: { "@id": `${siteUrl}#organization` },
      },
    ],
  };
}
