import React from 'react';
import { Note } from '@/types/app';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface NoteDisplayProps {
  notes: Note[];
  onDeleteNote: (noteId: number) => void;
}

const NoteDisplay: React.FC<NoteDisplayProps> = ({ notes, onDeleteNote }) => {
  const { t } = useLanguage();

  if (notes.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 mt-4">{t('no_notes_yet')}</p>;
  }

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('notes_history')}</h3>
      {notes.map((note) => (
        <div key={note.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-200 dark:border-gray-600">
          <div>
            <p className="text-gray-700 dark:text-gray-200 mb-1">{note.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('added_by')}: {t(note.added_by)} on {new Date(note.created_at).toLocaleString()}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onDeleteNote(note.id)}>
            <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default NoteDisplay;