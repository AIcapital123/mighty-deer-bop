import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Note } from '@/types/app';
import { useLanguage } from '@/contexts/LanguageContext';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[]; // Assuming notes are the "history" for now
  title: string;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, notes, title }) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title} {t('history')}</DialogTitle>
          <DialogDescription>
            {t('history_description')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {notes.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">{t('no_history_yet')}</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">
                <p className="font-medium text-gray-800 dark:text-gray-200">{note.content}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('added_by')}: {t(note.addedBy)} on {note.timestamp}
                </p>
              </div>
            ))
          )}
        </div>
        <Button onClick={onClose} className="w-full mt-4">
          {t('close')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;