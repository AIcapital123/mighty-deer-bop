import React from 'react';
import { Note } from '@/types/app';
import { useLanguage } from '@/contexts/LanguageContext';

interface NoteDisplayProps {
  notes: Note[];
}

const NoteDisplay: React.FC<NoteDisplayProps> = ({ notes }) => {
  const { t } = useLanguage();

  if (notes.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 mt-4">{t('no_notes_yet')}</p>;
  }

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('notes_history')}</h3>
      {notes.map((note) => (
        <div key={note.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm border border-gray-200 dark:border-gray-600">
          <p className="text-gray-700 dark:text-gray-200 mb-1">{note.content}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('added_by')}: {t(note.added_by)} on {new Date(note.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NoteDisplay;