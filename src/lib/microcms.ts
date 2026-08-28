// src/lib/microcms.ts
import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type NewsArticle = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  category: "news" | "activity" | "event" | "press" | "recruit";
  badgeText?: string;
  isUrgent?: boolean;
  link?: string;
  content?: string;
};

// 一覧取得
export const getNewsList = async (queries?: MicroCMSQueries) => {
  return await client.getList<NewsArticle>({
    endpoint: "news",
    queries,
  });
};

// 詳細取得（[id].astro で使用）
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<NewsArticle>({
    endpoint: "news",
    contentId,
    queries,
  });
};
