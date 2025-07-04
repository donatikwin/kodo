import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './home.module.css';
import TechBackground from '../../assets/background/TechBackground'

import { IoRocketOutline } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faPython, faReact, faNodeJs } from '@fortawesome/free-brands-svg-icons';



export default function Home() {
  const techStack = [
  { name: 'JavaScript', icon: faJs, percentage: 90 },
  { name: 'React', icon: faReact, percentage: 85 },
  { name: 'Python', icon: faPython, percentage: 75 },
  { name: 'Node.js', icon: faNodeJs, percentage: 80 }
  ];
  return (
    <div className={styles.home}>
      {/* Hero секция */}
      <section className={styles.hero}>
        <TechBackground />
        <div className={styles.heroContent}>
          <div className={styles.heroContent__text}>
            <h1 className={`${styles.heroTitle} ${styles.titleColor}`}>Прокачай IT-навыки с нуля</h1>
            <p className={styles.heroSubtitle}>Изучи. Применяй. Расти.</p>
          </div>
          <div className={styles.heroButtons}>
            <Link to="/auth/register">
              <Button variant="hero">Начать сейчас
                <IoRocketOutline />
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.gradientCircle}></div>
          <div className={styles.floatingElements}>
            <div className={styles.element1}></div>
            <div className={styles.element2}></div>
            <div className={styles.element3}></div>
          </div>
        </div>
      </section>

      {/* Features секция */}
      <section className={styles.features}>
        <h2 className={`${styles.sectionTitle} ${styles.titleColor}`}>Почему выбирают нас</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <IoRocketOutline />
            </div>
            <h3>Быстрый старт</h3>
            <p>Начните обучение сразу после регистрации без лишних сложностей</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaBookOpen />
            </div>
            <h3>Экспертные знания</h3>
            <p>Доступ к материалам от практикующих специалистов</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaRegLightbulb />
            </div>
            <h3>Интерактивность</h3>
            <p>Практические задания и мгновенная проверка</p>
          </div>
        </div>
      </section>
      
      {/* Секция технологий */}
      <section className={styles.techSection}>
        <h2 className={`${styles.sectionTitle} ${styles.titleColor}`}>Освойте востребованные технологии</h2>
        <div className={styles.techGrid}>
          {techStack.map((tech, index) => (
            <div key={index} className={styles.techCard}>
              <div className={styles.techHeader}>
                <FontAwesomeIcon
                  icon={tech.icon}
                  className={styles.techIcon}
                  style={{ color: getTechColor(tech.name) }}
                />
                <h3>{tech.name}</h3>
              </div>
              <div className={styles.progressContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${tech.percentage}%`,
                    backgroundColor: getTechColor(tech.name),
                  }}
                />
              </div>
              <span className={styles.percentageLabel}>
                {tech.percentage}% востребованности
              </span>
            </div>
          ))}
         </div>
      </section>

      {/* CTA секция */}
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
  );
}

function getTechColor(techName) {
  const colors = {
    'JavaScript': '#f0db4f',
    'React': '#61dafb',
    'Python': '#3776ab',
    'Node.js': '#68a063'
  };
  return colors[techName] || '#2563eb';
}