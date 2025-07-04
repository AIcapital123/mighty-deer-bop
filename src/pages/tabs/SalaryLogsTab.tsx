import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import NoteInput from '@/components/NoteInput';
import NoteDisplay from '@/components/NoteDisplay';
import HistoryModal from '@/components/HistoryModal';
import { Button } from '@/components/ui/button';
import { Note, Role } from '@/types/app';

interface TabProps {
  role: Role;
  notes: Note[];
  onAddNote: (content: string) => void;
  onDeleteNote: (noteId: number) => void;
}

const SalaryLogsTab: React.FC<TabProps> = ({ role, notes, onAddNote, onDeleteNote }) => {
  const { t } = useLanguage();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">{t('salary_logs')}</h2>
      {role === 'assistant' ? (
        <p className="text-gray-700 dark:text-gray-300 mb-4">Assistant view for Salary & Logs.</p>
      ) : (
        <p className="text-red-500 dark:text-red-400 mb-4">This tab is only visible to the Boss.</p>
      )}
      <NoteInput onAddNote={onAddNote} placeholder={t('add_a_note')} role={role} />
      <NoteDisplay notes={notes.filter(n => !n.is_deleted)} onDeleteNote={onDeleteNote} />

      <Button onClick={() => setIsHistoryModalOpen(true)} className="mt-4 w-full">
        {t('view_edit_history')}
      </Button>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        notes={notes}
        title={t('salary_logs')}
      />
    </div>
  );
};

export default SalaryLogsTab;