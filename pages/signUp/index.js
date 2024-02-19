import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import PageTemplate from "../../components/PageTemplate/PageTemplate";

const SignUp = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signUpUser = async () => {
    setErrorMessage("");

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Invalid email, please include the '@' symbol.");
      return;
    }
    // Validate password
    if (password.length < 8 || !/\d/.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one number."
      );
      return;
    }

    try {
      const data = {
        name: name,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3001/users/signUp",
        data
      );

      if (response.status === 201) {
        router.push("/login");
      }
    } catch (err) {
      // Handle errors from the server
      if (err.response && err.response.status === 401) {
        setErrorMessage(err.response.data.message);
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
          <h2>Sign up</h2>
          <input
            placeholder="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setErrorMessage(""); // Clear error message when typing in email
            }}
          />
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
          <h6>Must contain 8+ characters, including at least 1 number</h6>
          <button onClick={signUpUser}>Sign up</button>
          {errorMessage && (
            <h4 className={styles.errorMessage}>{errorMessage}</h4>
          )}
          {/* Display error message if exists */}
        </div>
        <p className={styles.loginLink}>Already have an account? Log in</p>
      </div>
    </PageTemplate>
  );
};

export default SignUp;
