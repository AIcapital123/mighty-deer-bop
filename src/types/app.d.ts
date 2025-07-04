// src/types/app.d.ts
// This file defines core application types.
export type Role = 'boss' | 'assistant';

export interface Note {
  id: string;
  content: string;
  addedBy: Role;
  timestamp: string;
}

export interface TabData {
  notes: Note[];
  // Add other data specific to each tab here as needed
}