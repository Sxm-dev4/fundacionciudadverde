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

const content = await loadTypeScriptModule("../content/transparency.ts");
const [pageSource, componentSource, stylesSource] = await Promise.all([
  readFile(new URL("../app/transparencia/page.tsx", import.meta.url), "utf8"),
  readFile(
    new URL("../components/sections/TransparencyPage.tsx", import.meta.url),
    "utf8",
  ),
  readFile(
    new URL("../components/sections/TransparencyPage.module.css", import.meta.url),
    "utf8",
  ),
]);

const {
  transparencyCategories,
  transparencyDocuments,
  transparencyView,
} = content;

test("expone únicamente las cinco categorías documentales aprobadas", () => {
  assert.deepEqual(
    transparencyCategories.map(({ label }) => label),
    [
      "Informes de gestión",
      "Estados financieros",
      "Certificaciones",
      "Políticas institucionales",
      "Régimen tributario especial",
    ],
  );
});

test("mantiene vacío el catálogo público sin archivos ni metadatos ficticios", () => {
  assert.deepEqual(transparencyDocuments, []);
  assert.doesNotMatch(
    JSON.stringify(content),
    /Manual de marca FCV|FCV- Análisis|\.pdf|download|href|fileSize|publishedAt/i,
  );
});

test("deshabilita la consulta y describe el estado vacío cuando no hay documentos", () => {
  assert.deepEqual(transparencyView, {
    controlsDisabled: true,
    count: 0,
    emptyDescription:
      "Solicita información institucional para recibir orientación sobre la disponibilidad de documentos.",
    emptyTitle:
      "No hay documentos confirmados para los filtros seleccionados.",
    hasDocuments: false,
    status: "Sin documentos",
  });
});

test("la ruta define metadata propia sin esquema de documentos", () => {
  assert.match(pageSource, /createPageMetadata/);
  assert.match(pageSource, /title:\s*"Transparencia"/);
  assert.match(pageSource, /path:\s*"\/transparencia"/);
  assert.doesNotMatch(pageSource, /application\/ld\+json|Document|DigitalDocument/);
});

test("la vista conserva controles etiquetados, deshabilitados y un estado anunciado", () => {
  assert.match(componentSource, /<fieldset[\s\S]*disabled=\{view\.controlsDisabled\}/);
  assert.match(componentSource, />Buscar documento<\/span>/);
  assert.match(componentSource, />Categoría del documento<\/span>/);
  assert.match(componentSource, />Año del documento<\/span>/);
  assert.match(componentSource, /role="status"/);
  assert.match(componentSource, /aria-live="polite"/);
  assert.match(componentSource, /href="\/contacto"/);
  assert.doesNotMatch(
    componentSource,
    /Manual de marca FCV|FCV- Análisis|correo|teléfono|dirección/i,
  );
});

test("los estilos contienen la raíz y los dos cambios responsive aprobados", () => {
  assert.match(stylesSource, /\.page\s*\{[\s\S]*overflow-x:\s*hidden/);
  assert.match(stylesSource, /min-height:\s*var\(--control-min-height\)/);
  assert.match(stylesSource, /@media \(min-width:\s*768px\)/);
  assert.match(stylesSource, /@media \(min-width:\s*1024px\)/);
});
