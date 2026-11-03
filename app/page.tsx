import { HomePage } from "@/components/sections/HomePage";
import { createPageMetadata, SITE_NAME } from "@/lib/site";

export const metadata = createPageMetadata({
  title: SITE_NAME,
  description:
    "Fundación Ciudad Verde integra experiencia ambiental, social y técnica para transformar territorios.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return <HomePage />;
}
