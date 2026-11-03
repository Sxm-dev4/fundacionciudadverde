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

const content = await loadTypeScriptModule("../content/contact.ts");
const form = await loadTypeScriptModule("../lib/contact-form.ts");
const transport = await loadTypeScriptModule("../lib/contact-transport.ts");
const [pageSource, formSource, pageViewSource, stylesSource, developmentSource] =
  await Promise.all([
    readFile(new URL("../app/contacto/page.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../components/contact/ContactForm.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../components/sections/ContactPage.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../components/sections/ContactPage.module.css", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../DEVELOPMENT.md", import.meta.url), "utf8"),
  ]);

const validValues = {
  consent: true,
  email: "persona@organizacion.org",
  message: "Queremos conversar sobre una iniciativa ambiental.",
  name: "Persona solicitante",
  organization: "",
  phone: "",
  requestType: "projects",
};

test("expone únicamente las tres opciones de contacto aprobadas", () => {
  assert.deepEqual(
    content.contactOptions.map(({ label }) => label),
    ["Proyectos", "Consultorías", "Alianzas"],
  );
});

test("exige nombre, correo, tipo, mensaje y consentimiento", () => {
  const errors = form.validateContactForm({
    consent: false,
    email: "",
    message: "",
    name: "",
    organization: "",
    phone: "",
    requestType: "",
  });

  assert.deepEqual(Object.keys(errors), [
    "name",
    "email",
    "requestType",
    "message",
    "consent",
  ]);
  assert.equal(errors.organization, undefined);
  assert.equal(errors.phone, undefined);
});

test("rechaza correo inválido y acepta un correo válido", () => {
  assert.equal(
    form.validateContactForm({ ...validValues, email: "correo-invalido" }).email,
    "Escribe un correo válido.",
  );
  assert.equal(form.validateContactForm(validValues).email, undefined);
});

test("valida el teléfono solo cuando se completa", () => {
  assert.equal(form.validateContactForm(validValues).phone, undefined);
  assert.equal(
    form.validateContactForm({ ...validValues, phone: "123" }).phone,
    "Escribe un número de teléfono válido.",
  );
  assert.equal(
    form.validateContactForm({ ...validValues, phone: "+57 300 123 4567" })
      .phone,
    undefined,
  );
});

test("limita el mensaje sin imponer contenido institucional ficticio", () => {
  assert.equal(form.CONTACT_MESSAGE_MAX_LENGTH, 1200);
  assert.equal(
    form.validateContactForm({
      ...validValues,
      message: "a".repeat(form.CONTACT_MESSAGE_MAX_LENGTH + 1),
    }).message,
    `El mensaje no puede superar ${form.CONTACT_MESSAGE_MAX_LENGTH} caracteres.`,
  );
});

test("modela idle, loading, success, error y reinicio", () => {
  const initial = form.initialContactFormState;
  const loading = form.contactFormReducer(initial, { type: "submit_started" });
  const success = form.contactFormReducer(loading, { type: "submit_succeeded" });
  const reset = form.contactFormReducer(success, { type: "reset" });
  const failure = form.contactFormReducer(loading, {
    message: "No fue posible completar la solicitud.",
    type: "submit_failed",
  });

  assert.equal(initial.status, "idle");
  assert.equal(loading.status, "submitting");
  assert.equal(success.status, "success");
  assert.equal(failure.status, "error");
  assert.equal(reset.status, "idle");
});

test("el transporte local no persiste ni envía datos y es reemplazable", async () => {
  let waited = false;
  const submit = transport.createLocalContactTransport(async () => {
    waited = true;
  });

  const result = await submit(validValues);

  assert.equal(waited, true);
  assert.deepEqual(result, { ok: true });
});

test("la ruta define metadata propia y canonical de contacto", () => {
  assert.match(pageSource, /createPageMetadata/);
  assert.match(pageSource, /title:\s*"Contacto y alianzas"/);
  assert.match(pageSource, /path:\s*"\/contacto"/);
});

test("el formulario conecta labels, errores, foco y estados accesibles", () => {
  assert.match(formSource, /<form[\s\S]*noValidate/);
  assert.match(formSource, /htmlFor="contact-name"/);
  assert.match(formSource, /htmlFor="contact-email"/);
  assert.match(formSource, /htmlFor="contact-consent"/);
  assert.match(formSource, /aria-describedby=/);
  assert.match(formSource, /aria-invalid=/);
  assert.match(formSource, /transport\s*=\s*submitContactRequest/);
  assert.match(formSource, /await transport\(values\)/);
  assert.ok((formSource.match(/\brequired\b/g) ?? []).length >= 5);
  assert.match(formSource, /role="alert"/);
  assert.match(formSource, /querySelector<HTMLElement>/);
  assert.match(formSource, /status === "submitting"/);
  assert.doesNotMatch(formSource, /localStorage|dangerouslySetInnerHTML/);
});

test("la experiencia incluye D10, M10 y las acciones de éxito M13", () => {
  assert.match(pageViewSource, /Conversemos sobre el territorio/);
  assert.match(pageViewSource, /¿Cómo podemos acompañarte\?/);
  assert.match(pageViewSource, /Recibimos tu solicitud/);
  assert.match(pageViewSource, /Volver al Inicio/);
  assert.match(pageViewSource, /Enviar otra solicitud/);
  assert.match(pageViewSource, /href="\/"/);
  assert.doesNotMatch(
    pageViewSource,
    /WhatsApp|dirección|tiempo de respuesta|fundacioncv24@gmail\.com/i,
  );
});

test("los estilos contienen la raíz y los breakpoints fluidos aprobados", () => {
  assert.match(
    stylesSource,
    /\.page,\s*\n\.successPage\s*\{[\s\S]*overflow-x:\s*hidden/,
  );
  assert.match(stylesSource, /min-height:\s*var\(--control-min-height\)/);
  assert.match(stylesSource, /@media \(min-width:\s*768px\)/);
  assert.match(stylesSource, /@media \(min-width:\s*1024px\)/);
  assert.match(
    stylesSource,
    /@media \(min-width:\s*1024px\)[\s\S]*\.selectButton\s*\{\s*display:\s*none;/,
  );
});

test("documenta la sustitución segura del transporte local", () => {
  assert.match(developmentSource, /validación server-side/i);
  assert.match(developmentSource, /anti-spam/i);
  assert.match(developmentSource, /no envía ni persiste/i);
});
