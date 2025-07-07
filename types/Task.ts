export interface Task {
  id: string;
  title: string;
  emoji: string;
  priority: 'high' | 'medium' | 'low';
  category: 'work' | 'health' | 'household' | 'personal' | 'creative' | 'other';
  timeBlock?: string;
  completed: boolean;
  createdAt?: Date;
  completedAt?: Date;
}

export interface DayPlan {
  id: string;
  title: string;
  emoji: string;
  description: string;
  tasks: string[];
  duration: string;
  color: string[];
}