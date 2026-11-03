import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

test("el listado anuncia resultados y expone filtros móviles como diálogo", async () => {
  const [page, mobileFilters] = await Promise.all([
    source("../components/sections/ProjectsPage.tsx"),
    source("../components/projects/ProjectFilterMobile.tsx"),
  ]);

  assert.match(page, /aria-live="polite"/);
  assert.match(page, /aria-labelledby="proyectos-title"/);
  assert.match(page, /filterButtonRef/);
  assert.match(page, /requestAnimationFrame/);
  assert.match(mobileFilters, /role="dialog"/);
  assert.match(mobileFilters, /aria-modal="true"/);
  assert.match(mobileFilters, /Filtros seleccionados/);
  assert.match(mobileFilters, /Cerrar filtros/);
  assert.match(mobileFilters, /Aplicar filtros/);
});

test("la ruta dinámica genera metadata, slugs estáticos y usa notFound", async () => {
  const route = await source("../app/proyectos/[slug]/page.tsx");

  assert.match(route, /generateMetadata/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /notFound\(\)/);
  assert.match(route, /params: Promise<\{ slug: string \}>/);
});

test("las migas de pan se implementan como navegación etiquetada", async () => {
  const breadcrumb = await source("../components/projects/Breadcrumb.tsx");

  assert.match(breadcrumb, /<nav/);
  assert.match(breadcrumb, /aria-label="Migas de pan"/);
  assert.match(breadcrumb, /aria-current=\{isCurrent \? "page" : undefined\}/);
});

test("las tarjetas sin slug no exponen estados internos de QA", async () => {
  const card = await source("../components/projects/ProjectCard.tsx");

  assert.doesNotMatch(card, /pendiente|validación|próximamente/i);
});
