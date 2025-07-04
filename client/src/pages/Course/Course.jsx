import { useState } from 'react';
import styles from './CoursesPage.module.css';
import courses from '../../data/courses';
import CourseFilter from '../../components/Welcome/CourseFilter';
import CourseCard from '../../components/CourseCard/CourseCard';
import { useNavigate } from 'react-router-dom';

export default function CoursesPage() {
  const [track, setTrack] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCourses = courses.filter(course => {
    const matchesTrack = track === 'all' || course.track === track;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  const handleOpenCourse = (id) => {
    navigate(`/course/${id}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Все курсы</h2>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Поиск курсов..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />

          <CourseFilter onFilterChange={setTrack} />
        </div>
      </div>

      <div className={styles.coursesGrid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onOpen={handleOpenCourse}
            />
          ))
        ) : (
          <p className={styles.noResults}>Курсы не найдены. Попробуйте изменить параметры поиска.</p>
        )}
      </div>
    </div>
  );
}