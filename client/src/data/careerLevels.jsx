const careerLevels = {
  frontend: {
    beginner: {
      title: 'Начинающий',
      know: ['HTML, CSS, базовый JavaScript'],
      do: ['Верстать простые страницы', 'Понимать DOM'],
      improve: ['Изучить основы React', 'Улучшить CSS навыки']
    },
    junior: {
      title: 'Junior',
      know: ['Основы React, JS ES6+', 'Работа с API'],
      do: ['Создавать SPA', 'Работать с Git'],
      improve: ['Роутинг, состояние, хуки']
    },
    middle: {
      title: 'Middle',
      know: ['Продвинутый React', 'Оптимизация производительности'],
      do: ['Архитектура приложений', 'Работа в команде'],
      improve: ['TypeScript', 'Тестирование']
    },
    senior: {
      title: 'Senior',
      know: ['Системный дизайн', 'Паттерны проектирования'],
      do: ['Менторство', 'Техническое лидерство'],
      improve: ['Управление проектами', 'DevOps основы']
    }
  },

  backend: {
    beginner: {
      title: 'Начинающий',
      know: ['Основы Node.js', 'HTTP и REST', 'Базовый JavaScript'],
      do: ['Создавать простые API', 'Подключать базы данных'],
      improve: ['Express', 'Работа с MongoDB или SQL']
    },
    junior: {
      title: 'Junior',
      know: ['Express, MongoDB или PostgreSQL', 'Асинхронность в JS'],
      do: ['Разрабатывать REST API', 'Аутентификация, валидация'],
      improve: ['JWT, WebSockets, Docker']
    },
    middle: {
      title: 'Middle',
      know: ['Архитектура приложений', 'Безопасность', 'CI/CD'],
      do: ['Проектировать API', 'Настраивать серверное окружение'],
      improve: ['TypeScript', 'Тестирование и логирование']
    },
    senior: {
      title: 'Senior',
      know: ['Микросервисы', 'Скалируемость', 'Мониторинг'],
      do: ['Вести команду', 'Обеспечивать отказоустойчивость'],
      improve: ['DevOps практики', 'Высоконагруженные системы']
    }
  },

  fullstack: {
    beginner: {
      title: 'Начинающий',
      know: ['HTML, CSS, базовый JS', 'Основы Node.js'],
      do: ['Создавать простые сайты с сервером'],
      improve: ['React + Express связка', 'Работа с API и БД']
    },
    junior: {
      title: 'Junior',
      know: ['React, Express, MongoDB/PostgreSQL', 'Асинхронность'],
      do: ['Создание SPA с серверной логикой'],
      improve: ['Роутинг, авторизация, структура проекта']
    },
    middle: {
      title: 'Middle',
      know: ['Архитектура Fullstack приложений', 'TypeScript', 'CI/CD'],
      do: ['Разработка полного цикла', 'Оптимизация и тестирование'],
      improve: ['Next.js, SSR', 'GraphQL, WebSockets']
    },
    senior: {
      title: 'Senior',
      know: ['Микрофронтенды + микросервисы', 'Облачные решения'],
      do: ['Руководство командой', 'Дизайн архитектуры'],
      improve: ['DevOps, Kubernetes', 'Product thinking']
    }
  }
};

export default careerLevels;
