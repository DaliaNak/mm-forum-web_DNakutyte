import React from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./styles.module.css";
import Spinner from "../Spinner/Spinner";

const Questions = ({ questions }) => {
  return (
    <div className={styles.questionsWrapper}>
      {questions && questions.length > 0 ? (
        questions.map((question) => {
          return (
            <div key={question.id}>
              <QuestionCard
                _id={question._id}
                question_text={question.question_text}
                description={question.description}
                date={question.date}
              />
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Questions;
