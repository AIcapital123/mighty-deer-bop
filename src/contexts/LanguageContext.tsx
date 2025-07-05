import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Role } from '@/types/app'; // Import Role type

type Language = 'en' | 'th';

interface Translation {
  [key: string]: {
    en: string | string[] | { [key: string]: string };
    th: string | string[] | { [key: string]: string };
  };
}

const translations: Translation = {
  // Role and General
  'boss': { en: 'Boss', th: 'เจ้านาย' },
  'assistant': { en: 'Assistant', th: 'ผู้ช่วย' },
  'i_am_the_boss': { en: 'I am the Boss', th: 'ฉันคือเจ้านาย' },
  'i_am_the_assistant': { en: 'I am the Assistant', th: 'ฉันคือผู้ช่วย' },
  'select_your_role': { en: 'Select Your Role', th: 'เลือกบทบาทของคุณ' },
  'english': { en: 'English', th: 'อังกฤษ' },
  'thai': { en: 'Thai', th: 'ไทย' },
  'select_a_role_to_continue': { en: 'Please select a role to continue.', th: 'โปรดเลือกบทบาทเพื่อดำเนินการต่อ' },
  'app_description': { en: 'Your personal assistant coordination dashboard for health, tasks, and productivity.', th: 'แดชบอร์ดผู้ช่วยส่วนตัวของคุณสำหรับการประสานงานด้านสุขภาพ งาน และประสิทธิภาพ' },
  'app_name': { en: 'BossCare – Assistant Task & Wellness Tracker', th: 'BossCare – ระบบติดตามงานและสุขภาพผู้ช่วย' },
  'good_morning': { en: 'Good morning', th: 'สวัสดีตอนเช้า' },
  'good_afternoon': { en: 'Good afternoon', th: 'สวัสดีตอนบ่าย' },
  'good_evening': { en: 'Good evening', th: 'สวัสดีตอนเย็น' },
  'close': { en: 'Close', th: 'ปิด' },
  'deleted': { en: 'Deleted', th: 'ถูกลบ' },

  // Tabs
  'appointments': { en: 'Appointments', th: 'นัดหมาย' },
  'calls': { en: 'Calls', th: 'การโทร' },
  'shopping': { en: 'Shopping', th: 'การซื้อของ' },
  'health': { en: 'Health', th: 'สุขภาพ' },
  'food': { en: 'Food', th: 'อาหาร' },
  'cleaning': { en: 'Cleaning', th: 'การทำความสะอาด' },
  'productivity': { en: 'Productivity', th: 'ประสิทธิภาพ' },
  'salary_logs': { en: 'Salary & Logs', th: 'เงินเดือนและบันทึก' },

  // Notes
  'add_a_note': { en: 'Add a note...', th: 'เพิ่มบันทึก...' },
  'add_note': { en: 'Add Note', th: 'เพิ่มบันทึก' },
  'note_added_successfully': { en: 'Note added successfully!', th: 'เพิ่มบันทึกสำเร็จ!' },
  'no_notes_yet': { en: 'No notes yet.', th: 'ยังไม่มีบันทึก' },
  'notes_history': { en: 'Notes History', th: 'ประวัติบันทึก' },
  'added_by': { en: 'Added by', th: 'เพิ่มโดย' },
  'view_edit_history': { en: 'View Edit History', th: 'ดูประวัติการแก้ไข' },
  'history': { en: 'History', th: 'ประวัติ' },
  'history_description': { en: 'Review changes made to this section.', th: 'ตรวจสอบการเปลี่ยนแปลงที่ทำในส่วนนี้' },
  'no_history_yet': { en: 'No history yet.', th: 'ยังไม่มีประวัติ' },
  'boss_note_prompts': {
    en: [
      "Want to leave her a note? Doesn’t need to be deep.",
      "Just say thanks, or tell her she did good.",
      "Let her know you noticed what she did today."
    ],
    th: [
      "อยากทิ้งข้อความให้เธอไหม? ไม่ต้องลึกซึ้งก็ได้",
      "แค่บอกขอบคุณ หรือบอกว่าเธอทำได้ดี",
      "บอกให้เธอรู้ว่าคุณสังเกตเห็นสิ่งที่เธอทำในวันนี้"
    ]
  },
  'assistant_note_prompts': {
    en: [
      "Anything he should know? Or just something kind?",
      "Drop a reminder or a little update."
    ],
    th: [
      "มีอะไรที่เขาควรรู้ไหม? หรือแค่คำพูดดีๆ?",
      "ทิ้งข้อความเตือนความจำหรืออัปเดตเล็กน้อย"
    ]
  },

  // Pain Mode
  'pain_mode_on': { en: 'Pain Mode ON', th: 'โหมดเจ็บปวดเปิดอยู่' },
  'pain_mode_banner_message': { en: 'Boss is in pain today. Prioritize wellness + quiet.', th: 'วันนี้เจ้านายกำลังเจ็บปวด โปรดให้ความสำคัญกับสุขภาพและความเงียบสงบ' },

  // Motivational
  'motivational_messages': {
    en: [
      "Helping him focus helps both of you move forward.",
      "The calmer he is, the more space you both have to breathe.",
      "Your care keeps his head clear — and that matters."
    ],
    th: [
      "การช่วยให้เขามีสมาธิช่วยให้คุณทั้งคู่ก้าวไปข้างหน้า",
      "ยิ่งเขาสงบมากเท่าไหร่ คุณทั้งคู่ก็ยิ่งมีพื้นที่หายใจมากขึ้นเท่านั้น",
      "ความเอาใจใส่ของคุณทำให้เขามีสติ — และนั่นสำคัญ"
    ]
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getDailyMotivationalPhrase: () => string;
  getNotePrompt: (role: Role) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    const value = translation[language];
    if (typeof value !== 'string') {
      console.warn(`Translation for key '${key}' is not a string, but t() expects a string.`);
      return key;
    }
    return value;
  };

  const getDailyMotivationalPhrase = (): string => {
    const phrases = translations['motivational_messages'][language];
    if (!Array.isArray(phrases)) return "";
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return phrases[dayOfYear % phrases.length];
  };

  const getNotePrompt = (role: Role): string => {
    const key = `${role}_note_prompts`;
    const prompts = translations[key]?.[language];
    if (!Array.isArray(prompts)) {
      return t('add_a_note'); // Fallback
    }
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getDailyMotivationalPhrase, getNotePrompt }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};