import { useState, useEffect } from 'react';
import styles from './style/ProgressBlock.module.css';
import ProgressService from '../../service/ProgressService';

export default function ProgressBlock() {
  const [progressData, setProgressData] = useState(null);
  const [performance, setPerformance] = useState(0); 

  useEffect(() => {
    async function fetchProgress() {
      try {
        const data = await ProgressService.getProgress();
        setProgressData(data);

        const completedCourses = data.courses.length;
        const targetPerformance = Math.min(completedCourses * 6, 100);
        

        setTimeout(() => setPerformance(targetPerformance), 300);
      } catch (error) {
        console.error("Ошибка получения прогресса:", error);
      }
    }

    fetchProgress();
  }, []);

  const completedCourses = progressData?.courses?.length || 0;
  const totalHours = progressData?.courses?.reduce((sum, course) => sum + course.duration, 0) || 0;
  const totalLessons = progressData?.courses?.reduce((sum, course) => sum + course.lessons, 0) || 0;

  return (
    <div className={styles['progress-block']}>
      <h2 className={styles.title}>Твой прогресс</h2>
      
      <div className={styles['progress-container']}>
        <div className={styles['progress-bar']}>
          <div 
            className={styles['progress-bar__fill']} 
            style={{ width: `${performance}%` }}
          ></div>
        </div>
        <div className={styles['progress-stats']}>
          <span>Начато обучение</span>
          <span className={styles['progress-completion']}>{performance}% завершено</span>
        </div>
      </div>
      
      <p className={styles.description}>
        {`Вы завершили ${completedCourses} курсов текущего трека`}
      </p>
      
      <div className={styles['progress-details']}>
        <div className={styles['progress-metric']}>
          <div className={styles['progress-metric__value']}>{totalHours}</div>
          <div className={styles['progress-metric__label']}>Учебных часа</div>
        </div>
        <div className={styles['progress-metric']}>
          <div className={styles['progress-metric__value']}>{totalLessons}</div>
          <div className={styles['progress-metric__label']}>Пройденных уроков</div>
        </div>
        <div className={styles['progress-metric']}>
          <div className={styles['progress-metric__value']}>{performance}%</div>
          <div className={styles['progress-metric__label']}>Успеваемость</div>
        </div>
      </div>
    </div>
  );
}
