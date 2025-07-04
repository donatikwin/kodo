const axios = require('axios');
const fs = require('fs');
const path = require('path');

const areasFilePath = path.join(__dirname, 'areas.json');

class CityMapper {
  constructor() {
    this.areas = [];
  }

  async init() {

    if (fs.existsSync(areasFilePath)) {
      console.log('Загружаем areas из локального кэша');
      const data = fs.readFileSync(areasFilePath);
      this.areas = JSON.parse(data);
    } else {
      console.log('Скачиваем areas с HH');
      await this.fetchAndCacheAreas();
    }
  }

  async fetchAndCacheAreas() {
    const response = await axios.get('https://api.hh.ru/areas');
    this.areas = response.data;
    fs.writeFileSync(areasFilePath, JSON.stringify(this.areas, null, 2));
  }

  searchArea(cityName) {
    const lowerName = cityName.trim().toLowerCase();

    function search(areas) {
      for (const area of areas) {
        if (area.name.toLowerCase() === lowerName) {
          return area.id;
        }
        const found = search(area.areas);
        if (found) return found;
      }
      return null;
    }

    return search(this.areas);
  }

  async getAreaId(cityName) {
    if (!this.areas.length) {
      await this.init();
    }
    return this.searchArea(cityName);
  }
}

module.exports = new CityMapper();