import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const sourceUrl = new URL("../content/action-lines.ts", import.meta.url);
const source = await readFile(sourceUrl, "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: "action-lines.ts",
});
const content = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const {
  actionFields,
  complementaryCapabilities,
  experienceMetrics,
  methodologySteps,
  relatedApplications,
  transversalCapabilities,
} = content;

const approvedTitles = [
  "Restauración y conservación ambiental",
  "Pedagogía y formación experiencial",
  "Paisajismo y arboricultura urbana",
  "Interventoría y seguimiento",
  "Obras y adecuaciones",
  "Consultorías, estudios y diseños",
];

test("expone los seis campos estratégicos aprobados y en el orden editorial", () => {
  assert.equal(actionFields.length, 6);
  assert.deepEqual(
    actionFields.map(({ title }) => title),
    approvedTitles,
  );
});

test("cada campo tiene contenido y un icono SVG local", () => {
  for (const field of actionFields) {
    assert.match(field.index, /^0[1-6]$/);
    assert.ok(field.description.length > 20);
    assert.ok(field.capabilities.length >= 3);
    assert.match(field.icon, /^\/assets\/icons\/.+\.svg$/);
  }
});

test("las métricas documentadas no añaden clientes, municipios ni resultados", () => {
  assert.deepEqual(
    experienceMetrics.map(({ value }) => value),
    ["197", "47", "36", "28", "16", "15"],
  );

  const serialized = JSON.stringify({ actionFields, experienceMetrics });
  assert.doesNotMatch(serialized, /cliente|municipio|testimonio|beneficiad/i);
});

test("protege la estructura editorial completa aprobada", () => {
  assert.deepEqual(
    methodologySteps.map(({ title }) => title),
    [
      "Comprender el territorio",
      "Formular la solución",
      "Diseñar y planificar",
      "Ejecutar y acompañar",
      "Medir y documentar",
    ],
  );
  assert.equal(transversalCapabilities.length, 6);
  assert.deepEqual(
    complementaryCapabilities.map(({ title }) => title),
    ["Gestión social", "Logística y suministros"],
  );
  assert.deepEqual(
    relatedApplications.map(({ title }) => title),
    [
      "Restauración ambiental",
      "Formación comunitaria",
      "Intervención territorial",
    ],
  );
  for (const application of relatedApplications) {
    assert.match(application.image, /^\/assets\/images\/lineas-.+\.jpg$/);
    assert.ok(application.alt.length > 10);
  }
});
