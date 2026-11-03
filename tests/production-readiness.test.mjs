import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function readOrEmpty(relativePath) {
  try {
    return await readFile(new URL(relativePath, import.meta.url), "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

async function loadOptionalTypeScriptModule(relativePath) {
  const source = await readOrEmpty(relativePath);
  if (!source) return null;

  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  });

  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
}

const expectedRoutes = [
  "/",
  "/lineas-de-accion",
  "/proyectos",
  "/proyectos/recuperacion-participativa-de-ecosistemas",
  "/impacto",
  "/actualidad",
  "/actualidad/feria-de-humedales-2024",
  "/transparencia",
  "/contacto",
];

test("publica únicamente las nueve URL respaldadas en el sitemap", async () => {
  const site = await loadOptionalTypeScriptModule("../lib/site.ts");
  assert.ok(site, "Falta la configuración SEO compartida");
  assert.deepEqual(site.PUBLIC_ROUTES, expectedRoutes);
  assert.deepEqual(
    site.createSitemapEntries().map(({ url }) => new URL(url).pathname),
    expectedRoutes,
  );
});

test("genera canonical, Open Graph y Twitter coherentes sin inventar datos", async () => {
  const site = await loadOptionalTypeScriptModule("../lib/site.ts");
  assert.ok(site, "Falta la configuración SEO compartida");

  const metadata = site.createPageMetadata({
    title: "Impacto",
    description: "Descripción respaldada.",
    path: "/impacto",
  });

  assert.deepEqual(metadata.alternates, { canonical: "/impacto" });
  assert.equal(metadata.openGraph.url, "/impacto");
  assert.equal(metadata.openGraph.title, "Impacto | Fundación Ciudad Verde");
  assert.equal(metadata.twitter.card, "summary_large_image");
  assert.equal(metadata.twitter.title, "Impacto | Fundación Ciudad Verde");
  assert.equal(metadata.authors, undefined);
});

test("robots referencia el sitemap del dominio configurado", async () => {
  const site = await loadOptionalTypeScriptModule("../lib/site.ts");
  assert.ok(site, "Falta la configuración SEO compartida");
  const robots = site.createRobotsConfig();

  assert.deepEqual(robots.rules, { userAgent: "*", allow: "/" });
  assert.equal(new URL(robots.sitemap).pathname, "/sitemap.xml");
});

test("configura headers de seguridad y limita HSTS a producción", async () => {
  const security = await loadOptionalTypeScriptModule("../lib/security.ts");
  assert.ok(security, "Falta la configuración de seguridad");

  const development = security.createSecurityHeaders(false);
  const production = security.createSecurityHeaders(true);
  const developmentKeys = development.map(({ key }) => key);
  const productionKeys = production.map(({ key }) => key);

  for (const key of [
    "Content-Security-Policy",
    "Permissions-Policy",
    "Referrer-Policy",
    "X-Content-Type-Options",
    "X-Frame-Options",
  ]) {
    assert.ok(developmentKeys.includes(key), `Falta ${key}`);
  }
  assert.equal(developmentKeys.includes("Strict-Transport-Security"), false);
  assert.equal(productionKeys.includes("Strict-Transport-Security"), true);
});

test("ofrece 404 y error inesperado accesibles con recuperación", async () => {
  const [notFound, errorBoundary] = await Promise.all([
    readOrEmpty("../app/not-found.tsx"),
    readOrEmpty("../app/error.tsx"),
  ]);

  assert.match(notFound, /Página no encontrada/);
  assert.match(notFound, /href="\/"/);
  assert.match(notFound, /Navegación útil|Navegación principal/);
  assert.match(errorBoundary, /"use client"/);
  assert.match(errorBoundary, /reset\(\)/);
  assert.doesNotMatch(errorBoundary, /error\.message|error\.stack/);
});

test("usa el logo oficial para favicon y Open Graph", async () => {
  const [site, openGraph] = await Promise.all([
    loadOptionalTypeScriptModule("../lib/site.ts"),
    readOrEmpty("../app/opengraph-image.tsx"),
  ]);

  assert.ok(site, "Falta la configuración SEO compartida");
  assert.equal(
    site.OFFICIAL_LOGO_PATH,
    "/assets/logos/fcv-logo-horizontal-green.svg",
  );
  assert.match(openGraph, /fcv-logo-horizontal-green\.svg/);
  assert.match(openGraph, /width=\{500\}/);
  assert.match(openGraph, /1200/);
  assert.match(openGraph, /630/);
});

test("no incorpora trackers, cookies no esenciales ni datos de contacto no confirmados", async () => {
  const productionFiles = await Promise.all([
    readOrEmpty("../app/layout.tsx"),
    readOrEmpty("../components/global/Footer.tsx"),
    readOrEmpty("../components/sections/ContactPage.tsx"),
  ]);
  const source = productionFiles.join("\n");

  assert.doesNotMatch(source, /GoogleAnalytics|gtag\(|facebook pixel|hotjar/i);
  assert.doesNotMatch(source, /WhatsApp|\+57|@gmail\.com/i);
});

test("contiene el overflow raíz sin bloquear carruseles internos", async () => {
  const globalStyles = await readOrEmpty("../app/globals.css");
  assert.match(globalStyles, /html\s*\{[\s\S]*overflow-x:\s*clip;/);
});

test("el menú móvil se cierra con Escape y devuelve el foco", async () => {
  const headerMobile = await readOrEmpty(
    "../components/global/HeaderMobile.tsx",
  );
  assert.match(headerMobile, /event\.key\s*===\s*"Escape"/);
  assert.match(headerMobile, /menuButtonRef\.current\?\.focus\(\)/);
});

test("las vistas públicas no muestran mensajes internos de QA", async () => {
  const publicViews = await Promise.all([
    readOrEmpty("../components/sections/HomePage.tsx"),
    readOrEmpty("../components/sections/ProjectsPage.tsx"),
    readOrEmpty("../components/projects/ProjectDetail.tsx"),
    readOrEmpty("../components/projects/ProjectCard.tsx"),
  ]);
  assert.doesNotMatch(
    publicViews.join("\n"),
    /pendiente de validación|contenido editorial de muestra|en esta fase|no verificad[ao]s?/i,
  );
});

test("los filtros no publican periodos de proyectos sin validar", async () => {
  const filters = await Promise.all([
    readOrEmpty("../components/projects/ProjectFilters.tsx"),
    readOrEmpty("../components/projects/ProjectFilterMobile.tsx"),
  ]);
  const source = filters.join("\n");

  assert.doesNotMatch(source, /2005–2010|2011–2015|2016–2020|2021–2026/);
  assert.doesNotMatch(source, /<legend>Periodo<\/legend>/);
  assert.doesNotMatch(source, /<option>Periodo<\/option>/);
});

test("el detalle no atribuye ubicación ni documentos específicos sin respaldo", async () => {
  const detail = await readOrEmpty(
    "../components/projects/ProjectDetail.tsx",
  );

  assert.doesNotMatch(detail, /La experiencia se presenta a escala general/);
  assert.doesNotMatch(detail, /Consultar información del proyecto/);
  assert.match(detail, /Alcance territorial institucional/);
  assert.match(detail, />Ir a Transparencia</);
});
