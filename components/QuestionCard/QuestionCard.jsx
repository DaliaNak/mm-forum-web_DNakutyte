import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const QuestionCard = ({ question_text, description, date, _id }) => {
  return (
    <Link className={styles.linkStyle} href={`/question/${_id}`}>
      <div key={_id} className={styles.wrapper}>
        <h4>{question_text}</h4>
        <p className={styles.description}>{description}</p>
        <h6>{date}</h6>
      </div>
    </Link>
  );
};

export default QuestionCard;
