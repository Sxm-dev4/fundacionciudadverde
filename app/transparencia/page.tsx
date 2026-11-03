import { TransparencyPage } from "@/components/sections/TransparencyPage";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Transparencia",
  description:
    "Consulta la información institucional disponible de Fundación Ciudad Verde y solicita orientación sobre documentos no publicados.",
  path: "/transparencia",
});

export default function Page() {
  return <TransparencyPage />;
}
