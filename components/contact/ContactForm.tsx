"use client";

import { type FormEvent, useReducer, useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { ContactOptionId } from "@/content/contact";
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  contactFormReducer,
  initialContactFormState,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormValues,
  validateContactForm,
} from "@/lib/contact-form";
import {
  submitContactRequest,
  type ContactTransport,
} from "@/lib/contact-transport";
import styles from "@/components/sections/ContactPage.module.css";

type ContactFormProps = Readonly<{
  onRequestTypeChange: (requestType: ContactOptionId | "") => void;
  onSuccess: () => void;
  requestType: ContactOptionId | "";
  transport?: ContactTransport;
}>;

const fieldOrder: readonly ContactField[] = [
  "name",
  "email",
  "phone",
  "requestType",
  "message",
  "consent",
];

const fieldIds: Record<ContactField, string> = {
  consent: "contact-consent",
  email: "contact-email",
  message: "contact-message",
  name: "contact-name",
  organization: "contact-organization",
  phone: "contact-phone",
  requestType: "contact-request-type",
};

function FieldError({ field, message }: { field: ContactField; message?: string }) {
  return message ? (
    <p className={styles.fieldError} id={`${fieldIds[field]}-error`}>
      {message}
    </p>
  ) : null;
}

function describedBy(field: ContactField, errors: ContactFieldErrors) {
  return errors[field] ? `${fieldIds[field]}-error` : undefined;
}

export function ContactForm({
  onRequestTypeChange,
  onSuccess,
  requestType,
  transport = submitContactRequest,
}: ContactFormProps) {
  const [formState, dispatch] = useReducer(
    contactFormReducer,
    initialContactFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = formState.status === "submitting";

  function focusFirstInvalid(errors: ContactFieldErrors) {
    const firstInvalid = fieldOrder.find((field) => errors[field]);
    if (!firstInvalid) return;

    window.requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>(`#${fieldIds[firstInvalid]}`)
        ?.focus();
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: ContactFormValues = {
      consent: formData.has("consent"),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      name: String(formData.get("name") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      requestType,
    };
    const errors = validateContactForm(values);

    if (Object.keys(errors).length > 0) {
      dispatch({ errors, type: "validation_failed" });
      focusFirstInvalid(errors);
      return;
    }

    dispatch({ type: "submit_started" });

    try {
      await transport(values);
      dispatch({ type: "submit_succeeded" });
      onSuccess();
    } catch {
      dispatch({
        message:
          "No fue posible completar la solicitud. Intenta nuevamente.",
        type: "submit_failed",
      });
    }
  }

  const errorEntries = Object.entries(formState.errors) as [
    ContactField,
    string,
  ][];

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <p className={styles.formKicker}>Formulario</p>
      <h2 id="contact-form-title">Envíanos tu solicitud</h2>
      <p className={styles.formHelp}>
        Los campos con asterisco son obligatorios.
      </p>

      {errorEntries.length > 0 ? (
        <div className={styles.errorSummary} role="alert">
          <p>Revisa los campos indicados:</p>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${fieldIds[field]}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Nombre *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Escribe tu nombre"
            aria-describedby={describedBy("name", formState.errors)}
            aria-invalid={Boolean(formState.errors.name)}
            disabled={isSubmitting}
            required
          />
          <FieldError field="name" message={formState.errors.name} />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-organization">Organización (opcional)</label>
          <input
            id="contact-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="Nombre de la organización"
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">Correo *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="nombre@organizacion.com"
            aria-describedby={describedBy("email", formState.errors)}
            aria-invalid={Boolean(formState.errors.email)}
            disabled={isSubmitting}
            required
          />
          <FieldError field="email" message={formState.errors.email} />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-phone">Teléfono (opcional)</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Número de contacto"
            aria-describedby={describedBy("phone", formState.errors)}
            aria-invalid={Boolean(formState.errors.phone)}
            disabled={isSubmitting}
          />
          <FieldError field="phone" message={formState.errors.phone} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-request-type">Tipo de solicitud *</label>
        <select
          id="contact-request-type"
          name="requestType"
          value={requestType}
          onChange={(event) =>
            onRequestTypeChange(event.target.value as ContactOptionId | "")
          }
          aria-describedby={describedBy("requestType", formState.errors)}
          aria-invalid={Boolean(formState.errors.requestType)}
          disabled={isSubmitting}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="projects">Proyectos</option>
          <option value="consulting">Consultorías</option>
          <option value="alliances">Alianzas</option>
        </select>
        <FieldError
          field="requestType"
          message={formState.errors.requestType}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Mensaje *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={CONTACT_MESSAGE_MAX_LENGTH}
          placeholder="Cuéntanos brevemente sobre tu solicitud"
          aria-describedby={describedBy("message", formState.errors)}
          aria-invalid={Boolean(formState.errors.message)}
          disabled={isSubmitting}
          required
        />
        <FieldError field="message" message={formState.errors.message} />
      </div>

      <div className={styles.consentField}>
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          aria-describedby={describedBy("consent", formState.errors)}
          aria-invalid={Boolean(formState.errors.consent)}
          disabled={isSubmitting}
          required
        />
        <div>
          <label htmlFor="contact-consent">
            Autorizo el tratamiento de mis datos para responder esta solicitud. *
          </label>
          <FieldError field="consent" message={formState.errors.consent} />
        </div>
      </div>

      {formState.submitError ? (
        <p className={styles.transportError} role="alert">
          {formState.submitError}
        </p>
      ) : null}

      <Button
        className={styles.submitButton}
        type="submit"
        disabled={isSubmitting}
        aria-describedby={isSubmitting ? "contact-submit-status" : undefined}
      >
        {isSubmitting ? "Enviando…" : "Enviar solicitud"}
      </Button>
      <span className="sr-only" id="contact-submit-status" aria-live="polite">
        {isSubmitting ? "Procesando la solicitud" : ""}
      </span>
    </form>
  );
}
