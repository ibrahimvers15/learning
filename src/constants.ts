import React from 'react';
import type { SubjectUI } from './types';
import { MathIcon, EnglishIcon, ComputerIcon, ScienceIcon, GeneralKnowledgeIcon } from './components/Icons';

export const GRADES = [1, 2];

export const SUBJECTS: Record<string, SubjectUI> = {
  math: {
    name: 'Math',
    color: 'bg-blue-500',
  },
  english: {
    name: 'English',
    color: 'bg-red-500',
  },
  computer: {
    name: 'Computer',
    color: 'bg-gray-700',
  },
  science: {
    name: 'Science',
    color: 'bg-green-500',
  },
  generalknowledge: {
    name: 'General Knowledge',
    color: 'bg-yellow-500',
  }
};

export const ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    math: MathIcon,
    english: EnglishIcon,
    computer: ComputerIcon,
    science: ScienceIcon,
    generalknowledge: GeneralKnowledgeIcon,
}