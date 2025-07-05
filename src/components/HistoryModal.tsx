import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Note } from '@/types/app';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[];
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
              <div key={note.id} className={cn("p-3 rounded-md text-sm", note.is_deleted ? "bg-red-100 dark:bg-red-900/50 opacity-60" : "bg-gray-100 dark:bg-gray-700")}>
                <p className={cn("font-medium text-gray-800 dark:text-gray-200", note.is_deleted && "line-through")}>{note.content}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('added_by')}: {t(note.added_by)} on {new Date(note.created_at).toLocaleString()}
                  {note.is_deleted && <span className="text-red-500 font-semibold ml-2">({t('deleted')})</span>}
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