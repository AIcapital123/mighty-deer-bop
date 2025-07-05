// src/types/app.d.ts
// This file defines core application types.
export type Role = 'boss' | 'assistant';

export type NoteStatus = 'Urgent' | 'Pending' | 'In Progress' | 'Complete';

export type NoteCategory = 'Cleaning' | 'Food' | 'Shopping' | 'Health' | 'Calls' | 'Other';

export interface Note {
  id: number;
  content: string;
  added_by: Role;
  created_at: string;
  is_deleted?: boolean;
  status: NoteStatus;
  category: NoteCategory | null;
  tab_id: string;
}

export interface Compensation {
  id: number;
  role: 'assistant';
  bonus: number;
}