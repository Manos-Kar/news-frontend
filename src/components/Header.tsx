import { useNavigate } from "react-router-dom";
import sunImg from "../resources/images/02-sun.png";
import hamburgerImg from "../resources/images/03-hamburger.svg";
import { useEffect, useState } from "react";
import ElfsightWidget from "./WeatherWidget";
import { format, differenceInDays } from "date-fns";

type Props = {
  serverSpace: { total: number; free: number; used: number };
  nextSunnyDay: number | undefined;
};

export default function Header(props: Props) {
  const navigateTo = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [widgetOn, setWidgetOn] = useState(false);

  useEffect(() => {
    // Select the first <a> element inside the widgetContainer
    const firstAnchor = document.querySelector(".widgetContainer a");

    if (firstAnchor) {
      // Set its display style to 'none'
      (firstAnchor as HTMLElement).style.display = "none";
    }

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };

    // eslint-disable-next-line
  }, [dropdown, widgetOn]);

  function closeDropdown(e: any) {
    if (dropdown && !e.target.classList.contains("dropdown")) {
      setDropdown(false);
    }

    if (widgetOn && !e.target.className.includes("nextSunnyDay")) {
      setWidgetOn(false);
    }
  }

  function findNextSunnyDay(): string {
    if (props.nextSunnyDay) {
      const today = new Date();
      const date = new Date(props.nextSunnyDay * 1000); // Convert seconds to milliseconds

      // Format the date (22 Oct)
      const formattedDate = format(date, "d MMM");

      // Calculate the difference in days
      const difference = differenceInDays(date, today);

      if (difference === 0) {
        return "Today - " + formattedDate;
      }
      if (difference === 1) {
        return "Tomorrow - " + formattedDate;
      }
      if (difference < 5) {
        return `In ${difference} days - ${formattedDate}`;
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
        <div className="dropDownContainer">
          <div
            className={`dropdownHeaderMenu dropdown ${dropdown ? "open" : ""}`}
          >
            <img
              src={hamburgerImg}
              alt=""
              className="hamburgerImg dropdown"
              style={dropdown ? { display: "none" } : undefined}
              onClick={() => setDropdown(true)}
            />
            {dropdown && (
              <div className="buttonContainer dropdown">
                <div
                  onClick={() => {
                    setDropdown(false);
                    navigateTo("/all_news");
                  }}
                  className="headerButton dropdown"
                >
                  All news
                </div>
                <div
                  onClick={() => {
                    setDropdown(false);
                    navigateTo("/");
                  }}
                  className="headerButton dropdown"
                >
                  Today's news
                </div>
                <div
                  onClick={() => {
                    setDropdown(false);
                    navigateTo("/favourite_news");
                  }}
                  className="headerButton dropdown"
                >
                  Favourite news
                </div>
                <div
                  onClick={() => {
                    setDropdown(false);
                    navigateTo("/pao");
                  }}
                  className="headerButton dropdown"
                >
                  Pao Schedule
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <footer>
        <div className="nextSunnyDayTextContainer">
          <img src={sunImg} alt="" className="sunImage nextSunnyDay" />
          <p className="nextSunnyDayText" onClick={() => setWidgetOn(true)}>
            Next sunny day: {findNextSunnyDay()}
          </p>
        </div>

        <div
          className="widgetContainer"
          onClick={() => setWidgetOn(false)}
          style={{ display: widgetOn ? "block" : "none" }}
        >
          <ElfsightWidget />
        </div>

        <p className="serverSpaceText">
          Server free space: {props.serverSpace.free} GB/{" "}
          {props.serverSpace.total} GB
        </p>
      </footer>
    </>
  );
}
