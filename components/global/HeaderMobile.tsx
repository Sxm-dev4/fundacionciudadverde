"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  contactNavigationItem,
  mainNavigation,
} from "@/content/navigation";
import styles from "./HeaderMobile.module.css";

export function HeaderMobile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
            width={132}
            height={61}
            priority
          />
        </Link>
        <button
          className={styles.menuButton}
          ref={menuButtonRef}
          type="button"
          aria-label={isOpen ? "Cerrar menú principal" : "Abrir menú principal"}
          aria-controls="menu-principal-mobile"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <Image
            src="/assets/icons/menu.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>
      {isOpen ? (
        <nav
          className={styles.navigation}
          id="menu-principal-mobile"
          aria-label="Navegación principal"
        >
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
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            className={styles.contactButton}
            href={contactNavigationItem.href}
            onClick={() => setIsOpen(false)}
          >
            {contactNavigationItem.label}
          </Button>
        </nav>
      ) : null}
    </div>
  );
}
