import { useState } from 'react';
import styles from './style/CourseFilter.module.css'

export default function CourseFilter({ onFilterChange }) {
  const [selectedTrack, setSelectedTrack] = useState('all');

  const handleChange = (e) => {
    const track = e.target.value;
    setSelectedTrack(track);
    onFilterChange(track);
  };

  return (
    <div className={styles['course-filter']}>
      <label htmlFor="track-select" className={styles.label}>
        <span className={styles['label-text']}>Направление обучения</span>
        <div className={styles['select-wrapper']}>
          <select 
            id="track-select" 
            value={selectedTrack} 
            onChange={handleChange}
            className={styles.select}
          >
            <option value="all" className={styles.option}>Все направления</option>
            <option value="frontend" className={styles.option}>Frontend разработка</option>
            <option value="backend" className={styles.option}>Backend разработка</option>
            <option value="fullstack" className={styles.option}>Fullstack разработка</option>
          </select>
          <div className={styles['select-arrow']}>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path d="M1 1L7 7L13 1" stroke="#818CF8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}