import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { mainNavigation } from "@/content/navigation";
import styles from "./Footer.module.css";

const transparencyLinks = [
  "Acceso a Transparencia",
  "Políticas institucionales",
  "Política de privacidad",
  "Tratamiento de datos",
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns} id="navegacion">
          <div className={styles.identity}>
            <Image
              className={styles.symbol}
              src="/assets/logos/fcv-symbol-white.svg"
              alt="Fundación Ciudad Verde"
              width={64}
              height={81}
            />
            <p>
              Experiencia ambiental, social y técnica para transformar
              territorios.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className={styles.heading}>Navegación</h2>
            <ul className={styles.linkList}>
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Transparencia y políticas">
            <h2 className={styles.heading}>Transparencia</h2>
            <ul className={styles.linkList}>
              {transparencyLinks.map((label) => (
                <li key={label}>
                  <Link href="/transparencia">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <h2 className={styles.heading}>Contacto y alianzas</h2>
            <p>
              Conversemos sobre proyectos, consultorías y oportunidades de
              colaboración.
            </p>
            <Button className={styles.contactAction} href="/contacto" variant="text">
              Contáctanos
            </Button>
          </div>
        </div>

        <div className={styles.legal}>
          <p>© 2026 Fundación Ciudad Verde.</p>
          <nav aria-label="Enlaces legales">
            <ul className={styles.legalLinks}>
              <li>
                <Link href="/transparencia">Política de privacidad</Link>
              </li>
              <li>
                <Link href="/transparencia">Tratamiento de datos</Link>
              </li>
              <li>
                <Link href="/#navegacion">Mapa del sitio</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
