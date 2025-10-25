
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { Subject, SubjectKey, QuizQuestion } from './types';
import { GRADES, SUBJECTS, ICONS } from './constants';
import { generateLessonContent, generateQuiz } from './services/geminiService';

// --- Reusable UI Components ---

const Header: React.FC = () => (
    <header className="bg-white shadow-md w-full p-4">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-black text-blue-600">Kid's Learning Hub</h1>
            <div className="text-right text-sm text-gray-600">
                <p className="font-bold">Muhammad Ibrahim</p>
                <p>ibrahimvers15@gmail.com</p>
            </div>
        </div>
    </header>
);

const Footer: React.FC = () => (
    <footer className="w-full p-4 bg-gray-800 text-white text-center mt-auto">
        <p>&copy; 2024 Built for Muhammad Ibrahim</p>
    </footer>
);

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; disabled?: boolean }> = ({ onClick, children, className, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 font-bold text-white rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
        {children}
    </button>
);

// --- Screen Components ---

interface HomeScreenProps {
    onSubjectSelect: (grade: number, subject: SubjectKey) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSubjectSelect }) => {
    const [selectedGrade, setSelectedGrade] = useState<number>(1);

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Young Learner!</h2>
            <p className="text-lg text-gray-600 mb-6">First, select your grade to start your adventure.</p>
            
            <div className="flex justify-center space-x-2 md:space-x-4 mb-8">
                {GRADES.map(grade => (
                    <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-full text-xl md:text-2xl font-bold transition-all duration-300 transform hover:scale-110 ${selectedGrade === grade ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-white text-blue-600 shadow-md'}`}
                    >
                        {grade}
                    </button>
                ))}
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-6">Now, pick a subject!</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.keys(SUBJECTS).map(key => {
                    const subject = SUBJECTS[key];
                    const Icon = ICONS[key];
                    return (
                        <div
                            key={key}
                            onClick={() => onSubjectSelect(selectedGrade, key as SubjectKey)}
                            className={`p-6 rounded-xl shadow-lg text-white cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${subject.color}`}
                        >
                            <Icon className="h-16 w-16 mx-auto mb-4" />
                            <h4 className="text-2xl font-bold">{subject.name}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


interface SubjectScreenProps {
    grade: number;
    subject: Subject;
    onChapterSelect: (chapter: string) => void;
    onBack: () => void;
}

const SubjectScreen: React.FC<SubjectScreenProps> = ({ grade, subject, onChapterSelect, onBack }) => {
    return (
        <div>
            <Button onClick={onBack} className="bg-gray-500 mb-6">&larr; Back to Subjects</Button>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-gray-800">{subject.name}</h2>
                <p className="text-xl text-gray-600">Grade {grade} - Choose a chapter</p>
            </div>
            <div className="space-y-4">
                {subject.chapters.map((chapter, index) => (
                    <div
                        key={index}
                        onClick={() => onChapterSelect(chapter)}
                        className="bg-white p-5 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:bg-blue-100 flex justify-between items-center"
                    >
                        <span className="text-lg font-bold text-gray-700">{chapter}</span>
                        <span className="text-2xl font-bold text-blue-500">&rarr;</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


interface LessonScreenProps {
    grade: number;
    subject: Subject;
    chapter: string;
    onBack: () => void;
}

const LessonScreen: React.FC<LessonScreenProps> = ({ grade, subject, chapter, onBack }) => {
    const [view, setView] = useState<'lesson' | 'quiz'>('lesson');
    const [lesson, setLesson] = useState<string>('');
    const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
    const [loading, setLoading] = useState<'lesson' | 'quiz' | null>(null);

    const fetchLesson = useCallback(async () => {
        setLoading('lesson');
        const content = await generateLessonContent(subject.name, chapter, grade);
        setLesson(content);
        setLoading(null);
    }, [subject, chapter, grade]);

    const fetchQuiz = useCallback(async () => {
        setLoading('quiz');
        const questions = await generateQuiz(subject.name, chapter, grade);
        setQuiz(questions);
        setLoading(null);
    }, [subject, chapter, grade]);

    useEffect(() => {
        fetchLesson();
        fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chapter, subject, grade]);

    return (
        <div>
            <Button onClick={onBack} className="bg-gray-500 mb-6">&larr; Back to Chapters</Button>
            <div className="text-center mb-6">
                <h2 className="text-4xl font-black text-gray-800">{chapter}</h2>
                <p className="text-xl text-gray-600">{subject.name} - Grade {grade}</p>
            </div>

            <div className="flex justify-center mb-6 bg-gray-200 rounded-full p-1 w-full max-w-sm mx-auto">
                <button
                    onClick={() => setView('lesson')}
                    className={`w-1/2 py-2 rounded-full font-bold transition-colors ${view === 'lesson' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}
                >
                    Learn
                </button>
                <button
                    onClick={() => setView('quiz')}
                    className={`w-1/2 py-2 rounded-full font-bold transition-colors ${view === 'quiz' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}
                >
                    Quiz
                </button>
            </div>
            
            <Card className="min-h-[300px]">
                {view === 'lesson' && (
                    loading === 'lesson' ? <LoadingSpinner /> : <p className="text-gray-700 text-lg whitespace-pre-wrap leading-relaxed">{lesson}</p>
                )}
                {view === 'quiz' && (
                    loading === 'quiz' ? <LoadingSpinner /> : <QuizComponent questions={quiz} />
                )}
            </Card>
        </div>
    );
};


interface QuizComponentProps {
  questions: QuizQuestion[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (questions.length === 0) {
    return <p className="text-center text-gray-600">Quiz is not available for this chapter yet. Try again later!</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= questions.length;

  const handleAnswerSelect = (option: string) => {
    if (showResult) return;
    setSelectedAnswer(option);
    setShowResult(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(i => i + 1);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (isQuizFinished) {
    return (
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4">Quiz Complete!</h3>
        <p className="text-xl mb-6">Your score: <span className="font-bold text-blue-600">{score}</span> / {questions.length}</p>
        <Button onClick={handleRestart} className="bg-blue-600">Try Again</Button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-lg font-semibold text-gray-800 mb-4">({currentQuestionIndex + 1}/{questions.length}) {currentQuestion.question}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map(option => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedAnswer;
          let buttonClass = 'bg-white hover:bg-blue-100 text-blue-600 border-2 border-blue-200';
          if (showResult) {
            if (isCorrect) {
              buttonClass = 'bg-green-500 text-white border-green-500';
            } else if (isSelected) {
              buttonClass = 'bg-red-500 text-white border-red-500';
            } else {
              buttonClass = 'bg-gray-200 text-gray-500 border-gray-200';
            }
          }
          return (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-4 rounded-lg font-semibold text-left transition-colors duration-300 ${buttonClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className="mt-6 text-center">
          <Button onClick={handleNext} className="bg-blue-600">Next Question &rarr;</Button>
        </div>
      )}
    </div>
  );
}

// --- Main App Component ---

const App: React.FC = () => {
    const [view, setView] = useState<'home' | 'subject' | 'lesson'>('home');
    const [grade, setGrade] = useState<number>(1);
    const [subjectKey, setSubjectKey] = useState<SubjectKey | null>(null);
    const [chapter, setChapter] = useState<string | null>(null);

    const subject = useMemo((): Subject | null => {
        if (!subjectKey) return null;
        return { ...SUBJECTS[subjectKey], key: subjectKey };
    }, [subjectKey]);

    const handleSubjectSelect = (selectedGrade: number, selectedSubjectKey: SubjectKey) => {
        setGrade(selectedGrade);
        setSubjectKey(selectedSubjectKey);
        setView('subject');
    };

    const handleChapterSelect = (selectedChapter: string) => {
        setChapter(selectedChapter);
        setView('lesson');
    };

    const resetToHome = () => setView('home');
    const backToSubject = () => setView('subject');

    const renderContent = () => {
        switch (view) {
            case 'subject':
                if (subject) {
                    return <SubjectScreen grade={grade} subject={subject} onChapterSelect={handleChapterSelect} onBack={resetToHome} />;
                }
                return null;
            case 'lesson':
                if (subject && chapter) {
                    return <LessonScreen grade={grade} subject={subject} chapter={chapter} onBack={backToSubject} />;
                }
                return null;
            case 'home':
            default:
                return <HomeScreen onSubjectSelect={handleSubjectSelect} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-8">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
}

export default App;
