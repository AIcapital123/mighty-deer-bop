import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import NoteInput from '@/components/NoteInput';
import NoteDisplay from '@/components/NoteDisplay';
import { Note, Role } from '@/types/app';

interface TabProps {
  role: Role;
  notes: Note[];
  onAddNote: (content: string) => void;
}

const HealthTab: React.FC<TabProps> = ({ role, notes, onAddNote }) => {
  const { t } = useLanguage();
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">{t('health')}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {role === 'boss' ? 'Boss view for Health.' : 'Assistant view for Health.'}
      </p>
      <NoteInput onAddNote={onAddNote} placeholder={t('add_a_note')} />
      <NoteDisplay notes={notes} />
      {/* Future content for Health */}
    </div>
  );
};

export default HealthTab;