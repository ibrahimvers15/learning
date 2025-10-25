// Fix for "Cannot find namespace 'React'" by importing React, which is needed for React types.
import React from 'react';
import type { Subject } from './types';
import { MathIcon, EnglishIcon, ComputerIcon, ScienceIcon } from './components/Icons';

export const GRADES = [1, 2, 3, 4, 5];

export const SUBJECTS: Record<string, Omit<Subject, 'key'>> = {
  math: {
    name: 'Math',
    color: 'bg-blue-500',
    chapters: ['Counting Fun', 'Simple Addition', 'Shapes Around Us', 'Basic Subtraction', 'Telling Time'],
  },
  english: {
    name: 'English',
    color: 'bg-red-500',
    chapters: ['The Alphabet', 'Simple Words', 'Reading Short Stories', 'Basic Grammar', 'Making Sentences'],
  },
  computer: {
    name: 'Computer',
    color: 'bg-gray-700',
    chapters: ['Parts of a Computer', 'Using a Mouse', 'What is the Internet?', 'Typing Basics', 'Fun with Paint'],
  },
  science: {
    name: 'General Science',
    color: 'bg-green-500',
    chapters: ['Living Things', 'Our Five Senses', 'Plants and Animals', 'The Solar System', 'Weather and Seasons'],
  },
};

export const ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    math: MathIcon,
    english: EnglishIcon,
    computer: ComputerIcon,
    science: ScienceIcon,
}
