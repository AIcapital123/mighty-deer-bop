import React from 'react';
import { Note, NoteStatus, Role } from '@/types/app';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface NoteDisplayProps {
  notes: Note[];
  onDeleteNote: (noteId: number) => void;
  onUpdateNoteStatus: (noteId: number, status: NoteStatus) => void;
}

const statusColors: Record<NoteStatus, string> = {
  'Urgent': 'bg-red-100 border-red-200 dark:bg-red-900/50 dark:border-red-700',
  'In Progress': 'bg-blue-100 border-blue-200 dark:bg-blue-900/50 dark:border-blue-700',
  'Complete': 'bg-green-100 border-green-200 dark:bg-green-900/50 dark:border-green-700',
  'Pending': 'bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-600',
};

const NoteDisplay: React.FC<NoteDisplayProps> = ({ notes, onDeleteNote, onUpdateNoteStatus }) => {
  const { t } = useLanguage();

  if (notes.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 mt-4">{t('no_notes_yet')}</p>;
  }

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('notes_history')}</h3>
      {notes.map((note) => (
        <div key={note.id} className={cn("p-3 rounded-lg shadow-sm border", statusColors[note.status || 'Pending'])}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-grow mb-2 sm:mb-0">
              <p className="text-gray-800 dark:text-gray-200">{note.content}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('added_by')}: {t(note.added_by)} on {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-2 self-end sm:self-center">
              <Select value={note.status || 'Pending'} onValueChange={(value: NoteStatus) => onUpdateNoteStatus(note.id, value)}>
                <SelectTrigger className="w-[140px] bg-white/50 dark:bg-gray-800/50">
                  <SelectValue placeholder={t('status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urgent">{t('Urgent')}</SelectItem>
                  <SelectItem value="Pending">{t('Pending')}</SelectItem>
                  <SelectItem value="In Progress">{t('In Progress')}</SelectItem>
                  <SelectItem value="Complete">{t('Complete')}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" onClick={() => onDeleteNote(note.id)}>
                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteDisplay;