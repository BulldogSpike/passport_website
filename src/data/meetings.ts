import type { CareerMeeting } from './types';

export const meetings: CareerMeeting[] = [
  {
    id: 'it-digital-products',
    title: 'IT и цифровые продукты',
    status: 'planned',
    plannedDate: 'октябрь 2026',
    format: 'Смешанный формат',
    speaker: 'Frontend/backend-разработчик или студент IT-направления',
    audience: '8-11 классы',
    description:
      'Встреча о том, как создаются сайты, приложения и цифровые сервисы, какие навыки нужны для старта и как школьнику собрать первые проекты.',
    relatedProfessionIds: ['frontend-developer', 'backend-developer', 'data-analyst', 'ux-ui-designer'],
    materials: ['Презентация о профессиях в IT', 'Список первых учебных проектов', 'Ссылки на маршруты обучения'],
    expectedResult: 'Участники понимают различия между ролями в IT и видят первые шаги для самостоятельной пробы.',
  },
  {
    id: 'people-helping-professions',
    title: 'Профессии помощи людям',
    status: 'planned',
    plannedDate: 'октябрь-ноябрь 2026',
    format: 'Очно',
    speaker: 'Педагог, психолог, медицинский или социальный специалист',
    audience: '8-11 классы',
    description:
      'Разговор о профессиях, где важны ответственность, коммуникация, эмпатия и готовность работать с людьми в разных ситуациях.',
    relatedProfessionIds: ['teacher', 'psychologist', 'medical-worker', 'social-worker'],
    materials: ['Карточки профессий помощи', 'Вопросы для обсуждения', 'Памятка по профильным предметам'],
    expectedResult: 'Школьники сопоставляют интерес к помощи людям с реальными требованиями профессий и обучения.',
  },
  {
    id: 'local-economy-practice',
    title: 'Практические профессии и местная экономика',
    status: 'planned',
    plannedDate: 'ноябрь 2026',
    format: 'Смешанный формат',
    speaker: 'Представитель инженерной, аграрной, предпринимательской или ветеринарной сферы',
    audience: '8-11 классы',
    description:
      'Встреча о профессиях, которые можно связать с развитием территории: техника, сельское хозяйство, бизнес, животные и практические проекты.',
    relatedProfessionIds: ['engineer', 'agronomist', 'entrepreneur', 'veterinarian'],
    materials: ['Карта практических маршрутов', 'Примеры локальных проектов', 'Форма сбора вопросов от школьников'],
    expectedResult: 'Участники видят, как профессиональный выбор может быть связан с реальными задачами школы и территории.',
  },
];
