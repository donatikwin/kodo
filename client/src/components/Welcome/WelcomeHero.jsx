import { useEffect, useState } from 'react';
import { FaRocket } from 'react-icons/fa';
import AuthService from '../../service/AuthService';

import styles from './style/WelcomeHero.module.css';

export default function WelcomeHero() {
  const [username, setUsername] = useState('Гость');

  useEffect(() => {
    AuthService.getMe()
      .then(data => setUsername(data.username))
      .catch(() => setUsername('Гость'));
  }, []);

  return (
    <section className={styles.welcomeHero}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeText}>
          <h1>Привет, <span className={styles.username}>{username}</span>!</h1>
          <p>Добро пожаловать в <strong>Kodo</strong> — твой путь в IT начинается прямо здесь.</p>
        </div>
        <div className={styles.welcomeIcon}>
          <FaRocket />
        </div>
      </div>
    </section>
  );
}
