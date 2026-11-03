import type { ContactOptionId } from "@/content/contact";

export const CONTACT_MESSAGE_MAX_LENGTH = 1200;

export type ContactFormValues = Readonly<{
  consent: boolean;
  email: string;
  message: string;
  name: string;
  organization: string;
  phone: string;
  requestType: ContactOptionId | "";
}>;

export type ContactField = keyof ContactFormValues;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactFormState = Readonly<{
  errors: ContactFieldErrors;
  status: "idle" | "submitting" | "success" | "error";
  submitError: string | null;
}>;

export type ContactFormAction =
  | Readonly<{ errors: ContactFieldErrors; type: "validation_failed" }>
  | Readonly<{ type: "submit_started" }>
  | Readonly<{ type: "submit_succeeded" }>
  | Readonly<{ message: string; type: "submit_failed" }>
  | Readonly<{ type: "reset" }>;

export const initialContactFormState: ContactFormState = {
  errors: {},
  status: "idle",
  submitError: null,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneCharactersPattern = /^\+?[0-9()\s-]+$/;

export function validateContactForm(
  values: ContactFormValues,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Escribe tu nombre.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Escribe tu correo.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Escribe un correo válido.";
  }

  const phone = values.phone.trim();
  if (phone) {
    const digitCount = phone.replace(/\D/g, "").length;
    if (
      !phoneCharactersPattern.test(phone) ||
      digitCount < 7 ||
      digitCount > 15
    ) {
      errors.phone = "Escribe un número de teléfono válido.";
    }
  }

  if (!values.requestType) {
    errors.requestType = "Selecciona un tipo de solicitud.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Escribe un mensaje.";
  } else if (message.length > CONTACT_MESSAGE_MAX_LENGTH) {
    errors.message = `El mensaje no puede superar ${CONTACT_MESSAGE_MAX_LENGTH} caracteres.`;
  }

  if (!values.consent) {
    errors.consent = "Debes autorizar el tratamiento de datos.";
  }

  return errors;
}

export function contactFormReducer(
  state: ContactFormState,
  action: ContactFormAction,
): ContactFormState {
  switch (action.type) {
    case "validation_failed":
      return { errors: action.errors, status: "idle", submitError: null };
    case "submit_started":
      return { errors: {}, status: "submitting", submitError: null };
    case "submit_succeeded":
      return { errors: {}, status: "success", submitError: null };
    case "submit_failed":
      return { errors: {}, status: "error", submitError: action.message };
    case "reset":
      return initialContactFormState;
    default:
      return state;
  }
}
