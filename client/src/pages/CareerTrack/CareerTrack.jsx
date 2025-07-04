import { useState, useEffect } from 'react';
import { FaCheck, FaCircle } from 'react-icons/fa';
import styles from './CareerLevelTrack.module.css';
import careerLevels from '../../data/careerLevels';

const COMPLETED_SKILLS_KEY = 'career-tracker-completed-skills';

export default function CareerLevelTrack() {
  const [selectedTech, setSelectedTech] = useState('frontend');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [completedSkills, setCompletedSkills] = useState({});


  useEffect(() => {
    const savedSkills = localStorage.getItem(COMPLETED_SKILLS_KEY);
    if (savedSkills) {
      try {
        setCompletedSkills(JSON.parse(savedSkills));
      } catch (e) {
        console.error('Failed to parse saved skills', e);
      }
    }
  }, []);

  const levels = careerLevels[selectedTech];

  useEffect(() => {
    localStorage.setItem(COMPLETED_SKILLS_KEY, JSON.stringify(completedSkills));
  }, [completedSkills]);
  

  const toggleSkillCompletion = (category, index) => {
    const skillKey = `${selectedTech}-${selectedLevel}-${category}-${index}`;
    setCompletedSkills(prev => {
      const newState = {
        ...prev,
        [skillKey]: !prev[skillKey]
      };
      return newState;
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Карьерный путь по уровням</h2>
        <p className={styles.subtitle}>Выбери направление и свой текущий уровень</p>
      </div>

      <div className={styles.techSelector}>
        {Object.keys(careerLevels).map(tech => (
          <button
            key={tech}
            className={`${styles.techButton} ${selectedTech === tech ? styles.active : ''}`}
            onClick={() => {
              setSelectedTech(tech);
              setSelectedLevel(null);
            }}
            data-tech={tech}
          >
            {tech === 'frontend' && 'Frontend'}
            {tech === 'backend' && 'Backend'}
            {tech === 'fullstack' && 'Fullstack'}
          </button>
        ))}
      </div>

      <div className={styles.levelsContainer}>
        <div className={styles.levels}>
          {Object.entries(levels).map(([key, level]) => (
            <div
              key={key}
              className={`${styles.levelCard} ${selectedLevel === key ? styles.selected : ''}`}
              onClick={() => setSelectedLevel(key)}
              data-level={key}
            >
              <div className={styles.levelContent}>
                <h3 className={styles.levelTitle}>{level.title}</h3>
                <span className={styles.levelLabel}>{key}</span>
              </div>
              <div className={styles.levelProgress}></div>
            </div>
          ))}
        </div>

        <div className={styles.detailsContainer}>
          {selectedLevel ? (
            <div className={styles.levelDetails}>
              <div className={styles.levelHeader}>
                <h3 className={styles.detailTitle}>{levels[selectedLevel].title}</h3>
                <span className={styles.levelPill} data-level={selectedLevel}>
                  {selectedLevel}
                </span>
              </div>

              <div className={styles.categories}>
                <div className={styles.category}>
                  <div className={styles.categoryHeader}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#818CF8"/>
                      <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6Z" fill="#818CF8"/>
                      <path d="M12 16C9.33 16 4 17.34 4 20V21H20V20C20 17.34 14.67 16 12 16Z" fill="#818CF8"/>
                    </svg>
                    <h4>Что нужно знать</h4>
                  </div>
                  <ul className={styles.skillList}>
                    {levels[selectedLevel].know.map((item, i) => {
                      const skillKey = `${selectedTech}-${selectedLevel}-know-${i}`;
                      return (
                        <li 
                          key={i} 
                          className={`${styles.skillItem} ${completedSkills[skillKey] ? styles.completed : ''}`}
                          onClick={() => toggleSkillCompletion('know', i)}
                        >
                          <span className={styles.bullet}>
                            {completedSkills[skillKey] ? (
                              <FaCheck className={styles.checkIcon} />
                            ) : (
                              <FaCircle className={styles.circleIcon} />
                            )}
                          </span>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={styles.category}>
                  <div className={styles.categoryHeader}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" stroke="#818CF8" strokeWidth="2"/>
                      <path d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z" stroke="#818CF8" strokeWidth="2"/>
                      <path d="M9 5C9 3.9 9.9 3 11 3H13C14.1 3 15 3.9 15 5V7H9V5Z" stroke="#818CF8" strokeWidth="2"/>
                    </svg>
                    <h4>Что уметь</h4>
                  </div>
                  <ul className={styles.skillList}>
                    {levels[selectedLevel].do.map((item, i) => {
                      const skillKey = `${selectedTech}-${selectedLevel}-do-${i}`;
                      return (
                        <li 
                          key={i} 
                          className={`${styles.skillItem} ${completedSkills[skillKey] ? styles.completed : ''}`}
                          onClick={() => toggleSkillCompletion('do', i)}
                        >
                          <span className={styles.bullet}>
                            {completedSkills[skillKey] ? (
                              <FaCheck className={styles.checkIcon} />
                            ) : (
                              <FaCircle className={styles.circleIcon} />
                            )}
                          </span>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={styles.category}>
                  <div className={styles.categoryHeader}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h4>Что прокачать</h4>
                  </div>
                  <ul className={styles.skillList}>
                    {levels[selectedLevel].improve.map((item, i) => {
                      const skillKey = `${selectedTech}-${selectedLevel}-improve-${i}`;
                      return (
                        <li 
                          key={i} 
                          className={`${styles.skillItem} ${completedSkills[skillKey] ? styles.completed : ''}`}
                          onClick={() => toggleSkillCompletion('improve', i)}
                        >
                          <span className={styles.bullet}>
                            {completedSkills[skillKey] ? (
                              <FaCheck className={styles.checkIcon} />
                            ) : (
                              <FaCircle className={styles.circleIcon} />
                            )}
                          </span>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.prompt}>
              <div className={styles.promptIllustration}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#818CF8" strokeWidth="2"/>
                  <path d="M12 8V12V16" stroke="#818CF8" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 8V12" stroke="#818CF8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className={styles.promptTitle}>Выбери свой уровень</h3>
              <p className={styles.promptText}>
                Нажми на карточку уровня, чтобы увидеть подробную информацию 
                о необходимых навыках и рекомендации для развития
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}