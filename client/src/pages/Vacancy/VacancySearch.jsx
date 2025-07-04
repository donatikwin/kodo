import { useState } from 'react';
import './VacancySearch.css';

export default function VacancySearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('Казахстан');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('noExperience');
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVacancies([]);

    try {
      const params = new URLSearchParams({
        query,
        category,
        country,
        city,
        experience,
      });

      const response = await fetch(`/api/vacancies?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Сервер вернул ошибку');
      }

      const data = await response.json();
      setVacancies(data);
    } catch (err) {
      setError('Ошибка при получении вакансий. Попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vacancy-container">
      <div className="vacancy-header">
        <h2 className="vacancy-heading">Поиск вакансий</h2>
        <div className="vacancy-subheading">Найди работу своей мечты</div>
      </div>

      <form onSubmit={handleSearch} className="vacancy-form">
        <div className="form-group">
          <label htmlFor="query" className="input-label">Ключевые слова</label>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="React, Python, Design..."
            className="vacancy-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="input-label">Категория</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="vacancy-select"
            disabled={loading}
          >
            <option value="">--</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="design">Дизайн</option>
            <option value="mobile">Мобильная разработка</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="country" className="input-label">Страна</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="vacancy-select"
            disabled={loading}
          >
            <option value="">--</option>
            <option value="Казахстан">Казахстан</option>
            <option value="Россия">Россия</option>
            <option value="Беларусь">Беларусь</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="city" className="input-label">Город</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введите город"
            className="vacancy-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience" className="input-label">Опыт</label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="vacancy-select"
            disabled={loading}
          >
            <option value="noExperience">Нет опыта</option>
            <option value="between1And3">1-3 года</option>
            <option value="between3And6">3-6 лет</option>
            <option value="moreThan6">Больше 6 лет</option>
          </select>
        </div>

        <button type="submit" className="vacancy-button" disabled={loading}>
          {loading ? <><span className="spinner"></span> Поиск... </> : 'Найти вакансии'}
        </button>
      </form>

      {error && (
        <div className="vacancy-error-message">{error}</div>
      )}

      <div className="vacancy-results">
        {vacancies.length === 0 && !loading && !error && (
          <div className="vacancy-empty-state">
            <p>Вакансии не найдены. Измените параметры поиска.</p>
          </div>
        )}

        <ul className="vacancy-list">
          {vacancies.map((vacancy) => (
            <li key={vacancy.id} className="vacancy-card">
              <div className="vacancy-card-header">
                <h3 className="vacancy-title">{vacancy.title || 'Без названия'}</h3>
                <span className="vacancy-date">
                  {vacancy.date ? new Date(vacancy.date).toLocaleDateString() : 'Дата не указана'}
                </span>
              </div>
              <p className="vacancy-company">{vacancy.company || 'Компания не указана'}</p>
              <div className="vacancy-meta">
                <span className="vacancy-city">{vacancy.city || 'Город не указан'}</span>
                <span className="vacancy-experience">{vacancy.experience || 'Опыт не указан'}</span>
              </div>
              <div className="vacancy-salary">
                {vacancy.salary || 'Зарплата не указана'}
              </div>
              <a href={vacancy.link} target="_blank" rel="noreferrer" className="vacancy-link">
                Подробнее
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
