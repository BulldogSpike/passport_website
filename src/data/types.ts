export type EducationLevel = 'after-9' | 'after-11' | 'spo' | 'university' | 'course' | 'practice';

export type Profession = {
  id: string;
  title: string;
  field: string;
  shortDescription: string;
  dailyTasks: string[];
  schoolSubjects: string[];
  interests: string[];
  skills: string[];
  personalQualities: string[];
  firstSteps: string[];
  relatedRouteIds: string[];
};

export type EducationRoute = {
  id: string;
  title: string;
  level: EducationLevel;
  duration: string;
  description: string;
  steps: string[];
  suitableFor: string[];
  relatedProfessionIds: string[];
};

export type MeetingStatus = 'planned' | 'ready' | 'done';

export type CareerMeeting = {
  id: string;
  title: string;
  status: MeetingStatus;
  plannedDate: string;
  format: 'Очно' | 'Онлайн' | 'Смешанный формат';
  speaker: string;
  audience: string;
  description: string;
  relatedProfessionIds: string[];
  materials: string[];
  expectedResult: string;
};
