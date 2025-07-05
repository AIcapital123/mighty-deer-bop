import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import NoteInput from '@/components/NoteInput';
import NoteDisplay from '@/components/NoteDisplay';
import HistoryModal from '@/components/HistoryModal';
import { Button } from '@/components/ui/button';
import { TabComponentProps } from '@/types/tabs';
import { cn } from '@/lib/utils';

const ShoppingTab: React.FC<TabComponentProps> = ({
  role,
  notes,
  onAddNote,
  onDeleteNote,
  onUpdateNoteStatus,
  tabId,
  label,
  icon,
  colorClass,
}) => {
  const { t, getCategoryDescription } = useLanguage();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const description = getCategoryDescription(tabId);

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <div className="sticky top-32 bg-white dark:bg-gray-800 z-10 -mx-4 px-4 py-2 border-b dark:border-gray-700 mb-4">
        <h2 className={cn("text-2xl font-semibold flex items-center", colorClass)}>
          {React.createElement(icon, { className: "h-6 w-6 mr-2" })}
          <span>{label}</span>
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>

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
        title={t(tabId)}
      />
    </div>
  );
};

export default ShoppingTab;