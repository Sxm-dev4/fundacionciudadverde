type SearchableNewsItem = {
  title: string;
  summary: string;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

export function normalizeNewsQuery(query: string) {
  return query.trim();
}

export function filterNewsItems<T extends SearchableNewsItem>(
  items: readonly T[],
  query: string,
): readonly T[] {
  const normalizedQuery = normalize(normalizeNewsQuery(query));
  if (!normalizedQuery) return items;

  return items.filter((item) =>
    normalize(`${item.title} ${item.summary}`).includes(normalizedQuery),
  );
}
