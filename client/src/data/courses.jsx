import jsImg from '../assets/course/js-course.jpg';
import reactImg from '../assets/course/react-course.jpg';
import nodeImg from '../assets/course/node-course.jpg';

const courses = [
  {
    id: 'js-basics',
    title: 'Основы JavaScript',
    description: 'Погрузись в мир фронтенда с основами JavaScript. Научись работать с переменными, функциями, объектами и асинхронным кодом. Идеальный старт для начинающих разработчиков.',
    image: jsImg,
    track: 'frontend',
    duration: 8,
    level: 'Начальный',
    learnings: [
      'Основы синтаксиса JavaScript',
      'Работа с DOM и событиями',
      'Асинхронный код и промисы',
      'ES6+ возможности языка',
      'Основы ООП в JavaScript'
    ],
    audience: [
      'Новички в программировании',
      'Фронтенд-разработчики начального уровня',
      'Те, кто хочет освежить основы JS'
    ],
    skills: [
      'JavaScript',
      'ES6+',
      'DOM API',
      'Асинхронное программирование'
    ],
    sections: [
      {
        type: "intro",
        title: "Введение в JavaScript",
        content: `Этот курс познакомит тебя с основами JavaScript — одного из самых популярных языков программирования в мире. Ты узнаешь, как объявлять переменные, использовать условия и начнёшь писать простые скрипты. Готов? Поехали!`
      },
      {
        type: "lesson",
        title: "Переменные: let, const, var",
        content: `JavaScript предлагает три способа объявления переменных: var, let и const. 
- \`var\` — устаревший способ, избегай его.
- \`let\` — используешь, когда значение будет меняться.
- \`const\` — используешь, когда значение не должно измениться.

Примеры:
\`\`\`js
let score = 0;
const name = "Данил";
\`\`\``
      },
      {
        type: "quiz",
        title: "Тест: Переменные",
        questions: [
          {
            question: "Какой тип переменной нельзя переназначить?",
            options: ["let", "const", "var"],
            answer: "const"
          },
          {
            question: "Какая переменная устарела и не рекомендуется к использованию?",
            options: ["let", "const", "var"],
            answer: "var"
          }
        ]
      },
      {
        type: "lesson",
        title: "Условия и логика",
        content: `Условия позволяют выполнять код в зависимости от логики. Используются конструкции \`if\`, \`else if\`, \`else\`.

Пример:
\`\`\`js
let age = 18;
if (age >= 18) {
  console.log("Ты взрослый");
} else {
  console.log("Ещё подрасти");
}
\`\`\`

Также можно использовать тернарный оператор:
\`\`\`js
const message = age >= 18 ? "Взрослый" : "Юнец";
\`\`\``
      },
      {
        type: "quiz",
        title: "Тест: Условия",
        questions: [
          {
            question: "Что вернёт выражение (true ? 'a' : 'b')?",
            options: ["a", "b", "ошибка"],
            answer: "a"
          },
          {
            question: "Что делает тернарный оператор?",
            options: [
              "Выполняет цикл",
              "Позволяет делать условную проверку",
              "Объявляет переменную"
            ],
            answer: "Позволяет делать условную проверку"
          }
        ]
      }
    ]
  },
  {
  id: 'react-mini',
  title: 'React: Быстрый старт',
  description: 'Освой основы React за короткое время. Создай своё первое приложение, изучи компоненты и хуки.',
  image: reactImg,
  track: 'frontend',
  duration: 5,
  level: 'Начальный',
  learnings: [
    'Создание React-компонентов',
    'Работа с состоянием (useState)',
    'Эффекты и жизненный цикл (useEffect)',
    'Базовая работа с пропсами',
    'Рендеринг списков'
  ],
  audience: [
    'Начинающие фронтенд-разработчики',
    'JavaScript-разработчики',
    'Те, кто хочет быстро освоить React'
  ],
  skills: [
    'React',
    'JSX',
    'Hooks',
    'Components'
  ],
  sections: [
    {
      type: "intro",
      title: "Введение в React",
      content: `React — это JavaScript-библиотека для создания пользовательских интерфейсов. В этом мини-курсе ты узнаешь основы React и создашь своё первое приложение. React использует компонентный подход, что делает код модульным и удобным для поддержки.`
    },
    {
      type: "lesson",
      title: "Твой первый компонент",
      content: `Компоненты — строительные блоки React-приложений. Простейший компонент:

\`\`\`jsx
function Greeting() {
  return <h1>Привет, мир!</h1>;
}
\`\`\`

Чтобы использовать компонент:
\`\`\`jsx
function App() {
  return (
    <div>
      <Greeting />
    </div>
  );
}
\`\`\``
    },
    {
      type: "quiz",
      title: "Тест: Компоненты",
      questions: [
        {
          question: "Как объявляется React-компонент?",
          options: [
            "Как обычная JavaScript-функция",
            "Как класс",
            "Оба варианта верны"
          ],
          answer: "Оба варианта верны"
        },
        {
          question: "Что возвращает компонент?",
          options: [
            "HTML-строку",
            "JSX",
            "DOM-элемент"
          ],
          answer: "JSX"
        }
      ]
    },
    {
      type: "lesson",
      title: "Хук useState",
      content: `useState позволяет добавлять состояние в функциональные компоненты:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Ты кликнул {count} раз</p>
      <button onClick={() => setCount(count + 1)}>
        Кликни меня
      </button>
    </div>
  );
}
\`\`\`

- \`count\` — текущее значение состояния
- \`setCount\` — функция для обновления состояния
- \`0\` — начальное значение`
    },
    {
      type: "quiz",
      title: "Тест: useState",
      questions: [
        {
          question: "Какой тип данных можно хранить в состоянии?",
          options: [
            "Только примитивы",
            "Любые JavaScript-значения",
            "Только объекты"
          ],
          answer: "Любые JavaScript-значения"
        },
        {
          question: "Как правильно обновить состояние?",
          options: [
            "count = count + 1",
            "setCount(count + 1)",
            "updateCount(count + 1)"
          ],
          answer: "setCount(count + 1)"
        }
      ]
    },
    {
      type: "lesson",
      title: "Хук useEffect",
      content: `useEffect позволяет выполнять побочные эффекты:

\`\`\`jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Прошло {seconds} секунд</div>;
}
\`\`\`

- Первый аргумент — функция эффекта
- Второй аргумент — массив зависимостей
- Возвращаемая функция — очистка эффекта`
    },
    {
      type: "quiz",
      title: "Тест: useEffect",
      questions: [
        {
          question: "Когда выполняется эффект без зависимостей?",
          options: [
            "Только при монтировании",
            "При каждом рендере",
            "Никогда"
          ],
          answer: "Только при монтировании"
        },
        {
          question: "Для чего нужна функция очистки?",
          options: [
            "Для отмены подписок",
            "Для сброса состояния",
            "Для остановки таймеров"
          ],
          answer: "Для отмены подписок"
        }
      ]
    },
    {
      type: "lesson",
      title: "Работа с пропсами",
      content: `Пропсы (props) — это способ передачи данных между компонентами:

\`\`\`jsx
function Welcome(props) {
  return <h1>Привет, {props.name}!</h1>;
}

function App() {
  return <Welcome name="Анна" />;
}
\`\`\`

Можно использовать деструктуризацию:
\`\`\`jsx
function Welcome({ name }) {
  return <h1>Привет, {name}!</h1>;
}
\`\`\``
    },
    {
      type: "quiz",
      title: "Тест: Пропсы",
      questions: [
        {
          question: "Как передать пропсы в компонент?",
          options: [
            "Через атрибуты JSX",
            "Через аргументы функции",
            "Через this.props"
          ],
          answer: "Через атрибуты JSX"
        },
        {
          question: "Можно ли изменять пропсы внутри компонента?",
          options: [
            "Да",
            "Нет",
            "Только если они объекты"
          ],
          answer: "Нет"
        }
      ]
    },
    {
      type: "lesson",
      title: "Рендеринг списков",
      content: `Для рендеринга списков используйте метод map:

\`\`\`jsx
function TodoList() {
  const todos = ['Изучить React', 'Написать приложение', 'Развернуть проект'];

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
\`\`\`

Важно:
- Всегда добавляйте \`key\` для элементов списка
- \`key\` должен быть уникальным среди соседей
- Лучше использовать ID, а не индекс`
    },
    {
      type: "quiz",
      title: "Тест: Списки",
      questions: [
        {
          question: "Зачем нужен key при рендеринге списка?",
          options: [
            "Для стилизации элементов",
            "Для оптимизации обновлений",
            "Это требование синтаксиса"
          ],
          answer: "Для оптимизации обновлений"
        },
        {
          question: "Какой метод используется для рендеринга списка?",
          options: [
            "forEach",
            "map",
            "filter"
          ],
          answer: "map"
        }
      ]
    }
  ]
  },
  {
    id: 'fullstack-master',
    title: 'Fullstack разработка',
    description: 'Полный цикл разработки приложения: React, Node.js, базы данных и деплой. Стань универсальным разработчиком.',
    image: nodeImg,
    track: 'fullstack',
    duration: 15,
    level: 'Продвинутый',
    learnings: [
      'Интеграция фронтенда и бэкенда',
      'JWT аутентификация',
      'Оптимизация fullstack-приложений',
      'Деплой на облачные платформы',
      'Best practices'
    ],
    audience: [
      'Разработчики с опытом работы',
      'Те, кто хочет стать fullstack-инженером',
      'Team lead-ы, расширяющие кругозор'
    ],
    skills: [
      'React',
      'Node.js',
      'Database',
      'Deployment'
    ],
    sections: []
  }
];

export default courses;

