import styles from './style/DevelopmentGoals.module.css';
import { useState, useEffect } from 'react';
import GoalService from '../../service/GoalService';
import { toast } from 'react-toastify';

export default function DevelopmentGoals() {
  const [goals, setGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка целей
  useEffect(() => {
    setIsLoading(true);
    GoalService.getGoals()
      .then(data => setGoals(data))
      .catch(err => {
        console.error('Ошибка загрузки целей:', err);
        toast.error("Ошибка загрузки целей");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const toggleGoal = async (id, done) => {
    try {
      await GoalService.updateGoal(id, !done);
      setGoals(goals.map(goal => 
        goal._id === id ? { ...goal, done: !done } : goal
      ));
      toast.success('Статус цели обновлён');
    } catch (error) {
      console.error('Ошибка обновления цели:', error);
      toast.error("Ошибка обновления");
    }
  };

  const addGoal = async () => {
    if (newGoalText.trim()) {
      setIsLoading(true);
      try {
        const newGoal = await GoalService.createGoal(newGoalText.trim());
        setGoals([...goals, newGoal]);
        setNewGoalText('');
        setIsAdding(false);
        toast.success("Цель добавлена");
      } catch (error) {
        console.error('Ошибка создания цели:', error);
        toast.error("Ошибка при добавлении");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteGoal = async (id, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm("Вы уверены, что хотите удалить цель?");
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      await GoalService.deleteGoal(id);
      setGoals(goals.filter(goal => goal._id !== id));
      toast.success("Цель удалена");
    } catch (error) {
      console.error('Ошибка удаления цели:', error);
      toast.error("Ошибка при удалении");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Твои цели развития</h2>
        <p className={styles.subtitle}>
          Установи цели и следи за прогрессом — один шаг каждый день ведёт к большим результатам.
        </p>
      </div>

      {isLoading && <p className={styles.loadingText}>Загрузка...</p>}

      <ul className={styles.goalList}>
        {goals.map(goal => (
          <li 
            key={goal._id} 
            className={`${styles.goalItem} ${goal.done ? styles.done : ''}`}
            onClick={() => toggleGoal(goal._id, goal.done)}
          >
            <div className={styles.checkbox}>
              {goal.done && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className={styles.goalText}>{goal.text}</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: goal.done ? '100%' : '30%' }}
              />
            </div>
            <button 
              className={styles.deleteButton}
              onClick={(e) => deleteGoal(goal._id, e)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2L12 12M12 2L2 12" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {isAdding ? (
        <div className={styles.addForm}>
          <input
            type="text"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder="Введите новую цель"
            className={styles.input}
            autoFocus
            disabled={isLoading}
          />
          <div className={styles.formButtons}>
            <button 
              className={`${styles.addButton} ${!newGoalText.trim() ? styles.disabled : ''}`}
              onClick={addGoal}
              disabled={!newGoalText.trim() || isLoading}
            >
              {isLoading ? "Добавление..." : "Добавить"}
            </button>
            <button 
              className={styles.cancelButton}
              onClick={() => setIsAdding(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button 
          className={styles.addGoalButton}
          onClick={() => setIsAdding(true)}
          disabled={isLoading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Добавить цель
        </button>
      )}
    </div>
  );
}
