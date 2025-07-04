import { useNavigate, useParams } from 'react-router-dom';
import courses from '../../data/courses';
import styles from './CourseIntroPage.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function CourseIntroPage() {
  const { id } = useParams();
  const navigate = useNavigate();
   const { isAuthenticated } = useAuth();
  
  const course = courses.find(c => c.id === id || c.id.toString() === id);

  if (!course) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h2>Курс не найден</h2>
          <p>Возможно, этот курс был перемещен или удален</p>
          <button 
            className={styles.backButton}
            onClick={() => navigate('/courses')}
          >
            Вернуться к списку курсов
          </button>
        </div>
      </div>
    );
  }

  const handleStartCourse = () => {
    if (isAuthenticated) {
      navigate(`/course/${course.id}/learn`);
    } else {
      alert("Чтобы начать обучение, пожалуйста, авторизуйтесь.");
    }
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={`${styles.trackBadge} ${styles[course.track]}`}>
            {course.track === 'frontend' && 'Frontend'}
            {course.track === 'backend' && 'Backend'}
            {course.track === 'fullstack' && 'Fullstack'}
          </span>
          
          <h1 className={styles.title}>{course.title}</h1>
          
          <p className={styles.heroDescription}>{course.shortDescription || course.description.substring(0, 120) + '...'}</p>
          
          <div className={styles.metaGrid}>
            <div className={styles.metaCard}>
              <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <span className={styles.metaLabel}>Длительность</span>
                <span className={styles.metaValue}>{course.duration} уроков</span>
              </div>
            </div>
            
            <div className={styles.metaCard}>
              <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 5V11C4 16.55 7.84 21.74 13 22C18.16 21.74 22 16.55 22 11V5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 7H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <span className={styles.metaLabel}>Уровень</span>
                <span className={styles.metaValue}>{course.level}</span>
              </div>
            </div>
            
            <div className={styles.metaCard}>
              <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 8H8V16H16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <span className={styles.metaLabel}>Формат</span>
                <span className={styles.metaValue}>Видео + Практика</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.heroImage}>
          <img 
            src={course.image} 
            alt={course.title} 
            className={styles.courseImage}
          />
          <div className={styles.imageDecoration}></div>
        </div>
      </div>

      <main className={styles.mainContent}>
        {/* Секция с навыками */}
        <section className={styles.skillsSection}>
          <h2 className={styles.sectionTitle}>
            <span>Приобретаемые</span> навыки
          </h2>
          <div className={styles.skillsGrid}>
            {course.skills?.map((skill, i) => (
              <span key={i} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Детали курса */}
        <section className={styles.detailsSection}>
          <div className={styles.detailsColumn}>
            <div className={styles.detailsCard}>
              <h3 className={styles.detailsTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#818CF8" strokeWidth="2"/>
                  <path d="M12 8V12L16 14" stroke="#818CF8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Что вы узнаете
              </h3>
              <ul className={styles.featureList}>
                {course.learnings?.map((item, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.featureIcon}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={styles.detailsColumn}>
            <div className={styles.detailsCard}>
              <h3 className={styles.detailsTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Для кого этот курс
              </h3>
              <ul className={styles.featureList}>
                {course.audience?.map((item, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.featureIcon}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Призыв к действию */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Готовы начать?</h3>
            <p className={styles.ctaText}>
              Присоединяйтесь к {course.title} и сделайте первый шаг к освоению новых технологий уже сегодня!
            </p>
            <div className={styles.ctaButtons}>
                {/* начать курсы  */}
              <button 
                className={`${styles.startButton} ${!isAuthenticated ? styles.disabledButton : ''}`}
                onClick={handleStartCourse}
              >
                Начать обучение
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button 
                className={styles.secondaryButton}
                onClick={() => navigate('/courses')}
              >
                Посмотреть другие курсы
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );  
}