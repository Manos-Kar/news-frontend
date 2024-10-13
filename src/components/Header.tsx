import { useNavigate } from "react-router-dom";
import sunImg from "../resources/images/02-sun.png";

type Props = {
  serverSpace: { total: number; free: number; used: number };
  nextSunnyDay: number | undefined;
};

export default function Header(props: Props) {
  const navigateTo = useNavigate();

  function findNextSunnyDay() {
    if (props.nextSunnyDay) {
      const today = new Date();
      const difference = Math.ceil(
        (props.nextSunnyDay! * 1000 - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (difference === 0) {
        return "Today";
      }
      if (difference === 1) {
        return "Tomorrow";
      }
      if (difference < 5) {
        return `In ${difference} days`;
      }
    }
    return "In > 5 days";
  }

  return (
    <>
      <header className="App-header">
        <div className="headerAndSpaceContainer">
          <p className="appHeaderText">Manos News</p>
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
      <footer>
        <div className="nextSunnyDayTextContainer">
          <img src={sunImg} alt="" className="sunImage" />
          <p className="nextSunnyDayText">
            Next sunny day: {findNextSunnyDay()}
          </p>
        </div>
        <p className="serverSpaceText">
          Server free space: {props.serverSpace.free} GB/{" "}
          {props.serverSpace.total} GB
        </p>
      </footer>
    </>
  );
}
