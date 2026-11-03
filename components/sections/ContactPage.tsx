"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumb } from "@/components/projects/Breadcrumb";
import { Button } from "@/components/ui/Button";
import {
  contactOptions,
  type ContactOptionId,
} from "@/content/contact";
import styles from "./ContactPage.module.css";

function ContactSuccess({ onReset }: { onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className={styles.successPage} id="contact-success">
      <section className={styles.confirmation} aria-labelledby="success-title">
        <div className={styles.successIcon} aria-hidden="true">
          ✓
        </div>
        <p className={styles.successKicker}>Solicitud enviada</p>
        <h1 id="success-title" ref={headingRef} tabIndex={-1}>
          Recibimos tu solicitud
        </h1>
        <p>
          Gracias por escribirnos. Puedes volver al Inicio o enviar otra
          solicitud.
        </p>
      </section>
      <section className={styles.successActions} aria-labelledby="next-title">
        <div className={styles.successActionsInner}>
          <h2 id="next-title">¿Qué quieres hacer ahora?</h2>
          <Button className={styles.successPrimary} href="/">
            Volver al Inicio
          </Button>
          <Button
            className={styles.successSecondary}
            variant="secondary"
            onClick={onReset}
          >
            Enviar otra solicitud
          </Button>
        </div>
      </section>
    </div>
  );
}

export function ContactPage() {
  const [requestType, setRequestType] = useState<ContactOptionId | "">("");
  const [isSuccess, setIsSuccess] = useState(false);

  function selectRequestType(id: ContactOptionId) {
    setRequestType(id);
    window.requestAnimationFrame(() => {
      document.getElementById("contact-request-type")?.focus();
    });
  }

  function resetForm() {
    setRequestType("");
    setIsSuccess(false);
  }

  if (isSuccess) {
    return <ContactSuccess onReset={resetForm} />;
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroInner}>
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Contacto y alianzas" },
            ]}
          />
          <p className={styles.heroKicker}>Contacto y alianzas</p>
          <h1 id="contact-title">Conversemos sobre el territorio</h1>
          <p className={styles.heroIntroduction}>
            Cuéntanos cómo podemos colaborar en proyectos, consultorías y
            alianzas.
          </p>
        </div>
      </section>

      <section className={styles.options} aria-labelledby="options-title">
        <div className={styles.contentContainer}>
          <p className={styles.optionsKicker}>¿Cómo podemos acompañarte?</p>
          <h2 id="options-title">
            <span className={styles.mobileOptionTitle}>
              Elige el tipo de solicitud
            </span>
            <span className={styles.desktopOptionTitle}>
              ¿Cómo podemos acompañarte?
            </span>
          </h2>
          <ul className={styles.optionList}>
            {contactOptions.map((option) => (
              <li key={option.id}>
                <h3>{option.label}</h3>
                <p>{option.description}</p>
                <Button
                  className={styles.selectButton}
                  variant="text"
                  onClick={() => selectRequestType(option.id)}
                >
                  Seleccionar
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.formSection} aria-labelledby="contact-form-title">
        <div className={styles.formContainer}>
          <ContactForm
            requestType={requestType}
            onRequestTypeChange={setRequestType}
            onSuccess={() => setIsSuccess(true)}
          />
          <aside className={styles.support} aria-labelledby="support-title">
            <h2 id="support-title">Tu solicitud empieza aquí</h2>
            <p>
              Escoge una opción, completa el formulario y revisa los campos
              obligatorios antes de enviar.
            </p>
            <div className={styles.supportNote}>
              <p>Antes de enviar</p>
              <p>
                Verifica que la información de los campos obligatorios esté
                completa.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
