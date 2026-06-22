import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { professions } from '../data/professions';
import { educationRoutes } from '../data/routes';
import type { EducationLevel, Profession } from '../data/types';

type QuizOption = {
  id: string;
  title: string;
  text: string;
  fields?: string[];
  interests?: string[];
  subjects?: string[];
  skills?: string[];
  levels?: EducationLevel[];
};

type QuizQuestion = {
  id: string;
  title: string;
  options: QuizOption[];
};

type ScoredProfession = {
  profession: Profession;
  score: number;
  reasons: string[];
};

const routeLevelLabels: Record<EducationLevel, string> = {
  'after-9': 'после 9 класса',
  'after-11': 'после 11 класса',
  spo: 'СПО',
  university: 'вуз',
  course: 'курсы',
  practice: 'практика',
};

const questions: QuizQuestion[] = [
  {
    id: 'focus',
    title: 'С чем тебе интереснее работать?',
    options: [
      {
        id: 'people',
        title: 'С людьми',
        text: 'Объяснять, помогать, консультировать, поддерживать',
        fields: ['Образование', 'Социальная работа', 'Психология и помощь людям', 'Здравоохранение'],
        interests: ['общение', 'помощь людям', 'психология', 'здоровье'],
      },
      {
        id: 'technology',
        title: 'С технологиями',
        text: 'Программировать, собирать системы, автоматизировать задачи',
        fields: ['Информационные технологии', 'Техника и производство'],
        interests: ['технологии', 'программирование', 'автоматизация', 'техника'],
      },
      {
        id: 'ideas',
        title: 'С идеями и визуалом',
        text: 'Придумывать, оформлять, проектировать интерфейсы и коммуникации',
        fields: ['Дизайн и цифровые продукты', 'Коммуникации и медиа'],
        interests: ['дизайн', 'реклама', 'творческие идеи', 'социальные сети'],
      },
      {
        id: 'nature',
        title: 'С природой и животными',
        text: 'Изучать живые системы, растения, животных, экологию',
        fields: ['Сельское хозяйство', 'Здравоохранение и животные'],
        interests: ['природа', 'растения', 'животные', 'биология'],
      },
    ],
  },
  {
    id: 'subjects',
    title: 'Какие школьные предметы ближе?',
    options: [
      {
        id: 'it-math',
        title: 'Информатика и математика',
        text: 'Логика, задачи, алгоритмы, таблицы',
        subjects: ['Информатика', 'Математика'],
        interests: ['логика', 'алгоритмы', 'таблицы'],
      },
      {
        id: 'bio-chem',
        title: 'Биология и химия',
        text: 'Организмы, здоровье, вещества, исследования',
        subjects: ['Биология', 'Химия'],
        interests: ['биология', 'здоровье', 'исследования', 'медицина'],
      },
      {
        id: 'social-human',
        title: 'Обществознание и история',
        text: 'Люди, общество, право, социальные процессы',
        subjects: ['Обществознание', 'История', 'Русский язык'],
        interests: ['право', 'общество', 'социальные проекты', 'общение'],
      },
      {
        id: 'creative-language',
        title: 'Русский язык, литература и творчество',
        text: 'Тексты, смыслы, оформление, коммуникация',
        subjects: ['Русский язык', 'Литература', 'ИЗО'],
        interests: ['дизайн', 'рисование', 'реклама', 'творческие идеи'],
      },
    ],
  },
  {
    id: 'work-style',
    title: 'Какой формат работы кажется комфортнее?',
    options: [
      {
        id: 'analyze',
        title: 'Анализировать',
        text: 'Искать закономерности, сравнивать варианты, делать выводы',
        fields: ['Данные и аналитика', 'Право и общество'],
        interests: ['исследования', 'статистика', 'поиск закономерностей', 'право'],
        skills: ['анализ документов', 'аналитика', 'SQL'],
      },
      {
        id: 'create',
        title: 'Создавать продукт',
        text: 'Делать сайт, интерфейс, проект, техническое решение',
        fields: ['Информационные технологии', 'Дизайн и цифровые продукты', 'Техника и производство'],
        interests: ['создание сайтов', 'конструирование', 'дизайн'],
        skills: ['React', 'Figma', 'адаптивная верстка', 'техническое мышление'],
      },
      {
        id: 'help',
        title: 'Помогать',
        text: 'Поддерживать человека, объяснять, сопровождать',
        fields: ['Образование', 'Социальная работа', 'Психология и помощь людям', 'Здравоохранение'],
        interests: ['помощь людям', 'общение', 'психология'],
        skills: ['активное слушание', 'коммуникация', 'публичная речь'],
      },
      {
        id: 'organize',
        title: 'Организовывать',
        text: 'Планировать, договариваться, запускать идеи и процессы',
        fields: ['Бизнес и управление', 'Коммуникации и медиа'],
        interests: ['организация процессов', 'идеи', 'самостоятельность'],
        skills: ['планирование', 'переговоры', 'презентация идей'],
      },
    ],
  },
  {
    id: 'education-path',
    title: 'Какой путь обучения сейчас ближе?',
    options: [
      {
        id: 'after-9',
        title: 'После 9 класса',
        text: 'Хочу рассматривать колледж и больше практики',
        levels: ['after-9', 'spo'],
      },
      {
        id: 'after-11',
        title: 'После 11 класса',
        text: 'Готовиться к ЕГЭ и поступлению в вуз',
        levels: ['after-11', 'university'],
      },
      {
        id: 'try-fast',
        title: 'Сначала попробовать',
        text: 'Курсы, проект, практика, чтобы проверить интерес',
        levels: ['course', 'practice'],
      },
    ],
  },
  {
    id: 'result',
    title: 'Какой результат работы хочется видеть?',
    options: [
      {
        id: 'digital',
        title: 'Рабочий цифровой сервис',
        text: 'Сайт, приложение, интерфейс, автоматизация',
        fields: ['Информационные технологии', 'Дизайн и цифровые продукты'],
        interests: ['технологии', 'создание сайтов', 'дизайн'],
      },
      {
        id: 'person-helped',
        title: 'Человеку стало понятнее или легче',
        text: 'Помощь, обучение, консультация, поддержка',
        fields: ['Образование', 'Психология и помощь людям', 'Социальная работа'],
        interests: ['помощь людям', 'объяснение сложного', 'общение'],
      },
      {
        id: 'decision',
        title: 'Появилось решение на основе фактов',
        text: 'Отчет, вывод, план, правовая позиция',
        fields: ['Данные и аналитика', 'Право и общество', 'Бизнес и управление'],
        interests: ['исследования', 'право', 'аналитика'],
      },
      {
        id: 'health-nature',
        title: 'Улучшилось здоровье или состояние живой системы',
        text: 'Люди, животные, растения, среда',
        fields: ['Здравоохранение', 'Здравоохранение и животные', 'Сельское хозяйство'],
        interests: ['здоровье', 'животные', 'растения', 'экология'],
      },
    ],
  },
];

