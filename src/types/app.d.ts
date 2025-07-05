// src/types/app.d.ts
// This file defines core application types.
export type Role = 'boss' | 'assistant';

export interface Note {
  id: number;
  content: string;
  added_by: Role;
  created_at: string;
  tab_id: string;
  is_deleted?: boolean;
}