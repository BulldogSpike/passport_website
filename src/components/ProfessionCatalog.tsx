import { useMemo, useState } from 'react';
import { BookOpen, BriefcaseBusiness, CheckCircle2, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { educationRoutes } from '../data/routes';
import { professions } from '../data/professions';
import type { Profession } from '../data/types';

const getUniqueValues = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'ru'));

const includesText = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

const capitalizeTag = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const DEFAULT_VISIBLE_PROFESSIONS = 6;

function getProfessionSearchText(profession: Profession) {
  return [
    profession.title,
    profession.field,
    profession.shortDescription,
    ...profession.schoolSubjects,
    ...profession.interests,
    ...profession.skills,
    ...profession.personalQualities,
  ].join(' ');
}

export function ProfessionCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [showAllProfessions, setShowAllProfessions] = useState(false);

  const fields = useMemo(() => getUniqueValues(professions.map((profession) => profession.field)), []);
  const subjects = useMemo(
    () => getUniqueValues(professions.flatMap((profession) => profession.schoolSubjects)),
    [],
  );
  const interests = useMemo(() => getUniqueValues(professions.flatMap((profession) => profession.interests)), []);

  const filteredProfessions = useMemo(
    () =>
      professions.filter((profession) => {
        const matchesSearch = searchQuery.trim()
          ? includesText(getProfessionSearchText(profession), searchQuery.trim())
          : true;
        const matchesField = selectedField === 'all' || profession.field === selectedField;
        const matchesSubject = selectedSubject === 'all' || profession.schoolSubjects.includes(selectedSubject);
        const matchesInterest = selectedInterest === 'all' || profession.interests.includes(selectedInterest);

        return matchesSearch && matchesField && matchesSubject && matchesInterest;
      }),
    [searchQuery, selectedField, selectedInterest, selectedSubject],
  );

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedField !== 'all' ||
    selectedSubject !== 'all' ||
    selectedInterest !== 'all';

  const visibleProfessions =
    hasActiveFilters || showAllProfessions
      ? filteredProfessions
      : filteredProfessions.slice(0, DEFAULT_VISIBLE_PROFESSIONS);
  const hiddenProfessionCount = filteredProfessions.length - visibleProfessions.length;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedField('all');
    setSelectedSubject('all');
    setSelectedInterest('all');
    setShowAllProfessions(false);
  };

  return (
    <section id="professions" className="border-y border-ink/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-coral">Каталог профессий</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Профессии с предметами, навыками и первыми шагами
            </h2>
          </div>
          <div className="rounded-md bg-paper px-4 py-3 text-sm font-semibold text-steel">
            Найдено: {filteredProfessions.length} из {professions.length}
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-ink/10 bg-paper p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
            <label className="relative block">
              <span className="sr-only">Поиск</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel" size={18} />
              <input
                className="h-12 w-full rounded-md border border-ink/10 bg-white pl-10 pr-3 text-sm font-medium text-ink outline-none transition placeholder:text-steel/70 focus:border-mint focus:ring-2 focus:ring-mint/20"
                placeholder="Профессия, навык, предмет"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setShowAllProfessions(false);
                }}
              />
            </label>

            <label className="relative block">
              <span className="sr-only">Сфера</span>
              <SlidersHorizontal
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel"
                size={18}
              />
              <select
                className="h-12 w-full appearance-none rounded-md border border-ink/10 bg-white pl-10 pr-8 text-sm font-semibold text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/20"
                value={selectedField}
                onChange={(event) => {
                  setSelectedField(event.target.value);
                  setShowAllProfessions(false);
                }}
              >
                <option value="all">Все сферы</option>
                {fields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="sr-only">Предмет</span>
              <select
                className="h-12 w-full rounded-md border border-ink/10 bg-white px-3 text-sm font-semibold text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/20"
                value={selectedSubject}
                onChange={(event) => {
                  setSelectedSubject(event.target.value);
                  setShowAllProfessions(false);
                }}
              >
                <option value="all">Все предметы</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="sr-only">Интерес</span>
              <select
                className="h-12 w-full rounded-md border border-ink/10 bg-white px-3 text-sm font-semibold text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/20"
                value={selectedInterest}
                onChange={(event) => {
                  setSelectedInterest(event.target.value);
                  setShowAllProfessions(false);
                }}
              >
                <option value="all">Все интересы</option>
                {interests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-ink/10 bg-white px-4 text-sm font-semibold text-ink transition hover:border-coral hover:text-coral disabled:cursor-not-allowed disabled:opacity-45"
              type="button"
              disabled={!hasActiveFilters}
              onClick={resetFilters}
            >
              <RotateCcw size={17} aria-hidden="true" />
              Сброс
            </button>
          </div>
        </div>

        {filteredProfessions.length > 0 ? (
          <>
            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              {visibleProfessions.map((profession) => {
                const relatedRoutes = educationRoutes.filter((route) =>
                  profession.relatedRouteIds.includes(route.id),
                );

                return (
                  <article key={profession.id} className="rounded-lg border border-ink/10 bg-paper p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-sm font-bold text-mint">{profession.field}</p>
                        <h3 className="mt-2 text-2xl font-bold">{profession.title}</h3>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-coral text-white">
                        <BriefcaseBusiness size={21} aria-hidden="true" />
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-steel">{profession.shortDescription}</p>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-steel">Что делает</p>
                        <ul className="mt-3 grid gap-2">
                          {profession.dailyTasks.slice(0, 3).map((task) => (
                            <li key={task} className="flex gap-2 text-sm leading-6 text-ink">
                              <CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={17} aria-hidden="true" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-steel">Первые шаги</p>
                        <ul className="mt-3 grid gap-2">
                          {profession.firstSteps.slice(0, 3).map((step) => (
                            <li key={step} className="flex gap-2 text-sm leading-6 text-ink">
                              <CheckCircle2 className="mt-0.5 shrink-0 text-coral" size={17} aria-hidden="true" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 border-t border-ink/10 pt-5 md:grid-cols-2">
                      <TagGroup title="Предметы" values={profession.schoolSubjects} />
                      <TagGroup title="Навыки" values={profession.skills.slice(0, 5)} />
                    </div>

                    {relatedRoutes.length > 0 && (
                      <div className="mt-5 rounded-md bg-white p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                          <BookOpen className="text-mint" size={18} aria-hidden="true" />
                          Связанные маршруты
                        </div>
                        <div className="grid gap-2">
                          {relatedRoutes.map((route) => (
                            <div key={route.id} className="text-sm leading-6 text-steel">
                              <span className="font-semibold text-ink">{route.title}</span> · {route.duration}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {!hasActiveFilters && hiddenProfessionCount > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-mint"
                  type="button"
                  onClick={() => setShowAllProfessions(true)}
                >
                  Показать все профессии
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-lg border border-ink/10 bg-paper p-8 text-center">
            <h3 className="text-xl font-bold">Ничего не найдено</h3>
            <p className="mt-2 text-sm leading-6 text-steel">
              Попробуйте изменить запрос или сбросить выбранные фильтры.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function TagGroup({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-steel">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className="rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-ink">
            {capitalizeTag(value)}
          </span>
        ))}
      </div>
    </div>
  );
}
