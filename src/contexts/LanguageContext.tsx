import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Role } from '@/types/app';

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
  'app_description': { en: 'Your personal assistant coordination dashboard.', th: 'แดชบอร์ดผู้ช่วยส่วนตัวของคุณ' },
  'app_name': { en: 'BossCare', th: 'BossCare' },
  'good_morning': { en: 'Good morning', th: 'สวัสดีตอนเช้า' },
  'good_afternoon': { en: 'Good afternoon', th: 'สวัสดีตอนบ่าย' },
  'good_evening': { en: 'Good evening', th: 'สวัสดีตอนเย็น' },
  'close': { en: 'Close', th: 'ปิด' },
  'deleted': { en: 'Deleted', th: 'ถูกลบ' },

  // Tabs
  'overview': { en: 'Overview', th: 'ภาพรวม' },
  'tasks': { en: 'Tasks', th: 'งาน' },
  'salary': { en: 'Salary', th: 'เงินเดือน' },
  'notes': { en: 'Notes', th: 'โน้ต' },

  // Notes
  'add_new_note_or_task': { en: 'Add a new note or task...', th: 'เพิ่มโน้ตหรืองานใหม่...' },
  'set_status': { en: 'Set Status', th: 'ตั้งสถานะ' },
  'task_category': { en: 'Task Category', th: 'หมวดหมู่งาน' },
  'add_note': { en: 'Add Note', th: 'เพิ่มบันทึก' },
  'note_added_successfully': { en: 'Note added successfully!', th: 'เพิ่มบันทึกสำเร็จ!' },
  'no_notes_yet': { en: 'No notes yet.', th: 'ยังไม่มีบันทึก' },
  'notes_history': { en: 'Notes & Tasks History', th: 'ประวัติโน้ตและงาน' },
  'added_by': { en: 'Added by', th: 'เพิ่มโดย' },
  'view_edit_history': { en: 'View Edit History', th: 'ดูประวัติการแก้ไข' },
  'history': { en: 'History', th: 'ประวัติ' },
  'history_description': { en: 'Review changes made to this section.', th: 'ตรวจสอบการเปลี่ยนแปลงที่ทำในส่วนนี้' },
  'no_history_yet': { en: 'No history yet.', th: 'ยังไม่มีประวัติ' },

  // Statuses
  'Urgent': { en: 'Urgent', th: 'ด่วน' },
  'Pending': { en: 'Pending', th: 'รอดำเนินการ' },
  'In Progress': { en: 'In Progress', th: 'กำลังดำเนินการ' },
  'Complete': { en: 'Complete', th: 'เสร็จสมบูรณ์' },

  // Categories
  'Cleaning': { en: '🧹 Cleaning', th: '🧹 การทำความสะอาด' },
  'Food': { en: '🍱 Food', th: '🍱 อาหาร' },
  'Shopping': { en: '🛒 Shopping', th: '🛒 การซื้อของ' },
  'Health': { en: '🩺 Health', th: '🩺 สุขภาพ' },
  'Calls': { en: '📞 Calls', th: '📞 การโทร' },
  'Other': { en: '📋 Other', th: '📋 อื่นๆ' },

  // Salary Tab
  'my_salary_overview': { en: 'My Salary Overview', th: 'ภาพรวมเงินเดือนของฉัน' },
  'base_salary': { en: 'Base Salary', th: 'เงินเดือนพื้นฐาน' },
  'bonus_this_month': { en: 'Bonus This Month', th: 'โบนัสเดือนนี้' },
  'bonus_description': { en: 'Bonus is based on productivity, care, and weekly consistency.', th: 'โบนัสขึ้นอยู่กับประสิทธิภาพ ความเอาใจใส่ และความสม่ำเสมอรายสัปดาห์' },
  'assistant_compensation': { en: 'Assistant Compensation', th: 'ค่าตอบแทนผู้ช่วย' },
  'monthly_base_salary': { en: 'Monthly Base Salary', th: 'เงินเดือนพื้นฐานรายเดือน' },
  'update_bonus_amount': { en: 'Update Bonus Amount', th: 'อัปเดตจำนวนโบนัส' },
  'save_bonus': { en: 'Save Bonus', th: 'บันทึกโบนัส' },
  'bonus_updated': { en: 'Bonus updated.', th: 'อัปเดตโบนัสแล้ว' },

  // Checklists
  'todays_focus': { en: "Today’s Focus", th: 'สิ่งที่ต้องให้ความสำคัญวันนี้' },
  'prepare_quiet_work_area': { en: 'Prepare quiet work area', th: 'เตรียมพื้นที่ทำงานที่เงียบสงบ' },
  'handle_food_and_water': { en: 'Handle food and water', th: 'จัดการอาหารและน้ำ' },
  'check_appointments': { en: 'Check appointments', th: 'ตรวจสอบนัดหมาย' },
  'minimize_distractions': { en: 'Minimize distractions', th: 'ลดสิ่งรบกวน' },
  'boss_priorities_today': { en: "Boss's Priorities Today", th: 'ลำดับความสำคัญของเจ้านายวันนี้' },
  'check_assistant_updates': { en: "Check assistant’s updates", th: 'ตรวจสอบอัปเดตจากผู้ช่วย' },
  'log_pain_condition': { en: 'Log pain condition if applicable', th: 'บันทึกอาการเจ็บปวด (ถ้ามี)' },
  'approve_urgent_tasks': { en: 'Approve any urgent tasks', th: 'อนุมัติงานด่วน' },
  'leave_note_or_motivation': { en: 'Leave note or motivation if needed', th: 'ทิ้งโน้ตหรือให้กำลังใจ (ถ้าจำเป็น)' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    const value = translation[language];
    return typeof value === 'string' ? value : key;
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