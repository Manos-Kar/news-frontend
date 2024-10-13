import { useEffect, useState } from "react";
import {
  api_get_more_news,
  save_favourite_news,
  save_sort,
} from "../services/requests";
import { News } from "../models/news";
import noImage from "../resources/images/noImage.jpg";
import notFavouriteImg from "../resources/images/favourite-2765.svg";
import favouriteImg from "../resources/images/star-2768.svg";
import { getTheNews, sortNews } from "../services/commonFunctions";
import logo from "../resources/images/01-news_logo.png";
import Header from "../components/Header";
import { useNavigate } from "react-router";

type Props = {
  setLoggedIn: (value: boolean) => void;
  type: "today_news" | "all_news" | "favourite_news";
};

export default function NewsPage(props: Props) {
  const navigateTo = useNavigate();
  const [news, setNews] = useState<undefined | News[]>(undefined);
  const [sortedNews, setSortedNews] = useState<undefined | News[]>(undefined);
  const [hover, setHover] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<["date" | "title", "asc" | "desc"]>([
    "date",
    "asc",
  ]);

  useEffect(() => {
    getTheNews(props.type).then((res: any) => {
      if (res.status !== 200) {
        if (res.response.data === "Unauthorized") {
          props.setLoggedIn(false);
        }
      } else {
        setNews(res.data.articles);
        setSortedNews(sortNews(sort, res.data.articles));
        setSort(res.data.sort);
        setLoading(false);
      }
    });

    // eslint-disable-next-line
  }, [props.type]);

  useEffect(() => {
    if (news) {
      setSortedNews(sortNews(sort, news));
      save_sort(sort).then((res: any) => {
        if (res.status !== 200) {
          if (res.response.data === "Unauthorized") {
            props.setLoggedIn(false);
          }
        } else {
          console.log(res.response);
        }
      });
    }
    // eslint-disable-next-line
  }, [sort]);

  return (
    <>
      <div
        className="basicPageComponent"
        id={`${props.type}-basicPageComponent`}
      >
        <Header />
        <div className="submenu">
          <div className="logoSubtitleContainer">
            <img src={logo} alt="" className="mainLogo" />
            <p className="subtitle">
              {props.type === "favourite_news"
                ? "Favourite News"
                : props.type === "today_news"
                ? "Today's News"
                : "All News"}{" "}
              <span>({sortedNews?.length || 0})</span>
            </p>
          </div>
          {!loading && (
            <div className="sortReloadContainer">
              <p className="sortText">Sort by:</p>
              <select
                className="sortDropdown"
                onChange={(e: any) => {
                  setSort(e.target.value.split(","));
                }}
                value={`${sort[0]},${sort[1]}`}
              >
                <option value={["title", "asc"]}>Title A</option>
                <option value={["title", "desc"]}>Title Z</option>
                <option value={["date", "asc"]}>Most Recent</option>
                <option value={["date", "desc"]}>Oldest</option>
              </select>

              <button
                className="reloadButton"
                onClick={() => {
                  setLoading(true);
                  api_get_more_news().then((res: any) => {
                    if (res.status !== 200) {
                      if (res.response)
                        if (
                          res.response &&
                          res.response.data === "Unauthorized"
                        ) {
                          props.setLoggedIn(false);
                        }
                    }
                    setLoading(false);
                    if (window.location.pathname === "/all_news") {
                      window.location.reload();
                    } else {
                      navigateTo("/all_news");
                    }
                  });
                }}
              >
                Get More News
              </button>
            </div>
          )}
        </div>
        {loading || sortedNews === undefined ? (
          <div>Loading...</div>
        ) : (
          <div className="tilesContainer">
            {sortedNews.map((item: News, index: number) => (
              <div
                className="newsTile"
                key={`newsTile${index}`}
                id={`newsTile${index}`}
                onClick={(e: any) => {
                  if (
                    e.target.className &&
                    !e.target.className.includes("favouriteImg")
                  ) {
                    window.open(item.link, "_blank");
                  }
                }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(-1)}
              >
                <div className="newsTileLeftPart">
                  <img
                    src={item.image === "" ? noImage : item.image}
                    alt={item.title}
                    className={`newsTileImage ${
                      hover === index ? "hover" : ""
                    }`}
                  />
                </div>
                <div className="newsTileRightPart">
                  <p
                    className={`newsTileTitle ${
                      hover === index ? "hover" : ""
                    }`}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`newsTileDate ${hover === index ? "hover" : ""}`}
                  >
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(item.date))}
                  </p>
                  <p className="newsTileContent">{item.content}</p>
                  <div
                    className="favouriteImgContainer"
                    onClick={() => {
                      save_favourite_news(item.id).then((res: any) => {
                        if (res.status === 200) {
                          let tempTodayNews = [...sortedNews];
                          tempTodayNews[index].favourite =
                            !tempTodayNews[index].favourite;
                          setNews(tempTodayNews);
                        }
                      });
                    }}
                  >
                    <img
                      src={item.favourite ? favouriteImg : notFavouriteImg}
                      alt="favouriteImg"
                      className="favouriteImg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
