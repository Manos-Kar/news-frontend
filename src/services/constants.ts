const GET_TODAY_NEWS = "news/api/get_today_news/";
const GET_ALL_NEWS = "news/api/get_all_news/";
const GET_MORE_NEWS = "news/api/get_more_news/";
const GET_NEXT_GAME = "news/api/get_next_game/";
const GET_ALL_GAMES = "news/api/get_all_games/";
const GET_FAVOURITE_NEWS = "news/api/get_favourite_news/";
const SAVE_FAVOURITE_NEWS = "news/api/save_favourite_news/";
const GET_CSRF_TOKEN = "news/api/get_csrf_token/";
const SAVE_SORT = "news/api/save_sort/";
const LOGIN = "news/login/";

export type UrlOption =
  | "GET_TODAY_NEWS"
  | "GET_ALL_NEWS"
  | "GET_FAVOURITE_NEWS"
  | "SAVE_FAVOURITE_NEWS"
  | "SAVE_SORT"
  | "GET_MORE_NEWS"
  | "GET_NEXT_GAME"
  | "GET_ALL_GAMES"
  | "GET_CSRF_TOKEN"
  | "LOGIN";

export const getUrl = (option: UrlOption, ids?: string[]) => {
  let resUrl = "";

  switch (option) {
    case "GET_TODAY_NEWS":
      resUrl += GET_TODAY_NEWS;
      break;

    case "GET_ALL_NEWS":
      resUrl += GET_ALL_NEWS;
      break;

    case "GET_NEXT_GAME":
      resUrl += GET_NEXT_GAME;
      break;

    case "GET_ALL_GAMES":
      resUrl += GET_ALL_GAMES;
      break;

    case "GET_FAVOURITE_NEWS":
      resUrl += GET_FAVOURITE_NEWS;
      break;

    case "SAVE_FAVOURITE_NEWS":
      resUrl += SAVE_FAVOURITE_NEWS;
      break;

    case "SAVE_SORT":
      resUrl += SAVE_SORT;
      break;

    case "GET_CSRF_TOKEN":
      resUrl += GET_CSRF_TOKEN;
      break;

    case "GET_MORE_NEWS":
      resUrl += GET_MORE_NEWS;
      break;

    case "LOGIN":
      resUrl += LOGIN;
      break;
  }

  return process.env.REACT_APP_API_BASIC_URL + resUrl;
};
