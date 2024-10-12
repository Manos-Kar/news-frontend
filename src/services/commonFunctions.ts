import { News } from "../models/news";
import {
  api_get_all_news,
  api_get_favourite_news,
  api_get_today_news,
} from "./requests";

export const isDevEnv = () => process.env.REACT_APP_ENV === "dev";

export const getImageLink = (imageUrl: string) => {
  console.log(imageUrl);

  return isDevEnv()
    ? `http://localhost:8000${imageUrl}`
    : `https://www.manoskarystinos.com${imageUrl}`;
};

export function sortNews(
  sortby: ["date" | "title", "asc" | "desc"],
  news: News[]
) {
  return [...news].sort((a, b) => {
    const sortBy = sortby[0];
    const order = sortby[1];

    const ascending = order === "asc" ? 1 : -1;

    if (sortBy === "date") {
      console.log("mpika");

      return (
        (new Date(b.date).getTime() - new Date(a.date).getTime()) * ascending
      );
    } else {
      return a.title.localeCompare(b.title) * ascending;
    }
  });
}

export async function getTheNews(
  type: "all_news" | "today_news" | "favourite_news"
) {
  if (type === "all_news") {
    return api_get_all_news();
  } else if (type === "today_news") {
    return api_get_today_news();
  } else if (type === "favourite_news") {
    return api_get_favourite_news();
  }
}
