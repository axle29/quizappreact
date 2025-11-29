import React, { useState, useEffect } from "react";
import Choice from "../Choice/Choice.jsx";
import Question from "../Question/Question.jsx";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay.jsx";
import Congrats from "../Congrats/Congrats.jsx";
import styles from "./Quiz.module.css";

function Quiz() {
  const [countries, setCountries] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // ---------------- FETCH COUNTRIES AND GENERATE QUESTIONS ----------------
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags"
        );
        const data = await res.json();

        const validCountries = data.filter(c => c.capital && c.capital.length > 0);
        setCountries(validCountries);

        // generate 10 quiz questions
        const quiz = [];
        for (let i = 0; i < 10; i++) {
          quiz.push(generateQuestion(validCountries));
        }

        setQuestions(quiz);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  // ---------------- GENERATE ONE RANDOM QUESTION ----------------
  function generateQuestion(countryList) {
    if (!countryList || countryList.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * countryList.length);
    const country = countryList[randomIndex];

    const types = ["capital", "flag", "reverseCapital"];
    const type = types[Math.floor(Math.random() * types.length)];

    let questionObj = {};

    if (type === "capital") {
      questionObj = {
        type,
        question: `What is the capital of ${country.name.common}?`,
        correctAnswer: country.capital[0],
        choices: generateChoices(country.capital[0], countryList),
        flag: country.flags.png
      };
    } else if (type === "flag") {
      questionObj = {
        type,
        question: `Which country does this flag belong to?`,
        correctAnswer: country.name.common,
        choices: generateChoices(country.name.common, countryList),
        flag: country.flags.png
      };
    } else if (type === "reverseCapital") {
      questionObj = {
        type,
        question: `Which country has the capital ${country.capital[0]}?`,
        correctAnswer: country.name.common,
        choices: generateChoices(country.name.common, countryList),
        flag: country.flags.png
      };
    }

    return questionObj;
  }

  // ---------------- GENERATE 3 WRONG OPTIONS + 1 CORRECT ----------------
  function generateChoices(correct, countryList) {
    const wrongPool = countryList
      .filter(c =>
        c.capital && c.capital.length > 0 &&
        c.capital[0] !== correct &&
        c.name.common !== correct
      );

    const shuffled = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);

    const wrongChoices = shuffled.map(c =>
      c.capital[0] === correct || c.name.common === correct ? c.name.common : c.capital[0]
    );

    const choices = [...wrongChoices, correct].sort(() => Math.random() - 0.5);

    return choices;
  }

  // ---------------- HANDLE ANSWER CLICK ----------------
  const handleAnswer = (selected) => {
    if (isAnswered) return;

    setSelectedAnswer(selected);
    setIsAnswered(true);

    const correct = questions[currentQuestionIndex].correctAnswer;
    if (selected === correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswered(false);

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  // ---------------- RESET QUIZ ----------------
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);

    const newQuiz = [];
    for (let i = 0; i < 10; i++) {
      newQuiz.push(generateQuestion(countries));
    }
    setQuestions(newQuiz);
  };

  // ---------------- LOADING GUARD ----------------
  if (loading || questions.length === 0) {
    return (
      <div className={styles.quizwrapper}>
        <p>Loading questions…</p>
      </div>
    );
  }

  // ---------------- RESULTS SCREEN ----------------
  if (showResults) {
    return <Congrats currentScore={score} onPlayAgain={resetQuiz} />;
  }

  const current = questions[currentQuestionIndex];

  return (
    <div className={styles.quizwrapper}>
      <div className={styles.headLine}>
        <h1>Country Quiz</h1>
        <ScoreDisplay currentScore={score} totalQuestions={questions.length} />
      </div>

      <div className={styles.quizquestion}>
        <ProgressBar
          currentStep={currentQuestionIndex + 1}
          totalSteps={questions.length}
        />
        <Question
          question={current.question}
          flag={current.type === "flag" ? current.flag : null}
        />
        <Choice
          choices={current.choices}
          onSelect={handleAnswer}
          correctAnswer={current.correctAnswer}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </div>
  );
}

export default Quiz;
