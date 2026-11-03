import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/news/ArticleDetail";
import { getNewsArticle, newsArticles } from "@/content/news";
import { createPageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) return { title: "Contenido no encontrado" };

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/actualidad/${article.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) notFound();

  return <ArticleDetail article={article} />;
}
