import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function source(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

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

const content = await loadTypeScriptModule("../content/impact.ts");
const {
  impactMetrics,
  environmentalEvidence,
  environmentalAxes,
  impactProcess,
} = content;

test("expone únicamente los cuatro indicadores aprobados y marca su validación interna", () => {
  assert.deepEqual(
    impactMetrics.map(({ value, label }) => [value, label]),
    [
      ["80 %", "Proyectos vinculados con conservación o restauración"],
      ["47", "Proyectos de interventoría y seguimiento"],
      ["36", "Proyectos de paisajismo y arboricultura"],
      ["28", "Consultorías, estudios y diseños"],
    ],
  );
  assert.ok(impactMetrics.every(({ pendingValidation }) => pendingValidation));
});

test("la dimensión ambiental usa evidencia textual y no un dataset sin validar", () => {
  assert.deepEqual(Object.keys(environmentalEvidence).sort(), [
    "description",
    "title",
  ]);
  assert.match(environmentalEvidence.title, /conservación|restauración/i);
  assert.doesNotMatch(JSON.stringify(environmentalEvidence), /\d+\s?%/);
});

test("el contenido no añade resultados o magnitudes prohibidas", () => {
  const serialized = JSON.stringify({
    environmentalEvidence,
    environmentalAxes,
    impactProcess,
  });

  assert.doesNotMatch(
    serialized,
    /beneficiari|árbol|hectárea|tonelada|municipio|serie histórica|evolución temporal|antes y después/i,
  );
  assert.doesNotMatch(serialized, /\d+\s?%/);
});

test("los ejes y el proceso tienen etiquetas textuales independientes del color", () => {
  assert.equal(environmentalAxes.length, 4);
  assert.equal(impactProcess.length, 4);

  for (const item of [...environmentalAxes, ...impactProcess]) {
    assert.ok(item.title.length > 3);
    assert.ok(item.description.length > 15);
  }
});

test("la vista de Impacto expone una jerarquía semántica y métricas como lista", async () => {
  const page = await source("../components/sections/ImpactPage.tsx");

  assert.match(page, /<h1/);
  assert.match(page, /aria-labelledby="impacto-title"/);
  assert.match(page, /aria-label="Indicadores de impacto"/);
  assert.match(page, /<ul[^>]*className=\{styles\.metricsGrid\}/);
  assert.match(page, /<figure/);
  assert.match(page, /<figcaption/);
  assert.doesNotMatch(page, /role="tablist"|role="tab"/);
  assert.doesNotMatch(page, /Más de dos décadas/);
  assert.doesNotMatch(page, /impactStories|Cali|Valle del Cauca/);
  assert.equal((page.match(/href="\/proyectos"/g) ?? []).length, 2);
});

test("la ruta de Impacto define metadata específica", async () => {
  const route = await source("../app/impacto/page.tsx");

  assert.match(route, /title: "Impacto"/);
  assert.match(route, /description:/);
  assert.match(route, /<ImpactPage/);
});

test("la vista larga contiene el overflow horizontal en su raíz", async () => {
  const css = await source("../components/sections/ImpactPage.module.css");

  assert.match(css, /\.page\s*\{[^}]*overflow-x:\s*hidden/s);
});
