export type ActionType = 'BOOK_MEETING' | 'COLLECT_LEAD' | 'NURTURE';

export interface Lead {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  useCase?: string;
  budget?: string;
  timeline?: string;
}

export interface BackendResponse {
  output: string;
  action: ActionType;
  leadScore: number;
  lead: Lead;
  calendarLink?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  action?: ActionType;
  calendarLink?: string;
}
