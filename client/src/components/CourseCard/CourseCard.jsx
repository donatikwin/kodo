import styles from './CourseCard.module.css';

export default function CourseCard({ course, onOpen }) {
  const trackClass = {
    frontend: styles.trackFrontend,
    backend: styles.trackBackend,
    fullstack: styles.trackFullstack
  }[course.track] || '';

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={course.image} alt={course.title} className={styles.image} />
        <div className={`${styles.track} ${trackClass}`}>
          {course.track === 'frontend' && 'Frontend'}
          {course.track === 'backend' && 'Backend'}
          {course.track === 'fullstack' && 'Fullstack'}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>

        <div className={styles.meta}>
          <span className={styles.duration}>⏱️ {course.duration} уроков</span>
          <span className={styles.level}>📊 {course.level}</span>
        </div>

        <button className={styles.button} onClick={() => onOpen(course.id)}>
          <span>Открыть курс</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}