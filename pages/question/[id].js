import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import styles from "./styles.module.css";

const Question = () => {
  const router = useRouter();

  const [question, setQuestion] = useState(null);

  const fetchQuestion = async () => {
    const headers = {
      authorization: cookie.get("jwtToken"),
    };
    const response = await axios.get(
      `http://localhost:3001/questions/${router.query.id}`,
      {
        headers: headers,
      }
    );

    console.log(response.data.question);
    setQuestion(response.data.question);
  };

  useEffect(() => {
    router.query.id && fetchQuestion();
  }, [router.query.id]);

  return (
    <PageTemplate>
      <div className={styles.questionWrapper}>
        {question && (
          <div>
            <h3>{question.question_text}</h3>
            <p>{question.description}</p>
            <h5>{question.date}</h5>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default Question;
