import React from "react";
import styles from "./ScoreDisplay.module.css";

function ScoreDisplay({ currentScore, totalQuestions = 10 }) {
  return (
    <div className={styles.scoredisplay}>
      🏆 {currentScore} / {totalQuestions} Points
    </div>
  );
}

export default ScoreDisplay;
