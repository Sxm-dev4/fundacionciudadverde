import { ContactPage } from "@/components/sections/ContactPage";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contacto y alianzas",
  description:
    "Conversemos sobre proyectos, consultorías y alianzas para transformar territorios.",
  path: "/contacto",
});

export default function Page() {
  return <ContactPage />;
}
