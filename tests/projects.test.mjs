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

const content = await loadTypeScriptModule("../content/projects.ts");
const filters = await loadTypeScriptModule("../lib/project-filters.ts");

const {
  projectExperiences,
  projectDetails,
  projectFieldOptions,
  getProjectBySlug,
} = content;
const { EMPTY_PROJECT_FILTERS, clearProjectFilters, filterProjects } = filters;

test("conserva las nueve experiencias editoriales y los seis campos aprobados", () => {
  assert.equal(projectExperiences.length, 9);
  assert.deepEqual(projectFieldOptions, [
    "Restauración y conservación ambiental",
    "Pedagogía y formación experiencial",
    "Paisajismo y arboricultura urbana",
    "Interventoría y seguimiento",
    "Obras y adecuaciones",
    "Consultorías, estudios y diseños",
  ]);
});

test("solo publica el slug del detalle aprobado y rechaza uno inexistente", () => {
  assert.equal(projectDetails.length, 1);
  assert.deepEqual(
    projectDetails.map(({ slug }) => slug),
    ["recuperacion-participativa-de-ecosistemas"],
  );
  assert.equal(
    getProjectBySlug("recuperacion-participativa-de-ecosistemas")?.title,
    "Recuperación participativa de ecosistemas",
  );
  assert.equal(getProjectBySlug("proyecto-inexistente"), undefined);
});

test("filtra por búsqueda, campo, territorio y participación", () => {
  assert.deepEqual(
    filterProjects(projectExperiences, {
      ...EMPTY_PROJECT_FILTERS,
      search: "seguimiento integral",
    }).map(({ title }) => title),
    ["Seguimiento integral de proyectos"],
  );

  const restored = filterProjects(projectExperiences, {
    ...EMPTY_PROJECT_FILTERS,
    field: "Restauración y conservación ambiental",
    territory: "Valle del Cauca",
    participation: "Ejecución",
  });

  assert.deepEqual(
    restored.map(({ title }) => title),
    [
      "Recuperación participativa de ecosistemas",
      "Fortalecimiento de prácticas agroecológicas",
    ],
  );
});

test("limpiar filtros devuelve un estado nuevo y recupera todos los resultados", () => {
  const active = {
    search: "formación",
    field: "Pedagogía y formación experiencial",
    territory: "Valle del Cauca",
    participation: "Ejecución",
  };
  const cleared = clearProjectFilters();

  assert.notEqual(cleared, EMPTY_PROJECT_FILTERS);
  assert.deepEqual(cleared, EMPTY_PROJECT_FILTERS);
  assert.equal(filterProjects(projectExperiences, cleared).length, 9);
  assert.notDeepEqual(active, cleared);
});

test("el contenido tipado no añade clientes, contratos, presupuestos ni fechas", () => {
  const serialized = JSON.stringify({ projectExperiences, projectDetails });
  assert.doesNotMatch(
    serialized,
    /cliente|contrato|presupuesto|fecha de inicio|fecha de cierre|beneficiari/i,
  );
  assert.doesNotMatch(
    serialized,
    /territorio por validar|validación institucional|ficha técnica|informe de resultados/i,
  );
});
