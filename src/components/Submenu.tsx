import { News } from "../models/news";
import logo from "../resources/images/01-news_logo.png";

type Props = {
  sortedNews: News[] | undefined;
  type: "today_news" | "all_news" | "favourite_news";
  loading: boolean;
  setSort: (value: ["title" | "date", "asc" | "desc"]) => void;
  sort: ["title" | "date", "asc" | "desc"];
};

export default function Submenu(props: Props) {
  return (
    <>
      <div className="submenu">
        <div className="logoSubtitleContainer">
          <img src={logo} alt="" className="mainLogo" />
          <p className="subtitle">
            {props.type === "favourite_news"
              ? "Favourite News"
              : props.type === "today_news"
              ? "Today's News"
              : "All News"}{" "}
            <span>({props.sortedNews?.length || 0})</span>
          </p>
        </div>
        {!props.loading && (
          <div className="sortReloadContainer">
            <p className="sortText">Sort by:</p>
            <select
              className="sortDropdown"
              onChange={(e: any) => {
                props.setSort(e.target.value.split(","));
              }}
              value={`${props.sort[0]},${props.sort[1]}`}
            >
              <option value={["title", "asc"]}>Title A</option>
              <option value={["title", "desc"]}>Title Z</option>
              <option value={["date", "asc"]}>Most Recent</option>
              <option value={["date", "desc"]}>Oldest</option>
            </select>

            {/* <button
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
                      setLoading(false);
                    } else {
                      setTimeout(() => {
                        setLoading(false);
                        if (window.location.pathname === "/all_news") {
                          window.location.reload();
                        } else {
                          navigateTo("/all_news");
                        }
                      }, 3000);
                    }
                  });
                }}
              >
                Get More News
              </button> */}
          </div>
        )}
      </div>
    </>
  );
}
