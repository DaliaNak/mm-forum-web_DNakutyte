import React, { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import styles from "./styles.module.css";
import PageTemplate from "../../components/PageTemplate/PageTemplate";

const AddQuestion = () => {
  const router = useRouter();

  const [questionText, setQuestionText] = useState("");
  const [description, setDescription] = useState("");
  //   const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addQuestion = async () => {
    setErrorMessage("");

    if (!questionText || !description) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    const headers = {
      authorization: cookie.get("jwtToken"),
    };

    const data = {
      question_text: questionText,
      description: description,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/questions",
        data,
        {
          headers: headers,
        }
      );

      if (response.status === 201) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <PageTemplate>
      <div>
        <div className={styles.form}>
          <h3 className={styles.title}>Ask question</h3>
          <textarea
            className={styles.questionText}
            // placeholder="your question"
            value={questionText}
            onChange={(event) => {
              setQuestionText(event.target.value);
              setErrorMessage("");
            }}
          />
          <h3 className={styles.description}>Description</h3>
          <textarea
            className={styles.questionDescription}
            // placeholder="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setErrorMessage("");
            }}
          />
          <button onClick={addQuestion}>Post question</button>
          {errorMessage && (
            <h4 className={styles.errorMessage}>{errorMessage}</h4>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default AddQuestion;
