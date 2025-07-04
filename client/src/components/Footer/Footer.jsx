import styles from "./Footer.module.css";
import { FaTelegramPlane, FaGithub, FaLinkedin } from "react-icons/fa";

import { Link } from 'react-router-dom';



export default function Footer() {
  return (
      <footer className={styles.footer}>
        <div className={`container ${styles.footer__grid}`}>
          <div className={styles.footer__brand}>
            <Link to="/" className={styles.footer__logo}>KODO</Link>
            <p className={styles.footer__slogan}>Достигай<br />мастерства<br />шаг за шагом</p>
          </div>
        
          <div className={styles.footer__column}>
            <h4 className={styles.footer__title}>Обучение</h4>
            <ul>
              <li><Link to="/courses">Курсы</Link></li>
              <li><Link to="/vacancy-search">Вакансии</Link></li>
            </ul>
          </div>
        
          <div className={styles.footer__column}>
            <h4 className={styles.footer__title}>Платформа</h4>
            <ul>
              <li><Link to="/about">О проекте</Link></li>
              <li><Link to="#!">Контакты</Link></li>
            </ul>
          </div>
        
          <div className={styles.footer__column}>
            <h4 className={styles.footer__title}>Мы в сети</h4>
            <div className={styles.footer__social}>
              <Link to="https://t.me/kodylearn" target="_blank"><FaTelegramPlane /></Link>
              <Link to="https://github.com//donatikwin" target="_blank"><FaGithub /></Link>
              <Link to="https://linkedin.com/in//danil-donatikov-6a433734b/" target="_blank"><FaLinkedin /></Link>
            </div>
          </div>
        </div>
        
        <div className={styles.footer__bottom}>
          <p>&copy; {new Date().getFullYear()} Kodo — Путь к IT. Все права защищены.</p>
        </div>
      </footer>
  )
}
