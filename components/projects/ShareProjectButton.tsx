"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ShareProjectButton({ title }: { title: string }) {
  const [status, setStatus] = useState("");

  async function shareProject() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
        setStatus("Proyecto compartido");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setStatus("Enlace copiado");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("No fue posible compartir el enlace");
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={shareProject}>
        Compartir <span aria-hidden="true">↗</span>
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {status}
      </span>
    </>
  );
}
