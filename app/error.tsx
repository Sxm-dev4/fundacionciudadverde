"use client";

import { Button } from "@/components/ui/Button";
import styles from "./status.module.css";

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section className={styles.status} aria-labelledby="error-title">
      <div className={styles.card}>
        <p className={styles.code}>No pudimos completar la acción</p>
        <h1 id="error-title">Ocurrió un error inesperado</h1>
        <p>
          Intenta nuevamente. Si el problema continúa, puedes volver al Inicio.
        </p>
        <div className={styles.actions}>
          <Button onClick={() => reset()}>Intentar de nuevo</Button>
          <Button href="/" variant="secondary">
            Volver al Inicio
          </Button>
        </div>
      </div>
    </section>
  );
}
