import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Map,
  School,
  Search,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { educationRoutes } from './data/routes';
import { professions } from './data/professions';
import { meetings } from './data/meetings';
import { ProfessionCatalog } from './components/ProfessionCatalog';
import { RouteCatalog } from './components/RouteCatalog';
import { CareerQuiz } from './components/CareerQuiz';
import { MeetingsSection } from './components/MeetingsSection';

const projectStats = [
  { label: 'описаний профессий', value: `${professions.length}+` },
  { label: 'маршрутов обучения', value: `${educationRoutes.length}+` },
  { label: 'профориентационные встречи', value: `${meetings.length}+` },
  { label: 'участников проекта', value: '20+' },
];

const sections = [
  {
    icon: Search,
    title: 'Каталог профессий',
    text: 'Понятные карточки профессий: задачи специалиста, нужные навыки, школьные предметы и первые шаги.',
  },
  {
    icon: Map,
    title: 'Маршруты обучения',
    text: 'Траектории после 9 и 11 класса: СПО, вуз, курсы, портфолио и практический опыт.',
  },
  {
    icon: CalendarDays,
    title: 'Встречи со специалистами',
    text: 'Материалы и итоги профориентационных встреч с представителями разных профессиональных сфер.',
  },
];

const timeline = [
  { date: 'до 30.09.2026', title: 'Анкетирование и выбор направлений' },
  { date: 'до 30.11.2026', title: 'Разработка сайта и проведение встреч' },
  { date: 'до 20.12.2026', title: 'Обратная связь и передача материалов школе' },
];

const team = [
  'Соснина Е.Д.',
  'Будайчиева А.М.',
  'Ерин Д.Д.',
  'Люкшин А.А.',
  'Сахно С.Д.',
  'Иванов А.В.',
  'Джалалудинов Ч.М.',
];

function App() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-mint text-white">
              <GraduationCap size={22} aria-hidden="true" />
            </span>
            <span className="leading-tight">
              Профнавигатор
              <span className="block text-xs font-medium text-steel">МКОУ СШ № 14</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium text-steel md:flex">
            <a className="transition hover:text-ink" href="#directions">
              Разделы
            </a>
            <a className="transition hover:text-ink" href="#quiz">
              Тест
            </a>
            <a className="transition hover:text-ink" href="#professions">
              Профессии
            </a>
            <a className="transition hover:text-ink" href="#routes">
              Маршруты
            </a>
            <a className="transition hover:text-ink" href="#meetings">
              Встречи
            </a>
            <a className="transition hover:text-ink" href="#plan">
              План
            </a>
            <a className="transition hover:text-ink" href="#team">
              Команда
            </a>
          </div>
        </nav>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex w-fit items-center gap-2 rounded-md border border-mint/30 bg-white px-3 py-2 text-sm font-medium text-mint shadow-sm">
            <Sparkles size={16} aria-hidden="true" />
            Проект по дисциплине «Обучение служением»
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Цифровой профориентационный навигатор для школьников
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">
            Веб-сайт помогает обучающимся 8-11 классов МКОУ «СШ № 14» разобраться в профессиях,
            сопоставить интересы со школьными предметами и выбрать понятный образовательный маршрут.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quiz"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-mint"
            >
              Пройти мини-тест
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#professions"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-mint hover:text-mint"
            >
              Смотреть профессии
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
              <div>
                <p className="text-sm font-semibold text-steel">Навигатор</p>
                <h2 className="mt-1 text-2xl font-bold">Выбор профессии без хаоса</h2>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-coral text-white">
                <School size={24} aria-hidden="true" />
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                'Какие профессии подходят моим интересам?',
                'Какие предметы стоит подтянуть?',
                'Куда можно поступить после 9 или 11 класса?',
                'Какие навыки нужны для старта?',
              ].map((question) => (
                <div key={question} className="flex items-start gap-3 rounded-md bg-paper p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={20} aria-hidden="true" />
                  <span className="text-sm font-medium leading-6">{question}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-6 sm:px-8 lg:grid-cols-4">
          {projectStats.map((item) => (
            <div key={item.label} className="px-2 py-4">
              <div className="text-3xl font-bold text-coral">{item.value}</div>
              <div className="mt-1 text-sm font-medium text-steel">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="directions" className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-mint">Основные разделы</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Сайт строится вокруг практических вопросов школьников
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <article key={section.title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-amber/15 text-amber">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel">{section.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CareerQuiz />

      <ProfessionCatalog />

      <RouteCatalog />

      <MeetingsSection />

      <section id="plan" className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-amber">План реализации</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              От анкетирования к готовому школьному инструменту
            </h2>
            <p className="mt-5 text-base leading-7 text-white/72">
              Проект рассчитан на период с 15.03.2026 по 30.12.2026. Главная страница уже отражает
              структуру будущего сайта, а наполнение будет уточняться после анализа интересов учеников.
            </p>
          </div>

          <div className="grid gap-4">
            {timeline.map((item, index) => (
              <div key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 rounded-lg bg-white/8 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-ink font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber">{item.date}</p>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-coral">Команда и заказчик</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Команда «Импульс»</h2>
          <p className="mt-5 text-base leading-7 text-steel">
            Заказчик проекта - Муниципальное казенное общеобразовательное учреждение «Ступинская
            средняя школа № 14». Наставник от Академии - Сафронова Наталья Борисовна.
          </p>
        </div>

        <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-mint text-white">
              <UsersRound size={22} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-bold">Участники проекта</h3>
              <p className="text-sm text-steel">ВР-24, заочная форма обучения</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member} className="flex items-center gap-3 rounded-md bg-paper px-4 py-3 text-sm font-semibold">
                <BookOpen className="shrink-0 text-coral" size={18} aria-hidden="true" />
                {member}
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}

export default App;
