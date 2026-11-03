import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { contactNavigationItem, mainNavigation } from "@/content/navigation";
import styles from "./status.module.css";

export default function NotFound() {
  return (
    <section className={styles.status} aria-labelledby="not-found-title">
      <div className={styles.card}>
        <p className={styles.code}>Error 404</p>
        <h1 id="not-found-title">Página no encontrada</h1>
        <p>
          La dirección solicitada no está disponible. Puedes volver al Inicio o
          continuar por una sección principal.
        </p>
        <div className={styles.actions}>
          <Button href="/">Volver al Inicio</Button>
          <Button href="/contacto" variant="secondary">
            Contáctanos
          </Button>
        </div>
        <nav className={styles.navigation} aria-label="Navegación útil">
          <h2>Navegación principal</h2>
          <ul>
            {[...mainNavigation, contactNavigationItem].map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
