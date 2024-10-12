import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigateTo = useNavigate();

  return (
    <header className="App-header">
      <p className="appHeaderText">Manos News</p>
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
