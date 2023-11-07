import { useState, useCallback } from 'react';

import QuestionTimer from './QuestionTimer';
import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import Answers from './Answers';

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const question = QUESTIONS[activeQuestionIndex];

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState('answered');
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        selectedAnswer === question.answers[0]
          ? setAnswerState('correct')
          : setAnswerState('wrong');

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [question]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          onTimeout={handleSkipAnswer}
          timeout={10000}
        />
        <h2>{question.text}</h2>
        <Answers
          key={activeQuestionIndex + 1}
          answers={question.answers}
          onSelectAnswer={handleSelectAnswer}
          answerState={answerState}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
        />
      </div>
    </div>
  );
}
