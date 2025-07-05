import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import NoteInput from '@/components/NoteInput';
import NoteDisplay from '@/components/NoteDisplay';
import DailyChecklist from '@/components/DailyChecklist';
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

const ProductivityTab: React.FC<TabProps> = ({ role, notes, onAddNote, onDeleteNote, onUpdateNoteStatus }) => {
  const { t } = useLanguage();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">{t('productivity')}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {role === 'boss' ? 'Boss view for Productivity.' : 'Assistant view for Productivity.'}
      </p>
      
      {role === 'assistant' && (
        <div className="mb-6">
          <DailyChecklist />
        </div>
      )}

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
        title={t('productivity')}
      />
    </div>
  );
};

export default ProductivityTab;