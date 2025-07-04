import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import courses from '../../data/courses';
import QuizBlock from '../../components/Quiz/QuizBlock';
import Certificate from '../../components/Certificate/Certificate';
import AuthService from '../../service/AuthService';
import styles from './CourseContentPage.module.css';

import ProgressService from '../../service/ProgressService';


export default function CourseContentPage() {
  const { id } = useParams();
  const course = courses.find(course => course.id === id);

  
  const [step, setStep] = useState(0);
  const [completedSections, setCompletedSections] = useState({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [username, setUsername] = useState('Гость');
  const section = course?.sections[step];

  const handleCompleteCourse = async () => {
    try {
      await ProgressService.submitCourseProgress(
        course.id, 
        course.duration, 
        course.sections.length
      );
      setShowCertificate(true);
    } catch (error) {
        console.error("Ошибка при сохранении прогресса:", error);
        alert("Ошибка при сохранении прогресса: " + error.message);
      }
    };


  useEffect(() => {
    AuthService.getMe()
      .then(data => setUsername(data.username))
      .catch(() => setUsername('Гость'));
  }, []);
  

  if (!course) {
    return <div className={styles.error}>Курс не найден.</div>;
  }

  if (!section) {
    return <div className={styles.error}>Раздел не найден.</div>;
  }

  const nextStep = () => {
    if (step < course.sections.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleSectionComplete = () => {
    setCompletedSections(prev => ({
      ...prev,
      [step]: true
    }));
  };

  const isLastStep = step === course.sections.length - 1;
  const isCurrentSectionCompleted = completedSections[step] || section.type !== 'quiz';
  const isCourseCompleted = isLastStep && isCurrentSectionCompleted;

  return (
    <div className={styles.coursePage}>
      <h1 className={styles.title}>{course.title}</h1>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${((step + 1) / course.sections.length) * 100}%` }}
        ></div>
      </div>
      
      {!showCertificate ? (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNumber}>Раздел {step + 1}:</span> {section.title}
          </h2>

          <div className={styles.content}>
            {section.type === 'intro' && <p>{section.content}</p>}
            {section.type === 'lesson' && (
              <div className={styles.lessonContent}>
                {section.content.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
            {section.type === 'quiz' && (
              <QuizBlock 
                questions={section.questions} 
                onComplete={handleSectionComplete}
              />
            )}
          </div>

          <div className={styles.navigation}>
            {step > 0 && (
              <button className={styles.backButton} onClick={prevStep}>
                ← Назад
              </button>
            )}
            
            <div className={styles.navRight}>
              {!isLastStep ? (
                <button 
                  className={styles.nextButton} 
                  onClick={nextStep}
                  disabled={section.type === 'quiz' && !isCurrentSectionCompleted}
                >
                  {section.type === 'quiz' && !isCurrentSectionCompleted ? 
                    'Завершите тест' : 'Далее →'}
                </button>
              ) : isCourseCompleted ? (
                <button 
                  className={styles.completeButton}
                  onClick={handleCompleteCourse}
                >
                  Завершить курс!
                </button>
              ) : (
                <button 
                  className={styles.nextButton} 
                  onClick={nextStep}
                  disabled={section.type === 'quiz' && !isCurrentSectionCompleted}
                >
                  {section.type === 'quiz' && !isCurrentSectionCompleted ? 
                    'Завершите тест' : 'Завершить →'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
      <Certificate course={course} username={username} />
      )}
    </div>
  );
}
