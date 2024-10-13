import { useNavigate } from "react-router-dom";

type Props = {
  serverSpace: { total: number; free: number; used: number };
};

export default function Header(props: Props) {
  const navigateTo = useNavigate();

  return (
    <header className="App-header">
      <div className="headerAndSpaceContainer">
        <p className="appHeaderText">Manos News</p>
        <p className="serverSpaceText">
          Server free space: {props.serverSpace.free} GB
        </p>
      </div>

      <div className="buttonContainer">
        <button
          onClick={() => navigateTo("/all_news")}
          className="headerButton"
        >
          All news
        </button>
        <button onClick={() => navigateTo("/")} className="headerButton">
          Today's news
        </button>
        <button
          onClick={() => navigateTo("/favourite_news")}
          className="headerButton"
        >
          Favourite news
        </button>
      </div>
    </header>
  );
}
