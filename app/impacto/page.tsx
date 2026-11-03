import { ImpactPage } from "@/components/sections/ImpactPage";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Impacto",
  description:
    "Conoce las dimensiones ambientales y capacidades documentadas de Fundación Ciudad Verde.",
  path: "/impacto",
});

export default function ImpactRoute() {
  return <ImpactPage />;
}
