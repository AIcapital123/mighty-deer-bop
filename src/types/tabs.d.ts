import { Note, Role, NoteStatus } from '@/types/app';
import React from 'react';

export interface TabComponentProps {
  role: Role;
  notes: Note[];
  onAddNote: (content: string) => void;
  onDeleteNote: (noteId: number) => void;
  onUpdateNoteStatus: (noteId: number, status: NoteStatus) => void;
  label: string;
  icon: React.ElementType;
  colorClass: string;
}