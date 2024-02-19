import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import PageTemplate from "../../components/PageTemplate/PageTemplate";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async () => {
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Please fill in your email address");
      return;
    }
    if (!password) {
      setErrorMessage("Please fill in your password");
      return;
    }

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3001/users/login",
        data
      );

      if (response.status === 200) {
        cookie.set("jwtToken", response.data.jwt);
        router.push("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage(
          "Error! The email address or password you entered is incorrect."
        );
      } else {
        console.log(err);
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <PageTemplate>
      <div>
        <div className={styles.form}>
          <h2>Log in</h2>
          <input
            placeholder="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage(""); // Clear error message when typing in email
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage(""); // Clear error message when typing in password
            }}
          />
          <button onClick={loginUser}>Log in</button>
          {errorMessage && (
            <h4 className={styles.errorMessage}>{errorMessage}</h4>
          )}
          {/* Display error message if exists */}
        </div>
      </div>
    </PageTemplate>
  );
};

export default Login;
