import "./styles/app.css";
import NewsPage from "./pages/NewsPage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PaoPage from "./pages/PaoPage";
import refreshImg from "./resources/images/refresh.png";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const isLoggedIn = () => {
    const credentials = Cookies.get("credentials"); // Get the credentials cookie

    return !!credentials; // Return true if the cookie exists, false otherwise
  };

  useEffect(() => {
    if (isLoggedIn()) {
      console.log("Logged in");

      setLoggedIn(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let touchStartY = 0;

    const onTouchStart = (e: any) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: any) => {
      const currentTouchY = e.touches[0].clientY;
      const distance = Math.max(0, currentTouchY - touchStartY);
      setPullDistance(distance); // Update the distance pulled
    };

    const onTouchEnd = () => {
      if (pullDistance > 100) {
        // Adjust the threshold as needed
        window.location.reload(); // Refresh the page
      }
      setPullDistance(0); // Reset the pull distance
    };

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [pullDistance]);

  return (
    <div className="App">
      <img
        src={refreshImg}
        alt="Pull to refresh icon"
        style={{
          position: "fixed",
          top: "20px",
          right: "50%",
          width: "40px",
          height: "40px",
          marginTop: "20px",
          zIndex: 20,
          opacity: Math.min(pullDistance / 100, 1), // Fade in the image
          transform: `scale(${Math.min(1, pullDistance / 100)})`, // Scale the image as you pull down
          transition: "opacity 0.6s, transform 0.6s",
        }}
      />
      {loggedIn ? (
        <Router>
          <Routes>
            <Route
              path="/pao"
              element={
                <>
                  <PaoPage />
                </>
              }
            />
            <Route
              path="/all_news"
              element={
                <>
                  <NewsPage setLoggedIn={setLoggedIn} type={"all_news"} />
                </>
              }
            />
            <Route
              path="/favourite_news"
              element={
                <>
                  <NewsPage setLoggedIn={setLoggedIn} type={"favourite_news"} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <NewsPage setLoggedIn={setLoggedIn} type={"today_news"} />
                </>
              }
            />
            <Route
              path="*"
              element={<NewsPage setLoggedIn={setLoggedIn} type={"all_news"} />}
            />
          </Routes>
        </Router>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}
