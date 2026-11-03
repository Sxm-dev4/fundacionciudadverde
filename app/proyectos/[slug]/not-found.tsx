import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.section}>
      <p>Proyecto no encontrado</p>
      <h1>Esta ficha no está disponible</h1>
      <p>Consulta las experiencias editoriales disponibles en Proyectos.</p>
      <Button href="/proyectos">Volver a proyectos</Button>
    </section>
  );
}
