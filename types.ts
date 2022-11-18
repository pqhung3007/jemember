export interface LessonProps {
  lesson: LessonBaseProps;
  cards: CardProps[];
}

export interface LessonBaseProps {
  id: string;
  name: string;
  created_at: string;
}

export interface CardProps {
  id: string;
  question: string;
  answer: string;
  lesson_id: string;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
}
