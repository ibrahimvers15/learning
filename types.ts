
export type SubjectKey = 'math' | 'english' | 'computer' | 'science';

export interface Subject {
  key: SubjectKey;
  name: string;
  color: string;
  chapters: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}
