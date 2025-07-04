import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface NoteInputProps {
  onAddNote: (content: string) => void;
  placeholder?: string;
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote, placeholder }) => {
  const [noteContent, setNoteContent] = useState('');
  const { t } = useLanguage();

  const handleSubmit = () => {
    if (noteContent.trim()) {
      onAddNote(noteContent.trim());
      setNoteContent('');
    }
  };

  return (
    <div className="flex flex-col space-y-2 mt-4">
      <Textarea
        placeholder={placeholder || t('add_a_note')}
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="min-h-[60px]"
      />
      <Button onClick={handleSubmit} className="self-end">
        {t('add_note')}
      </Button>
    </div>
  );
};

export default NoteInput;