import { useEffect, useState } from "react";
import { save_favourite_news, save_sort } from "../services/requests";
import { News } from "../models/news";
import noImage from "../resources/images/noImage.jpg";
import notFavouriteImg from "../resources/images/favourite-2765.svg";
import favouriteImg from "../resources/images/star-2768.svg";
import { getTheNews, sortNews } from "../services/commonFunctions";
import Header from "../components/Header";
import Submenu from "../components/Submenu";
import Tags from "../components/Tags";

type Props = {
  setLoggedIn: (value: boolean) => void;
  type: "today_news" | "all_news" | "favourite_news";
};

export default function NewsPage(props: Props) {
  const [news, setNews] = useState<undefined | News[]>(undefined);
  const [sortedNews, setSortedNews] = useState<undefined | News[]>(undefined);
  const [hover, setHover] = useState(-1);
  const [availableOrigins, setAvailableOrigins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<["date" | "title", "asc" | "desc"]>([
    "date",
    "asc",
  ]);
  const [serverSpace, setServerSpace] = useState<{
    total: number;
    free: number;
    used: number;
  }>({
    total: 0,
    free: 0,
    used: 0,
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [nextSunnyDay, setNextSunnyDay] = useState(undefined);

  useEffect(() => {
    getTheNews(props.type).then((res: any) => {
      if (res.status !== 200) {
        if (res.response.data === "Unauthorized") {
          props.setLoggedIn(false);
        }
      } else {
        setNews(res.data.articles);
        setServerSpace(res.data.disk_space);
        setSortedNews(sortNews(sort, res.data.articles));
        setAvailableOrigins(res.data.available_origins);
        if (JSON.stringify(sort) !== JSON.stringify(res.data.sort)) {
          setSort(res.data.sort);
        }
        for (let day of res.data.weather.list) {
          if (day.clouds.all < 60) {
            setNextSunnyDay(day.dt);
            break;
          }
        }
        setLoading(false);
      }
    });

    // eslint-disable-next-line
  }, [props.type]);

  useEffect(() => {
    if (news) {
      const filteredNews = filterByTag(selectedTags, false);
      setSortedNews(sortNews(sort, filteredNews!));
      save_sort(sort).then((res: any) => {
        if (res.status !== 200) {
          if (res.response.data === "Unauthorized") {
            props.setLoggedIn(false);
          }
        }
      });
    }
    // eslint-disable-next-line
  }, [sort]);

  useEffect(() => {
    filterByTag(selectedTags, true);
    // eslint-disable-next-line
  }, [selectedTags]);

  function filterByTag(tags: string[], shouldUpdate?: boolean) {
    if (news) {
      let filteredNews = news.filter((item: News) => {
        return tags.some((tag) => item.origin.includes(tag));
      });
      if (filteredNews.length === 0) {
        filteredNews = news;
      }

      if (shouldUpdate) {
        setSortedNews(sortNews(sort, filteredNews));
      } else {
        return filteredNews;
      }
    }
  }

  const isSafariOnIOS = () => {
    const userAgent = navigator.userAgent;
    console.log(userAgent);

    // Check for actual iOS device
    const isIOS = /iPhone|iPad/.test(userAgent) && /Mobile/.test(userAgent);
    console.log(isIOS);

    // Check for Safari but exclude Chrome and other browsers
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    console.log(isSafari);

    // Only return true if both conditions are met
    return isIOS && isSafari;
  };

  const openInChrome = (url: string) => {
    console.log(isSafariOnIOS());

    if (isSafariOnIOS()) {
      // Ensure the URL starts with "http://" or "https://"
      const formattedUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url.replace("http://", "").replace("https://", "")
          : url;
      const chromeUrl = `googlechrome://${formattedUrl}`;
      window.open(chromeUrl, "_blank");
    } else {
      window.open(url, "_blank"); // Open normally for other platforms
    }
  };

  return (
    <>
      <div
        className="basicPageComponent"
        id={`${props.type}-basicPageComponent`}
      >
        <Header serverSpace={serverSpace} nextSunnyDay={nextSunnyDay} />
        <Tags
          availableOrigins={availableOrigins}
          filterByTag={filterByTag}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <Submenu
          sortedNews={sortedNews}
          type={props.type}
          loading={loading}
          setSort={setSort}
          sort={sort}
        />
        {loading || sortedNews === undefined ? (
          <div className="loading">Loading...</div>
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
                    openInChrome(item.link);
                  }
                }}
                onMouseEnter={() => setHover(index)}
                onTouchStart={() => setHover(index)}
                onTouchEnd={() => setHover(-1)}
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
                  <div className="dateAndOriginContainer">
                    <p
                      className={`newsTileDate ${
                        hover === index ? "hover" : ""
                      }`}
                    >
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(item.date))}
                    </p>
                    <p
                      className={`newsTileOrigin ${
                        hover === index ? "hover" : ""
                      }`}
                    >
                      {item.origin}
                    </p>
                  </div>
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
