import "./styles/app.css";
import NewsPage from "./pages/NewsPage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isLoggedIn = () => {
    const credentials = Cookies.get("credentials"); // Get the credentials cookie
    console.log(credentials);

    return !!credentials; // Return true if the cookie exists, false otherwise
  };

  useEffect(() => {
    if (isLoggedIn()) {
      console.log("Logged in");

      setLoggedIn(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {loggedIn ? (
        <Router>
          <Routes>
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
