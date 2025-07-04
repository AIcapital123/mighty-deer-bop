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

const SalaryLogsTab: React.FC<TabProps> = ({ role, notes, onAddNote }) => {
  const { t } = useLanguage();
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">{t('salary_logs')}</h2>
      {role === 'assistant' ? (
        <p className="text-gray-700 dark:text-gray-300 mb-4">Assistant view for Salary & Logs.</p>
      ) : (
        <p className="text-red-500 dark:text-red-400 mb-4">This tab is only visible to the Boss.</p>
      )}
      <NoteInput onAddNote={onAddNote} placeholder={t('add_a_note')} role={role} />
      <NoteDisplay notes={notes} />
      {/* Future content for Salary & Logs */}
    </div>
  );
};

export default SalaryLogsTab;