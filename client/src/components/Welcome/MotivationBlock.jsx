import styles from './style/MotivationBlock.module.css';

export default function MotivationBlock() {
  return (
    <div className={styles.motivationBlock}>
      <div className={styles.motivationContent}>
        <h2 className={styles.motivationTitle}>Твоя мотивация на сегодня <span className={styles.emoji}>💪</span></h2>
        <p className={styles.motivationQuote}>
          "Большое начинается с малого. Один шаг каждый день — и ты уже на голову выше вчерашнего себя."
        </p>
        <div className={styles.motivationAuthor}>Danil Bessarab — Основатель платформы</div>
      </div>
      <div className={styles.motivationIllustration}>
        <div className={styles.glow}></div>
      </div>
    </div>
  );
}