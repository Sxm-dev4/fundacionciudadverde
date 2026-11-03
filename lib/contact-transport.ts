import type { ContactFormValues } from "@/lib/contact-form";

export type ContactTransportResult = Readonly<{ ok: true }>;
export type ContactTransport = (
  values: ContactFormValues,
) => Promise<ContactTransportResult>;

type Wait = () => Promise<void>;

const defaultWait: Wait = () =>
  new Promise((resolve) => {
    window.setTimeout(resolve, 500);
  });

export function createLocalContactTransport(
  wait: Wait = defaultWait,
): ContactTransport {
  return async () => {
    await wait();
    return { ok: true };
  };
}

/**
 * Demostración local: no envía ni persiste datos. Sustituir por una API real
 * con validación server-side, protección anti-spam y tratamiento seguro de PII.
 */
export const submitContactRequest = createLocalContactTransport();
