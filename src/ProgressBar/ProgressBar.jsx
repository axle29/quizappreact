import React from "react";
import styles from "./ProgressBar.module.css";

function ProgressBar({ currentStep, totalSteps = 10 }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={styles.progressbar}>
      {steps.map(step => (
        <div
          key={step}
          className={`${styles.progress} ${step <= currentStep ? styles.active : ""}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
