const axios = require('axios');
const cityMapper = require('../utils/cityMapper');

class HHService {
  async searchVacancies(params) {
    const { query, category, country, city, experience } = params;

    let searchText = [category, query].filter(Boolean).join(' ').trim();
    if (!searchText) {
      searchText = 'разработчик';
    }

    const apiUrl = 'https://api.hh.ru/vacancies';

    // Получаем ID города
    const areaId = city ? await cityMapper.getAreaId(city) : null;

    const queryParams = {
      text: searchText,
      area: areaId,
      experience: this.mapExperience(experience),
      per_page: 20,
      page: 0
    };

    console.log('Запрос в HH:', queryParams);

    const response = await axios.get(apiUrl, { params: queryParams });

    const result = response.data.items.map(vacancy => ({
      title: vacancy.name,
      company: vacancy.employer?.name ?? 'Нет данных',
      city: vacancy.area?.name ?? 'Не указано',
      date: vacancy.published_at,
      salary: vacancy.salary 
        ? `${vacancy.salary.from || ''} - ${vacancy.salary.to || ''} ${vacancy.salary.currency}` 
        : 'Не указана',
      experience: vacancy.experience?.name ?? 'Не указано',
      link: vacancy.alternate_url
    }));

    return result;
  }

  mapExperience(experience) {
    const map = {
      'noExperience': 'noExperience',
      'between1And3': 'between1And3',
      'between3And6': 'between3And6',
      'moreThan6': 'moreThan6'
    };

    return map[experience] || null;
  }
}

module.exports = new HHService();
