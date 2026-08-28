import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

export const microcmsClient = createClient({
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
  category: "news" | "activity";
  badgeText: string;
  isUrgent?: boolean;
  link?: string;
  content?: string;
};

export type NewsResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: NewsArticle[];
};

export const getNewsList = async (queries?: MicroCMSQueries) => {
  return await microcmsClient.get<NewsResponse>({
    endpoint: "news",
    queries,
  });
};
