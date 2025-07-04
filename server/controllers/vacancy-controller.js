const hhService = require('../service/hh-service');

class VacancyController {
  async getVacancies(req, res, next) {
    try {
      const { query = '', category = '', country = '', city = '', experience = '' } = req.query;

      const searchParams = {
        query,
        category,
        country,
        city,
        experience
      };

      const vacancies = await hhService.searchVacancies(searchParams);
      res.json(vacancies);
    } catch (e) {
      console.error('Ошибка при поиске вакансий:', e.message);
      res.status(503).json({
        message: 'Сервис вакансий временно недоступен. Попробуйте позже.'
      });
    }
  }
}

module.exports = new VacancyController();
