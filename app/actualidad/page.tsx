import { NewsPage } from "@/components/sections/NewsPage";
import { newsItems } from "@/content/news";
import { filterNewsItems, normalizeNewsQuery } from "@/lib/news-search";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Actualidad",
  description:
    "Registros de actividades, formación y encuentros documentados por Fundación Ciudad Verde.",
  path: "/actualidad",
});

type Props = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = normalizeNewsQuery(typeof q === "string" ? q : "");
  const featured = newsItems[0];
  const availableItems = query ? newsItems : newsItems.slice(1);

  return (
    <NewsPage
      featured={featured}
      items={filterNewsItems(availableItems, query)}
      query={query}
    />
  );
}
