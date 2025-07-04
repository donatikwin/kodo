import { useState } from 'react';
import styles from './QuizBlock.module.css';

export default function QuizBlock({ questions, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, option) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [qIndex]: option }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = questions.every((q, i) => answers[i] === q.answer);
    if (allCorrect) {
      onComplete();
    }
  };

  const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;
  const scorePercentage = Math.round((correctCount / questions.length) * 100);

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizContent}>
        {questions.map((q, index) => (
          <div 
            key={index} 
            className={`${styles.questionBlock} ${submitted && answers[index] === q.answer ? styles.correctBlock : ''} ${submitted && answers[index] !== q.answer ? styles.incorrectBlock : ''}`}
          >
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>Вопрос {index + 1}</span>
              {submitted && (
                <span className={`${styles.statusBadge} ${answers[index] === q.answer ? styles.correctBadge : styles.incorrectBadge}`}>
                  {answers[index] === q.answer ? '✓ Верно' : '✗ Неверно'}
                </span>
              )}
            </div>
            <p className={styles.questionText}>{q.question}</p>
            <div className={styles.optionsGrid}>
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleSelect(index, opt)}
                  className={`${styles.optionButton} ${answers[index] === opt ? styles.selected : ''} ${submitted && q.answer === opt ? styles.correctOption : ''} ${submitted && answers[index] === opt && answers[index] !== q.answer ? styles.incorrectOption : ''}`}
                  disabled={submitted}
                >
                  {opt}
                  {submitted && q.answer === opt && (
                    <span className={styles.correctIndicator}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button 
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
        >
          Проверить ответы
        </button>
      ) : (
        <div className={styles.resultsSection}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreCircle}>
              <span className={styles.scorePercentage}>{scorePercentage}%</span>
              <svg className={styles.scoreCircleBg} viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={`${scorePercentage}, 100`}
                />
              </svg>
            </div>
            <div className={styles.scoreText}>
              <h3>Результаты теста</h3>
              <p>Правильных ответов: {correctCount} из {questions.length}</p>
              {scorePercentage >= 70 ? (
                <p className={styles.successText}>Отличный результат!</p>
              ) : (
                <p className={styles.retryText}>Попробуйте еще раз</p>
              )}
            </div>
          </div>
          
          <button 
            className={styles.retryButton}
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
          >
            Пройти тест снова
          </button>

          {scorePercentage >= 70 && (
            <button 
              className={styles.continueButton}
              onClick={onComplete}
            >
              Продолжить
            </button>
          )}
        </div>
      )}
    </div>
  );
}