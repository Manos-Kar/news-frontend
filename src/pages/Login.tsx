import { useEffect, useState } from "react";
import { login } from "../services/requests";
import { saveCredentialsToCookie } from "../services/requestTemplates";

type Props = {
  setLoggedIn: (value: boolean) => void;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, [username, password]);

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(password, username);

    if (event.key === "Enter") {
      handleLogin();
    }
  };

  function handleLogin() {
    console.log(username, password);

    if (username && password) {
      login(username, password).then((res: any) => {
        console.log(res.status);

        if (res.status !== 200) {
          alert(res.error);
        } else {
          const csrfToken = res.data.csrfToken;
          saveCredentialsToCookie(username, password, csrfToken);
          props.setLoggedIn(true);
        }
      });
    } else {
      alert("Please enter a username and password");
    }
  }

  return (
    <>
      <div className="basicPageComponent">
        <div className="loginInputContainer">
          <div className="inputContainer">
            <p className="loginInputLabel">Username:</p>
            <input
              type="text"
              className="username loginInput"
              onChange={(e: any) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <p className="loginInputLabel">Password:</p>
            <input
              type="password"
              className="password loginInput"
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="loginButton" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
}
