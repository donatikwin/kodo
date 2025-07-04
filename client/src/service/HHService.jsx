import axios from 'axios';

class HHService {
  static specializationMap = {
    frontend: 'frontend',
    backend: 'backend',
    fullstack: 'fullstack',
    design: 'дизайн',
    mobile: 'мобильная разработка'
  };

  static experienceMap = {
    noExperience: 'noExperience',
    between1And3: 'between1And3',
    between3And6: 'between3And6',
    moreThan6: 'moreThan6'
  };

  static buildSearchText(query, category, city) {
    const specialization = this.specializationMap[category] || '';
    const parts = [query, specialization, city].filter(Boolean);
    return parts.join(' ');
  }

  static buildParams(query, category, areaId, city, experience) {
    return {
      text: this.buildSearchText(query, category, city),
      area: areaId,
      experience: this.experienceMap[experience],
      per_page: 50,
      only_with_salary: false
    };
  }

  static transformVacancy(item) {
    return {
      id: item.id,
      title: item.name,
      company: item.employer?.name || 'Не указано',
      city: item.area?.name || 'Не указано',
      experience: item.experience?.name || 'Не указано',
      salary: item.salary 
        ? `${item.salary.from || ''} - ${item.salary.to || ''} ${item.salary.currency || ''}` 
        : 'Не указано',
      link: item.alternate_url,
      date: item.published_at
    };
  }

  static async getVacancies(query, category, areaId, city, experience) {
    try {
      const params = this.buildParams(query, category, areaId, city, experience);
      const response = await axios.get('https://api.hh.ru/vacancies', { params });

      if (!response.data.items) {
        return [];
      }

      return response.data.items.map(this.transformVacancy);
    } catch (error) {
      console.error('Ошибка при получении вакансий с HH:', error);
      return [];
    }
  }
}

export default HHService;
