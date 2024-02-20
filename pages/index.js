import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import Questions from "../components/Questions/Questions";
import styles from "../styles/Home.module.css";
import Link from "next/link";
// import QuestionCard from "@/components/QuestionCard/QuestionCard";

const Home = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState([]);

  const verifyUserToken = () => {
    const userToken = cookie.get("jwtToken");

    if (!userToken) {
      router.push("/login");
    }
  };

  const fetchQuestions = async () => {
    const headers = {
      authorization: cookie.get("jwtToken"),
    };

    try {
      const response = await axios.get("http://localhost:3001/questions", {
        headers: headers,
      });
      console.log(response.data.questions);
      setQuestions(response.data.questions);
    } catch (err) {
      console.log(err);
      router.push("/login");
    }
  };

  useEffect(() => {
    verifyUserToken();
    fetchQuestions();
  }, []);

  return (
    <>
      <PageTemplate>
        {/* <Link href="/addResource">
          <h4 className={styles.addTutorial}>Add tutorial</h4>
        </Link> */}

        {/* <div className={styles.questionsWrapper}>
          {questions.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                _id={question._id}
                question_text={question.question_text}
                description={question.description}
                date={question.date}
              />
            );
          })}
        </div> */}
        <Questions questions={questions} setQuestions={setQuestions} />
      </PageTemplate>
    </>
  );
};

export default Home;
