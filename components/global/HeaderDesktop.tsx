"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  contactNavigationItem,
  mainNavigation,
} from "@/content/navigation";
import styles from "./HeaderDesktop.module.css";

export function HeaderDesktop() {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Fundación Ciudad Verde, Inicio"
        >
          <Image
            className={styles.logo}
            src="/assets/logos/fcv-logo-horizontal-green.svg"
            alt="Fundación Ciudad Verde"
            width={160}
            height={74}
            priority
          />
        </Link>
        <nav className={styles.navigation} aria-label="Navegación principal">
          <ul className={styles.navigationList}>
            {mainNavigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    className={styles.navigationLink}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Button
          className={styles.contactButton}
          href={contactNavigationItem.href}
          aria-current={
            pathname.startsWith(contactNavigationItem.href) ? "page" : undefined
          }
        >
          {contactNavigationItem.label}
        </Button>
      </div>
    </div>
  );
}
