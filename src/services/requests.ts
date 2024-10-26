import Cookies from "js-cookie";
import { getUrl } from "./constants";
import { get, patch, post } from "./requestTemplates";

function getCredentialsFromCookie() {
  return Cookies.get("credentials");
}

function getHeaders() {
  const csrftoken = Cookies.get("csrftoken");

  let headers: any = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  const credentials = getCredentialsFromCookie();
  if (credentials) {
    headers["Authorization"] = `Basic ${credentials}`;
  }

  return headers;
}

//GET @api_get_today_news
export const api_get_today_news = async () => {
  const headers = getHeaders();
  try {
    return await get(getUrl("GET_TODAY_NEWS"), headers);
  } catch (error) {
    return error;
  }
};

//GET @api_get_next_game
export const api_get_next_game = async () => {
  const headers = getHeaders();
  try {
    return await get(getUrl("GET_NEXT_GAME"), headers);
  } catch (error) {
    return error;
  }
};

//GET @api_get_all_games
export const api_get_all_games = async () => {
  const headers = getHeaders();
  try {
    return await get(getUrl("GET_ALL_GAMES"), headers);
  } catch (error) {
    return error;
  }
};

//GET @api_get_all_news
export const api_get_all_news = async () => {
  const headers = getHeaders();
  try {
    return await get(getUrl("GET_ALL_NEWS"), headers);
  } catch (error) {
    return error;
  }
};

//GET @api_get_all_news
export const api_get_favourite_news = async () => {
  const headers = getHeaders();
  try {
    return await get(getUrl("GET_FAVOURITE_NEWS"), headers);
  } catch (error) {
    return error;
  }
};

//PATCH @api_favourite_news
export const save_favourite_news = async (newsId: string) => {
  const headers = getHeaders();

  try {
    return await patch(getUrl("SAVE_FAVOURITE_NEWS"), headers, {
      news_id: newsId,
    });
  } catch (error) {
    return error;
  }
};

//PATCH @api_save_sort
export const save_sort = async (sort: ["date" | "title", "asc" | "desc"]) => {
  const headers = getHeaders();
  try {
    return await patch(getUrl("SAVE_SORT"), headers, {
      sort: sort,
    });
  } catch (error) {
    return error;
  }
};

//GET @api_get_more_news
export const api_get_more_news = async () => {
  const headers = getHeaders();
  try {
    return await get(getUrl("GET_MORE_NEWS"), headers);
  } catch (error) {
    return error;
  }
};

//POST @api_login
export const login = async (username: string, password: string) => {
  const headers = getHeaders();
  try {
    return await post(getUrl("LOGIN"), headers, {
      username: username,
      password: password,
    });
  } catch (error) {
    return error;
  }
};
