// src/types/app.d.ts
// This file defines core application types.
export type Role = 'boss' | 'assistant';

export type NoteStatus = 'Urgent' | 'Pending' | 'In Progress' | 'Complete';

export interface Note {
  id: number;
  content: string;
  added_by: Role;
  created_at: string;
  tab_id: string; // Will likely be 'Notes' for all
  is_deleted?: boolean;
  status: NoteStatus;
}

export interface Compensation {
  id: number;
  role: 'assistant';
  bonus: number;
}