const unique = <T,>(values: T[]) => Array.from(new Set(values));

const getSelectedOptions = (answers: Record<string, string>) =>
  questions.flatMap((question) => question.options.filter((option) => option.id === answers[question.id]));

const getRelatedRouteLevels = (profession: Profession) =>
  educationRoutes
    .filter((route) => profession.relatedRouteIds.includes(route.id))
    .map((route) => route.level);

function scoreProfession(profession: Profession, selectedOptions: QuizOption[]): ScoredProfession {
  const selectedFields = unique(selectedOptions.flatMap((option) => option.fields ?? []));
  const selectedInterests = unique(selectedOptions.flatMap((option) => option.interests ?? []));
  const selectedSubjects = unique(selectedOptions.flatMap((option) => option.subjects ?? []));
  const selectedSkills = unique(selectedOptions.flatMap((option) => option.skills ?? []));
  const selectedLevels = unique(selectedOptions.flatMap((option) => option.levels ?? []));

  const matchedInterests = selectedInterests.filter((interest) => profession.interests.includes(interest));
  const matchedSubjects = selectedSubjects.filter((subject) => profession.schoolSubjects.includes(subject));
  const matchedSkills = selectedSkills.filter((skill) => profession.skills.includes(skill));
  const matchedRouteLevels = selectedLevels.filter((level) => getRelatedRouteLevels(profession).includes(level));
  const fieldMatched = selectedFields.includes(profession.field);

  const score =
    (fieldMatched ? 5 : 0) +
    matchedInterests.length * 3 +
    matchedSubjects.length * 2 +
    matchedSkills.length +
    (matchedRouteLevels.length > 0 ? 2 : 0);

  const reasons = [
    fieldMatched ? `подходит сфера «${profession.field}»` : '',
    matchedInterests.length > 0 ? `интересы: ${matchedInterests.slice(0, 2).join(', ')}` : '',
    matchedSubjects.length > 0 ? `предметы: ${matchedSubjects.slice(0, 2).join(', ')}` : '',
    matchedRouteLevels.length > 0
      ? `есть маршрут: ${routeLevelLabels[matchedRouteLevels[0] as EducationLevel]}`
      : '',
  ].filter(Boolean);

  return { profession, score, reasons };
}

