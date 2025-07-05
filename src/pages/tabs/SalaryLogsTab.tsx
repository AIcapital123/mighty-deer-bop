import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import NoteInput from '@/components/NoteInput';
import NoteDisplay from '@/components/NoteDisplay';
import HistoryModal from '@/components/HistoryModal';
import { Button } from '@/components/ui/button';
import { Note, Role, NoteStatus } from '@/types/app';

interface TabProps {
  role: Role;
  notes: Note[];
  onAddNote: (content: string) => void;
  onDeleteNote: (noteId: number) => void;
  onUpdateNoteStatus: (noteId: number, status: NoteStatus) => void;
}

const SalaryLogsTab: React.FC<TabProps> = ({ role, notes, onAddNote, onDeleteNote, onUpdateNoteStatus }) => {
  const { t } = useLanguage();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">{t('salary_logs')}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Track salary payments and log important financial events here.
      </p>
      <NoteInput onAddNote={onAddNote} placeholder={t('add_a_note')} role={role} />
      <NoteDisplay 
        notes={notes.filter(n => !n.is_deleted)} 
        onDeleteNote={onDeleteNote}
        onUpdateNoteStatus={onUpdateNoteStatus}
      />

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