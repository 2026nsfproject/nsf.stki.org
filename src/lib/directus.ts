// src/lib/directus.ts
// Directus REST API (nsf_news コレクション) からお知らせ・活動報告を取得する。
// microcms.ts の後継。インターフェース(NewsArticle, getNewsList, getNewsDetail)は
// 呼び出し側(index.astro, news/[id].astro)との互換性のためできるだけ維持している。

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL ?? "https://directus.jyrac.stki.org";
const COLLECTION = "nsf_news";

export type NewsArticle = {
  id: string | number;
  date_created: string;
  date_updated: string | null;
  published_at: string | null;
  title: string;
  category: "news" | "activity" | "event" | "press" | "recruit";
  badge_text?: string | null;
  is_urgent?: boolean | null;
  link?: string | null;
  content?: string | null;
  status: "draft" | "published" | "archived";
};

type DirectusListResponse = {
  data: NewsArticle[];
};

type DirectusItemResponse = {
  data: NewsArticle;
};

export type NewsListQuery = {
  limit?: number;
  sort?: string;
};

/**
 * お知らせ一覧を取得する。
 * デフォルトで公開済み(status=published)のみ、published_at降順で返す。
 */
export const getNewsList = async (
  query: NewsListQuery = {}
): Promise<{ contents: NewsArticle[] }> => {
  const params = new URLSearchParams();
  params.set("filter[status][_eq]", "published");
  params.set("sort", query.sort ?? "-published_at");
  if (query.limit) params.set("limit", String(query.limit));

  const res = await fetch(`${DIRECTUS_URL}/items/${COLLECTION}?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Directus getNewsList failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as DirectusListResponse;
  return { contents: json.data ?? [] };
};

/**
 * 記事詳細を取得する(news/[id].astro で使用)。
 * 下書き(draft)は取得できるが、呼び出し側で status を見て 404 に倒す想定。
 */
export const getNewsDetail = async (id: string | number): Promise<NewsArticle> => {
  const res = await fetch(`${DIRECTUS_URL}/items/${COLLECTION}/${id}`);

  if (!res.ok) {
    throw new Error(`Directus getNewsDetail failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as DirectusItemResponse;
  return json.data;
};
