import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, GraduationCap, RotateCcw, Search } from 'lucide-react';
import { professions } from '../data/professions';
import { educationRoutes } from '../data/routes';
import type { EducationLevel, EducationRoute } from '../data/types';

const DEFAULT_VISIBLE_ROUTES = 6;

const routeLevelLabels: Record<EducationLevel, string> = {
  'after-9': 'После 9 класса',
  'after-11': 'После 11 класса',
  spo: 'СПО',
  university: 'Вуз',
  course: 'Курсы',
  practice: 'Практика',
};

const includesText = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

function getRouteSearchText(route: EducationRoute) {
  const relatedProfessionTitles = professions
    .filter((profession) => route.relatedProfessionIds.includes(profession.id))
    .map((profession) => profession.title);

  return [
    route.title,
    route.description,
    route.duration,
    routeLevelLabels[route.level],
    ...route.steps,
    ...route.suitableFor,
    ...relatedProfessionTitles,
  ].join(' ');
}

export function RouteCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | 'all'>('all');
  const [selectedProfessionId, setSelectedProfessionId] = useState('all');
  const [showAllRoutes, setShowAllRoutes] = useState(false);

  const filteredRoutes = useMemo(
    () =>
      educationRoutes.filter((route) => {
        const matchesSearch = searchQuery.trim() ? includesText(getRouteSearchText(route), searchQuery.trim()) : true;
        const matchesLevel = selectedLevel === 'all' || route.level === selectedLevel;
        const matchesProfession =
          selectedProfessionId === 'all' || route.relatedProfessionIds.includes(selectedProfessionId);

        return matchesSearch && matchesLevel && matchesProfession;
      }),
    [searchQuery, selectedLevel, selectedProfessionId],
  );

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedLevel !== 'all' || selectedProfessionId !== 'all';
  const visibleRoutes =
    hasActiveFilters || showAllRoutes ? filteredRoutes : filteredRoutes.slice(0, DEFAULT_VISIBLE_ROUTES);
  const hiddenRouteCount = filteredRoutes.length - visibleRoutes.length;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLevel('all');
    setSelectedProfessionId('all');
    setShowAllRoutes(false);
  };

  return (
    <section id="routes" className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-mint">Маршруты обучения</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Траектории после 9 и 11 класса
          </h2>
        </div>
        <div className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-steel shadow-sm">
          Найдено: {filteredRoutes.length} из {educationRoutes.length}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-ink/10 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr_1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Поиск маршрута</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel" size={18} />
            <input
              className="h-12 w-full rounded-md border border-ink/10 bg-paper pl-10 pr-3 text-sm font-medium text-ink outline-none transition placeholder:text-steel/70 focus:border-mint focus:ring-2 focus:ring-mint/20"
              placeholder="Маршрут, профессия, экзамен"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowAllRoutes(false);
              }}
            />
          </label>

          <label className="block">
            <span className="sr-only">Уровень обучения</span>
            <select
              className="h-12 w-full rounded-md border border-ink/10 bg-paper px-3 text-sm font-semibold text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/20"
              value={selectedLevel}
              onChange={(event) => {
                setSelectedLevel(event.target.value as EducationLevel | 'all');
                setShowAllRoutes(false);
              }}
            >
              <option value="all">Все уровни</option>
              {Object.entries(routeLevelLabels).map(([level, label]) => (
                <option key={level} value={level}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Профессия</span>
            <select
              className="h-12 w-full rounded-md border border-ink/10 bg-paper px-3 text-sm font-semibold text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/20"
              value={selectedProfessionId}
              onChange={(event) => {
                setSelectedProfessionId(event.target.value);
                setShowAllRoutes(false);
              }}
            >
              <option value="all">Все профессии</option>
              {professions.map((profession) => (
                <option key={profession.id} value={profession.id}>
                  {profession.title}
                </option>
              ))}
            </select>
          </label>

          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-ink/10 bg-paper px-4 text-sm font-semibold text-ink transition hover:border-coral hover:text-coral disabled:cursor-not-allowed disabled:opacity-45"
            type="button"
            disabled={!hasActiveFilters}
            onClick={resetFilters}
          >
            <RotateCcw size={17} aria-hidden="true" />
            Сброс
          </button>
        </div>
      </div>

      {filteredRoutes.length > 0 ? (
        <>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {visibleRoutes.map((route) => {
              const relatedProfessions = professions.filter((profession) =>
                route.relatedProfessionIds.includes(profession.id),
              );

              return (
                <article key={route.id} className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <span className="rounded-md bg-mint/10 px-3 py-2 text-xs font-bold text-mint">
                        {routeLevelLabels[route.level]}
                      </span>
                      <h3 className="mt-4 text-2xl font-bold">{route.title}</h3>
                    </div>
                    <span className="rounded-md bg-coral/10 px-3 py-2 text-sm font-bold text-coral">
                      {route.duration}
                    </span>
                  </div>

                  <p className="text-sm leading-6 text-steel">{route.description}</p>

                  <div className="mt-5 grid gap-5 border-t border-ink/10 pt-5 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-steel">Шаги</p>
                      <ul className="mt-3 grid gap-2">
                        {route.steps.slice(0, 3).map((step) => (
                          <li key={step} className="flex gap-2 text-sm leading-6 text-ink">
                            <CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={17} aria-hidden="true" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-steel">Кому подходит</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {route.suitableFor.map((item) => (
                          <span key={item} className="rounded-md bg-paper px-2.5 py-1.5 text-xs font-semibold text-ink">
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {relatedProfessions.length > 0 && (
                    <div className="mt-5 rounded-md bg-paper p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                        <BookOpen className="text-mint" size={18} aria-hidden="true" />
                        Подходящие профессии
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {relatedProfessions.map((profession) => (
                          <span
                            key={profession.id}
                            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-semibold text-ink"
                          >
                            <GraduationCap className="text-coral" size={15} aria-hidden="true" />
                            {profession.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {!hasActiveFilters && hiddenRouteCount > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-mint"
                type="button"
                onClick={() => setShowAllRoutes(true)}
              >
                Показать все маршруты
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 rounded-lg border border-ink/10 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-bold">Маршруты не найдены</h3>
          <p className="mt-2 text-sm leading-6 text-steel">
            Попробуйте изменить запрос, уровень обучения или выбранную профессию.
          </p>
        </div>
      )}
    </section>
  );
}
