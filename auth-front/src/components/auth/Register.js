import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory()

  // Submit registeration and sign in right after
  const submit = async (e) => {
    e.preventDefault();
    const newUser = { email, password, passwordCheck, displayName };
    const existingUser = { email, password };
    await Axios.post("http://localhost:5000/users/register", newUser);
    const loginRes = await Axios.post(
      "http://localhost:5000/users/login",
      existingUser
    );
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    })
    localStorage.setItem("auth-token", loginRes.data.token)
    history.push("/")
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Email</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Display name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
