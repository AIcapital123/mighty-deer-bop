import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'th';

interface Translation {
  [key: string]: {
    en: string | string[]; // Allow string or string array
    th: string | string[]; // Allow string or string array
  };
}

const translations: Translation = {
  'boss': { en: 'Boss', th: 'เจ้านาย' },
  'assistant': { en: 'Assistant', th: 'ผู้ช่วย' },
  'i_am_the_boss': { en: 'I am the Boss', th: 'ฉันคือเจ้านาย' },
  'i_am_the_assistant': { en: 'I am the Assistant', th: 'ฉันคือผู้ช่วย' },
  'select_your_role': { en: 'Select Your Role', th: 'เลือกบทบาทของคุณ' },
  'appointments': { en: 'Appointments', th: 'นัดหมาย' },
  'calls': { en: 'Calls', th: 'การโทร' },
  'shopping': { en: 'Shopping', th: 'การซื้อของ' },
  'health': { en: 'Health', th: 'สุขภาพ' },
  'food': { en: 'Food', th: 'อาหาร' },
  'cleaning': { en: 'Cleaning', th: 'การทำความสะอาด' },
  'productivity': { en: 'Productivity', th: 'ประสิทธิภาพ' },
  'salary_logs': { en: 'Salary & Logs', th: 'เงินเดือนและบันทึก' },
  'english': { en: 'English', th: 'อังกฤษ' },
  'thai': { en: 'Thai', th: 'ไทย' },
  'welcome_to_boss_care': { en: 'Welcome to BossCare', th: 'ยินดีต้อนรับสู่ BossCare' },
  'select_a_role_to_continue': { en: 'Please select a role to continue.', th: 'โปรดเลือกบทบาทเพื่อดำเนินการต่อ' },
  'app_description': { en: 'Your personal assistant coordination dashboard for health, tasks, and productivity.', th: 'แดชบอร์ดผู้ช่วยส่วนตัวของคุณสำหรับการประสานงานด้านสุขภาพ งาน และประสิทธิภาพ' },
  'app_name': { en: 'BossCare – Assistant Task & Wellness Tracker', th: 'BossCare – ระบบติดตามงานและสุขภาพผู้ช่วย' },
  'motivational_phrases': {
    en: [
      "When your boss succeeds, your salary grows with him.",
      "Your dedication makes a difference every day.",
      "Small efforts lead to great achievements.",
      "You are the backbone of efficiency.",
      "Every task completed brings success closer.",
      "Your hard work is truly appreciated.",
      "Keep shining, you're doing great!"
    ],
    th: [
      "คุณทำให้เจ้านายประสบความสำเร็จ รายได้คุณก็เพิ่มขึ้นด้วย",
      "ความทุ่มเทของคุณสร้างความแตกต่างในทุกๆ วัน",
      "ความพยายามเล็กๆ นำไปสู่ความสำเร็จที่ยิ่งใหญ่",
      "คุณคือกระดูกสันหลังของประสิทธิภาพ",
      "ทุกงานที่เสร็จสิ้นนำพาความสำเร็จเข้ามาใกล้ขึ้น",
      "ความพยายามของคุณได้รับการชื่นชมอย่างแท้จริง",
      "ส่องแสงต่อไป คุณทำได้ดีมาก!"
    ]
  },
  'add_a_note': { en: 'Add a note...', th: 'เพิ่มบันทึก...' },
  'add_note': { en: 'Add Note', th: 'เพิ่มบันทึก' },
  'note_added_successfully': { en: 'Note added successfully!', th: 'เพิ่มบันทึกสำเร็จ!' },
  'no_notes_yet': { en: 'No notes yet.', th: 'ยังไม่มีบันทึก' },
  'notes_history': { en: 'Notes History', th: 'ประวัติบันทึก' },
  'added_by': { en: 'Added by', th: 'เพิ่มโดย' },
  'add_appointment_note': { en: 'Add a note about appointments...', th: 'เพิ่มบันทึกเกี่ยวกับการนัดหมาย...' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getDailyMotivationalPhrase: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key; // Fallback to key if not found
    }
    const value = translation[language];
    if (Array.isArray(value)) {
      // This key is expected to return an array, but t() expects a string.
      console.warn(`Translation for key '${key}' is an array, but t() expects a string.`);
      return key; // Return key or a generic message for misuse
    }
    return value; // Value is guaranteed to be string here
  };

  const getDailyMotivationalPhrase = (): string => {
    const phrases = translations['motivational_phrases'][language];
    if (!Array.isArray(phrases)) {
      console.error("Motivational phrases are not an array as expected.");
      return "Error: Motivational phrase not found."; // Fallback
    }
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return phrases[dayOfYear % phrases.length];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getDailyMotivationalPhrase }}>
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