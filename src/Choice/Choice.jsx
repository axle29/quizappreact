import React from "react";
import styles from "./Choice.module.css";

function Choice({ choices = [], onSelect, correctAnswer, selectedAnswer }) {
  return (
    <div className={styles.container}>
      <div className={styles.mother}>
        {choices.map((choice, index) => {
          let styleClass = styles.choice;
          if (selectedAnswer) {
            if (choice === correctAnswer) styleClass = `${styleClass} ${styles.correct}`;
            else if (choice === selectedAnswer) styleClass = `${styleClass} ${styles.wrong}`;
          }

          return (
            <div
              key={index}
              className={styleClass}
              onClick={() => onSelect(choice)}
            >
              <span>{choice}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Choice;
