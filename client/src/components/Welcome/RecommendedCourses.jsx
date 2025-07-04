import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './style/RecommendedCourses.module.css';
import courses from '../../data/courses';
import CourseFilter from './CourseFilter';

export default function RecommendedCourses() {
  const [track, setTrack] = useState('all');

  const navigate = useNavigate();

  const filteredCourses = track === 'all' 
    ? courses 
    : courses.filter(course => course.track === track);

  return (
    <div className={styles['recommended-courses']}>
      <div className={styles.header}>
        <h2 className={styles.title}>Рекомендуемые курсы</h2>
        <div className={styles.filter}>
          <CourseFilter onFilterChange={setTrack} />
        </div>
      </div>
      
      <div className={styles['courses-grid']}>
        {filteredCourses.map(course => (
          <div key={course.id} className={styles['course-card']}>
            <div className={styles['image-wrapper']}>
              <img 
                src={course.image} 
                alt={course.title} 
                className={styles.image}
              />
              <div className={styles.track} data-track={course.track}>
                {course.track === 'frontend' && 'Frontend'}
                {course.track === 'backend' && 'Backend'}
                {course.track === 'fullstack' && 'Fullstack'}
              </div>
            </div>
            
            <div className={styles.content}>
              <h3 className={styles['course-title']}>{course.title}</h3>
              <p className={styles.description}>{course.description}</p>
              
              <div className={styles.meta}>
                <span className={styles.duration}>⏱️ {course.duration} уроков</span>
                <span className={styles.level}>📊 {course.level}</span>
              </div>
              
              <button 
                className={styles.button}
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <span>Начать обучение</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button 
        className={`${styles.showAllButton}`} 
        onClick={() => navigate('/courses')}
      >
        <span>Показать все курсы</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}