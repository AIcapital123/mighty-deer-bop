import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { Role } from '@/types/app';

interface NoteInputProps {
  onAddNote: (content: string) => void;
  placeholder?: string;
  role: Role; // Add role prop
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote, placeholder, role }) => {
  const [noteContent, setNoteContent] = useState('');
  const { t, getNotePrompt } = useLanguage();

  const handleSubmit = () => {
    if (noteContent.trim()) {
      onAddNote(noteContent.trim());
      setNoteContent('');
    }
  };

  // Use the provided placeholder or get a role-specific prompt
  const currentPlaceholder = placeholder || getNotePrompt(role);

  return (
    <div className="flex flex-col space-y-2 mt-4">
      <Textarea
        placeholder={currentPlaceholder}
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