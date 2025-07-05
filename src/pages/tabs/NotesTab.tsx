import React, { useState } from 'react';
import { Note, NoteStatus, Role } from '@/types/app';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import HistoryModal from '@/components/HistoryModal';

interface NotesTabProps {
  role: Role;
  notes: Note[];
  onAddNote: (content: string, status: NoteStatus) => void;
  onDeleteNote: (noteId: number) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ role, notes, onAddNote, onDeleteNote }) => {
  const { t, getNotePrompt } = useLanguage();
  const [noteContent, setNoteContent] = useState('');
  const [status, setStatus] = useState<NoteStatus>('Pending');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleSubmit = () => {
    if (noteContent.trim()) {
      onAddNote(noteContent.trim(), status);
      setNoteContent('');
      setStatus('Pending');
    }
  };

  const activeNotes = notes.filter(n => !n.is_deleted);

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder={getNotePrompt(role)}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="min-h-[60px]"
        />
        <div className="flex justify-between items-center">
          <Select value={status} onValueChange={(value: NoteStatus) => setStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('set_status')} />
            </SelectTrigger>
            <SelectContent>
              {(['Urgent', 'Pending', 'In Progress', 'Complete'] as NoteStatus[]).map(s => (
                <SelectItem key={s} value={s}>{t(s)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit}>{t('add_note')}</Button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('notes_history')}</h3>
        {activeNotes.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t('no_notes_yet')}</p>
        ) : (
          activeNotes.map((note) => (
            <div key={note.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
              <div>
                <p className="text-gray-800 dark:text-gray-200 mb-2">{note.content}</p>
                <div className="flex items-center gap-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <StatusBadge status={note.status} />
                  <span>{t('added_by')}: {t(note.added_by)}</span>
                  <span>{new Date(note.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onDeleteNote(note.id)}>
                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
              </Button>
            </div>
          ))
        )}
      </div>

      <Button onClick={() => setIsHistoryModalOpen(true)} className="mt-4 w-full">
        {t('view_edit_history')}
      </Button>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        notes={notes}
        title={t('notes')}
      />
    </div>
  );
};

export default NotesTab;