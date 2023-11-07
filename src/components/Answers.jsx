import { useRef } from 'react';

export default function Answers({
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let answerClass = '';
        if (answerState === 'answered' && isSelected) {
          answerClass = 'selected';
        } else if (answerState === 'correct' && isSelected) {
          answerClass = 'correct';
        } else if (answerState === 'wrong' && isSelected) {
          answerClass = 'wrong';
        }
        return (
          <li key={answer} className="answer">
            <button
              className={answerClass}
              onClick={() => onSelectAnswer(answer)}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
