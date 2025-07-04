import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'th';

interface Translation {
  [key: string]: {
    en: string;
    th: string;
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
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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