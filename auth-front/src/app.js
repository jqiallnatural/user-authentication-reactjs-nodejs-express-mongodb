import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import userContext from "./context/userContext";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined, // Stores the token data
    user: undefined, // Stores user data
  });

  // When our app runs it calls useEffect
  useEffect(() => {
    const checkLoggedIn = async () => {
      // First check if token is in local storage
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({ // If valid, we set the setUserData and provide it in context so all components have access to it
          token,
          user: userRes.data,
        })
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <>
      <BrowserRouter>
        <userContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </userContext.Provider>
      </BrowserRouter>
    </>
  );
}