export function CareerQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[questionIndex];
  const currentAnswer = answers[currentQuestion.id];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const results = useMemo(() => {
    const selectedOptions = getSelectedOptions(answers);

    return professions
      .map((profession) => scoreProfession(profession, selectedOptions))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [answers]);

  const selectOption = (optionId: string) => {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: optionId }));
    setShowResults(false);
  };

  const resetQuiz = () => {
    setAnswers({});
    setQuestionIndex(0);
    setShowResults(false);
  };

  return (
    <section id="quiz" className="border-y border-ink/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-coral">Мини-тест</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Подобрать профессии по интересам
            </h2>
            <p className="mt-4 text-base leading-7 text-steel">
              Ответьте на несколько вопросов. Навигатор сопоставит ответы с каталогом профессий и
              покажет направления, с которых стоит начать изучение.
            </p>

            <div className="mt-6 rounded-lg bg-paper p-5">
              <div className="flex items-center justify-between text-sm font-semibold text-steel">
                <span>
                  Ответов: {answeredCount} из {questions.length}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-mint transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-sm sm:p-6">
            {!showResults ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-mint">
                      Вопрос {questionIndex + 1} из {questions.length}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">{currentQuestion.title}</h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-coral text-white">
                    <Sparkles size={21} aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {currentQuestion.options.map((option) => {
                    const isSelected = currentAnswer === option.id;

                    return (
                      <button
                        key={option.id}
                        className={`min-h-28 rounded-md border p-4 text-left transition ${
                          isSelected
                            ? 'border-mint bg-white shadow-sm ring-2 ring-mint/20'
                            : 'border-ink/10 bg-white hover:border-mint'
                        }`}
                        type="button"
                        onClick={() => selectOption(option.id)}
                      >
                        <span className="flex items-start gap-3">
                          <CheckCircle2
                            className={isSelected ? 'mt-0.5 shrink-0 text-mint' : 'mt-0.5 shrink-0 text-steel/45'}
                            size={19}
                            aria-hidden="true"
                          />
                          <span>
                            <span className="block text-base font-bold text-ink">{option.title}</span>
                            <span className="mt-1 block text-sm leading-6 text-steel">{option.text}</span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-ink/10 bg-white px-4 text-sm font-semibold text-ink transition hover:border-coral hover:text-coral disabled:cursor-not-allowed disabled:opacity-45"
                    type="button"
                    disabled={questionIndex === 0}
                    onClick={() => setQuestionIndex((index) => Math.max(index - 1, 0))}
                  >
                    <ArrowLeft size={17} aria-hidden="true" />
                    Назад
                  </button>

                  {questionIndex < questions.length - 1 ? (
                    <button
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-mint disabled:cursor-not-allowed disabled:opacity-45"
                      type="button"
                      disabled={!currentAnswer}
                      onClick={() => setQuestionIndex((index) => Math.min(index + 1, questions.length - 1))}
                    >
                      Далее
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-mint disabled:cursor-not-allowed disabled:opacity-45"
                      type="button"
                      disabled={answeredCount < questions.length}
                      onClick={() => setShowResults(true)}
                    >
                      Показать результат
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-mint">Результат подбора</p>
                    <h3 className="mt-2 text-2xl font-bold">Профессии, которые стоит изучить</h3>
                  </div>
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-ink/10 bg-white px-3 text-sm font-semibold text-ink transition hover:border-coral hover:text-coral"
                    type="button"
                    onClick={resetQuiz}
                  >
                    <RotateCcw size={17} aria-hidden="true" />
                    Заново
                  </button>
                </div>

                <div className="mt-6 grid gap-4">
                  {results.map((result, index) => (
                    <article key={result.profession.id} className="rounded-md bg-white p-4">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          <p className="text-sm font-bold text-coral">#{index + 1}</p>
                          <h4 className="mt-1 text-xl font-bold">{result.profession.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-steel">{result.profession.shortDescription}</p>
                        </div>
                        <span className="rounded-md bg-mint/10 px-3 py-2 text-sm font-bold text-mint">
                          {result.score} баллов
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {(result.reasons.length > 0 ? result.reasons : ['есть пересечение с ответами']).map(
                          (reason) => (
                            <span key={reason} className="rounded-md bg-paper px-2.5 py-1.5 text-xs font-semibold text-ink">
                              {reason}
                            </span>
                          ),
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#professions"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-mint"
                  >
                    Открыть каталог профессий
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                  <a
                    href="#routes"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/10 bg-white px-4 text-sm font-semibold text-ink transition hover:border-mint hover:text-mint"
                  >
                    Смотреть маршруты
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
