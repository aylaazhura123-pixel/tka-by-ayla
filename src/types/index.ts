export type SubjectId = 'matematika' | 'indonesia' | 'ekonomi' | 'sosiologi_informatika';

export interface KeyConcept {
  term: string;
  explanation: string;
}

export interface FormulaItem {
  name: string;
  formula: string;
  note: string;
}

export interface CommonTrap {
  trap: string;
  correction: string;
}

export interface SampleQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  smartTrick: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Topic {
  id: string;
  title: string;
  subject: SubjectId;
  day: number;
  phase: 1 | 2;
  level: 'EASY' | 'MEDIUM' | 'HARD' | 'HOTS';
  estimatedMinutes: number;
  pengertian: string;
  tujuan: string;
  konsepUtama: KeyConcept[];
  penjelasanSederhana: string;
  penjelasanMendalam: string;
  kataKunci: string[];
  rumusDanSifat?: FormulaItem[];
  langkahPengerjaan: string[];
  contohNyata: string;
  contohSoal: SampleQuestion;
  kesalahanUmum: CommonTrap[];
  tipsMengingat: string;
  hubunganMateri: string;
  quickRecap: string[];
  blurtingKeyPoints: string[];
  flashcards: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  subject: SubjectId;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'HOTS';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: {
    mengapa: string;
    konsep: string;
    caraBerpikir: string;
    kesalahanUmum: string;
    trik: string;
    jawabanBenar: string;
  };
}

export interface DailyScheduleSlot {
  time: string;
  title: string;
  icon: string;
  type: 'teori' | 'blurting' | 'break' | 'latihan' | 'pembahasan' | 'review' | 'finish';
  durationMin: number;
  description: string;
}

export interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
}

export interface NotebookNote {
  id: string;
  topicId?: string;
  title: string;
  subject: SubjectId;
  content: string;
  keyPoints: string[];
  stickyNote?: string;
  stickers: string[];
  highlightColor: 'yellow' | 'pink' | 'cyan' | 'green';
  updatedAt: string;
  isBookmarked: boolean;
  isFavorite: boolean;
}

export interface ErrorBankItem {
  questionId: string;
  subject: SubjectId;
  topicId: string;
  mistakeCount: number;
  lastWrongAt: string;
  isResolved: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface UserProgress {
  name: string;
  targetMajor: string;
  currentDay: number;
  streak: number;
  lastActiveDate: string;
  xp: number;
  level: number;
  completedTopicIds: string[];
  completedBlurtingIds: string[];
  needReviewTopicIds: string[];
  solvedQuestionIds: string[];
  correctCount: number;
  wrongCount: number;
  studyTimeSeconds: number;
  dailyTasks: DailyTask[];
  achievements: Achievement[];
  errorBank: ErrorBankItem[];
  notebookNotes: NotebookNote[];
  soundSettings: {
    musicEnabled: boolean;
    sfxEnabled: boolean;
    musicVolume: number;
    sfxVolume: number;
    musicMode: 'focus' | 'battle' | 'hots' | 'victory';
  };
}
