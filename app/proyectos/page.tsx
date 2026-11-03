import { ProjectsPage } from "@/components/sections/ProjectsPage";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Proyectos",
  description:
    "Experiencias ambientales, sociales, técnicas y de infraestructura desarrolladas desde distintos campos de acción.",
  path: "/proyectos",
});

export default function Page() {
  return <ProjectsPage />;
}
