import React from "react";
import styles from "./Question.module.css";

function Question({ question, flag }) {
  return (
    <div className={styles.question}>
      <p>{question}</p>
      {flag && <img src={flag} alt="Country flag" className={styles.flag} />}
    </div>
  );
}

export default Question;
