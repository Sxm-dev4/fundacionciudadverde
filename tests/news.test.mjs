import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function loadTypeScriptModule(relativePath) {
  const sourceUrl = new URL(relativePath, import.meta.url);
  const source = await readFile(sourceUrl, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: sourceUrl.pathname,
  });

  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
}

const content = await loadTypeScriptModule("../content/news.ts");
const search = await loadTypeScriptModule("../lib/news-search.ts");
const breadcrumbCss = await readFile(
  new URL("../components/projects/Breadcrumb.module.css", import.meta.url),
  "utf8",
);

const { getNewsArticle, newsArticles, newsItems } = content;
const { filterNewsItems, normalizeNewsQuery } = search;

test("publica un único detalle respaldado y rechaza cualquier otro slug", () => {
  assert.deepEqual(
    newsArticles.map(({ slug }) => slug),
    ["feria-de-humedales-2024"],
  );
  assert.equal(getNewsArticle("feria-de-humedales-2024")?.title, "Feria de Humedales 2024");
  assert.equal(getNewsArticle("contenido-inexistente"), undefined);
});

test("el artículo no expone autor, fecha, tiempo de lectura ni resultados ficticios", () => {
  const article = newsArticles[0];
  const serialized = JSON.stringify(article);

  assert.deepEqual(
    Object.keys(article).sort(),
    [
      "description",
      "evidence",
      "gallery",
      "hero",
      "introduction",
      "paragraphs",
      "slug",
      "title",
    ],
  );
  assert.doesNotMatch(
    serialized,
    /author|autor|published|fecha|readTime|tiempo de lectura|resultado|testimonio/i,
  );
  assert.doesNotMatch(
    serialized,
    /educación ambiental|participación comunitaria|territorio|explicación|recorridos/i,
  );
  assert.equal(
    article.evidence.title,
    "Montaje · Conversación en carpa · Exhibición comunitaria",
  );
});

test("usa exactamente las tres fotografías aprobadas de Feria de Humedales", () => {
  const article = newsArticles[0];

  assert.equal(
    article.hero.image,
    "/assets/images/actualidad-feria-humedales-2024-2.jpg",
  );
  assert.deepEqual(
    article.gallery.map(({ image }) => image),
    [
      "/assets/images/actualidad-feria-humedales-2024-3.jpg",
      "/assets/images/actualidad-feria-humedales-2024-6.jpg",
    ],
  );
});

test("solo la Feria de Humedales ofrece navegación a un detalle", () => {
  assert.equal(newsItems.filter(({ href }) => href).length, 1);
  assert.equal(newsItems.find(({ href }) => href)?.title, "Feria de Humedales 2024");
});

test("las piezas sin detalle usan encabezados descriptivos respaldados por las fotografías", () => {
  assert.deepEqual(
    newsItems.slice(1).map(({ title }) => title),
    [
      "Conversación entre productoras y visitantes",
      "Actividad de formación al aire libre",
      "Observación con binoculares durante un recorrido",
    ],
  );
});

test("filtra títulos y resúmenes sin depender de mayúsculas o tildes", () => {
  assert.deepEqual(
    filterNewsItems(newsItems, "binoculares").map(({ id }) => id),
    ["recorridos-pedagogia-ambiental"],
  );
  assert.deepEqual(filterNewsItems(newsItems, "  "), newsItems);
  assert.equal(normalizeNewsQuery("  pedagogía  "), "pedagogía");
  assert.equal(normalizeNewsQuery("   "), "");
});

test("las migas de pan conservan un área táctil mínima en mobile", () => {
  assert.match(breadcrumbCss, /min-inline-size:\s*var\(--control-min-height\)/);
  assert.match(breadcrumbCss, /min-block-size:\s*var\(--control-min-height\)/);
});
