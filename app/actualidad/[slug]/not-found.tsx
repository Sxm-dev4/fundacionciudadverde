import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <p>Actualidad</p>
      <h1>Contenido no encontrado</h1>
      <p>El contenido solicitado no está disponible.</p>
      <Button href="/actualidad">Volver a Actualidad</Button>
    </section>
  );
}

