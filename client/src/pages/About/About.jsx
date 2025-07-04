import styles from './About.module.css';

import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

import { 
  FiBook,
  FiCode, 
  FiBriefcase, 
  FiFileText } 
from 'react-icons/fi';


export default function About() {
  return (
    <div className={styles.home}>
    <section className={styles.heroWhy}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          <span className={styles.underline}>Почему Kodo?</span>
        </h1>
        
        <p className={styles.subtitle}>
          Потому что мы делаем вход в IT доступным без:
        </p>
        
        <div className={styles.listContainer}>
          <ul className={styles.list}>
            <li className={styles.listItem}>Лишнего шума и воды</li>
            <li className={styles.listItem}>Переплат за курсы</li>
            <li className={styles.listItem}>Пустых обещаний</li>
            <li className={styles.listItem}>Ненужной теории</li>
          </ul>
        </div>

        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statText}>Практики</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>0₽</span>
            <span className={styles.statText}>Без скрытых платежей</span>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.problems}>
      <div className={styles.problemsContainer}>
        <h2 className={styles.problemsTitle}>
          <span className={styles.titleAccent}>Что мешает</span> новичкам в IT?
        </h2>

        <div className={styles.problemsTimeline}>
          <div className={styles.problemItem}>
            <div className={styles.problemNumber}>01</div>
            <div className={styles.problemContent}>
              <h3>Информационный хаос</h3>
              <p>Слишком много несистемных материалов, разрозненных источников</p>
            </div>
          </div>

          <div className={styles.problemItem}>
            <div className={styles.problemNumber}>02</div>
            <div className={styles.problemContent}>
              <h3>Отсутствие навигации</h3>
              <p>Сложно понять, с чего начать и как выстроить путь обучения</p>
            </div>
          </div>

          <div className={styles.problemItem}>
            <div className={styles.problemNumber}>03</div>
            <div className={styles.problemContent}>
              <h3>Нехватка поддержки</h3>
              <p>Нет реальной обратной связи и наставничества</p>
            </div>
          </div>

          <div className={styles.problemItem}>
            <div className={styles.problemNumber}>04</div>
            <div className={styles.problemContent}>
              <h3>Финансовые барьеры</h3>
              <p>Дорогие курсы с непонятной отдачей и качеством</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Что вы найдёте на платформе</h2>
       
       <div className={styles.featuresGrid}>
         <div className={styles.featureCard}>
           <div className={styles.featureIcon}><FiBook /></div>
           <h3>Бесплатные курсы с дорожной картой</h3>
           <p>Пошаговое обучение с практическими заданиями и трекингом прогресса</p>
           <div className={styles.featureGlow} />
         </div>
         
         <div className={styles.featureCard}>
           <div className={styles.featureIcon}><FiCode /></div>
           <h3>Интерактивные задания и проекты</h3>
           <p>Реальные проекты с автоматической проверкой и системой подсказок</p>
           <div className={styles.featureGlow} />
         </div>
         
         <div className={styles.featureCard}>
           <div className={styles.featureIcon}><FiBriefcase /></div>
           <h3>Карьерный трек и поиск вакансий</h3>
           <p>Подготовка к собеседованиям и доступ к эксклюзивным вакансиям</p>
           <div className={styles.featureGlow} />
         </div>
         
         <div className={styles.featureCard}>
           <div className={styles.featureIcon}><FiFileText /></div>
           <h3>Блог от разработчиков для разработчиков</h3>
           <p>Актуальные статьи и кейсы из опыта работы в IT-индустрии</p>
           <div className={styles.featureGlow} />
         </div>
       </div>
    </section>

    <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Начните прямо сейчас</h2>
          <p>Тысячи разработчиков уже в пути — не упусти свой шанс!</p>
          <Link to="/auth/register">
            <Button variant="heroCta">Создать аккаунт</Button>
          </Link>
        </div>
    </section>
    </div>
  )
}