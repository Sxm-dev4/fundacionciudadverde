import { ActionLinesPage } from "@/components/sections/ActionLinesPage";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Líneas de acción",
  description:
    "Conoce los seis campos estratégicos con los que Fundación Ciudad Verde articula conocimiento, seguimiento y ejecución territorial.",
  path: "/lineas-de-accion",
});

export default function ActionLinesRoute() {
  return <ActionLinesPage />;
}
