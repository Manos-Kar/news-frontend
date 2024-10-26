import { News } from "../models/news";
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
          </div>
        )}
      </div>
    </>
  );
}
