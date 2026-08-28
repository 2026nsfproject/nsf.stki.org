// src/lib/microcms.ts
export type NewsArticle = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  // ここに追加した値（例: "event" | "press" | "recruit"）を追記
  category: "news" | "activity" | "event" | "press" | "recruit";
  badgeText?: string;
  isUrgent?: boolean;
  link?: string;
  content?: string;
};
