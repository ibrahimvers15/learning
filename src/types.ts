export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Chapter {
  title: string;
  lesson: string;
  image?: string; // e.g. 'images/math-1.png'
  quiz: QuizQuestion[];
}

export interface SubjectData {
  name: string;
  chapters: Chapter[];
}

export type SubjectKey = 'math' | 'english' | 'science' | 'generalknowledge' | 'computer';

export interface GradeData {
  [subject: string]: SubjectData;
}

export interface CourseData {
  [grade: string]: GradeData;
}

// This is for the UI constants, separate from the course data structure
export interface SubjectUI {
    name: string;
    color: string;
}