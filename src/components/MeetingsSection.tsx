import { CalendarDays, CheckCircle2, ClipboardList, MapPin, UsersRound } from 'lucide-react';
import { meetings } from '../data/meetings';
import { professions } from '../data/professions';
import type { MeetingStatus } from '../data/types';

const statusLabels: Record<MeetingStatus, string> = {
  planned: 'Запланирована',
  ready: 'Материалы готовы',
  done: 'Проведена',
};

const statusClasses: Record<MeetingStatus, string> = {
  planned: 'bg-amber/15 text-amber',
  ready: 'bg-mint/10 text-mint',
  done: 'bg-coral/10 text-coral',
};

export function MeetingsSection() {
  return (
    <section id="meetings" className="border-y border-ink/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-coral">Профориентационные встречи</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Встречи с представителями профессиональных сфер
            </h2>
          </div>
          <div className="rounded-md bg-paper px-4 py-3 text-sm font-semibold text-steel">
            Запланировано: {meetings.length}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {meetings.map((meeting) => {
            const relatedProfessions = professions.filter((profession) =>
              meeting.relatedProfessionIds.includes(profession.id),
            );

            return (
              <article key={meeting.id} className="flex flex-col rounded-lg border border-ink/10 bg-paper p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className={`rounded-md px-3 py-2 text-xs font-bold ${statusClasses[meeting.status]}`}>
                    {statusLabels[meeting.status]}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-mint text-white">
                    <CalendarDays size={21} aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold">{meeting.title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel">{meeting.description}</p>

                <div className="mt-5 grid gap-3 rounded-md bg-white p-4 text-sm">
                  <div className="flex gap-2 leading-6 text-steel">
                    <CalendarDays className="mt-0.5 shrink-0 text-coral" size={17} aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-ink">Срок:</span> {meeting.plannedDate}
                    </span>
                  </div>
                  <div className="flex gap-2 leading-6 text-steel">
                    <MapPin className="mt-0.5 shrink-0 text-coral" size={17} aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-ink">Формат:</span> {meeting.format}
                    </span>
                  </div>
                  <div className="flex gap-2 leading-6 text-steel">
                    <UsersRound className="mt-0.5 shrink-0 text-coral" size={17} aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-ink">Аудитория:</span> {meeting.audience}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-steel">Спикер</p>
                  <p className="mt-2 text-sm leading-6 text-ink">{meeting.speaker}</p>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-steel">Материалы</p>
                  <ul className="mt-3 grid gap-2">
                    {meeting.materials.map((material) => (
                      <li key={material} className="flex gap-2 text-sm leading-6 text-ink">
                        <ClipboardList className="mt-0.5 shrink-0 text-mint" size={17} aria-hidden="true" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-steel">Связанные профессии</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {relatedProfessions.map((profession) => (
                      <span key={profession.id} className="rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-ink">
                        {profession.title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-ink/10 pt-5">
                  <div className="flex gap-2 text-sm leading-6 text-steel">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={17} aria-hidden="true" />
                    {meeting.expectedResult}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
