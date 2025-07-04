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
  'add_a_note': { en: 'Add a note...', th: 'เพิ่มบันทึก...' },
  'add_note': { en: 'Add Note', th: 'เพิ่มบันทึก' },
  'note_added_successfully': { en: 'Note added successfully!', th: 'เพิ่มบันทึกสำเร็จ!' },
  'no_notes_yet': { en: 'No notes yet.', th: 'ยังไม่มีบันทึก' },
  'notes_history': { en: 'Notes History', th: 'ประวัติบันทึก' },
  'added_by': { en: 'Added by', th: 'เพิ่มโดย' },
  'add_appointment_note': { en: 'Add a note about appointments...', th: 'เพิ่มบันทึกเกี่ยวกับการนัดหมาย...' },
  'deleted': { en: 'Deleted', th: 'ถูกลบ' },

  // New content from UI Copy & Content Pack
  'motivational_messages': {
    en: [
      "Helping him focus helps both of you move forward.",
      "The calmer he is, the more space you both have to breathe.",
      "Your care keeps his head clear — and that matters.",
      "Quiet mornings, smooth afternoons — you’re part of what makes it happen.",
      "Little things add up. He sees it, even if he’s busy.",
      "You’re not just assisting — you’re his balance.",
      "Make him feel settled today. Everything else falls into place."
    ],
    th: [
      "การช่วยให้เขามีสมาธิช่วยให้คุณทั้งคู่ก้าวไปข้างหน้า",
      "ยิ่งเขาสงบมากเท่าไหร่ คุณทั้งคู่ก็ยิ่งมีพื้นที่หายใจมากขึ้นเท่านั้น",
      "ความเอาใจใส่ของคุณทำให้เขามีสติ — และนั่นสำคัญ",
      "เช้าที่เงียบสงบ บ่ายที่ราบรื่น — คุณคือส่วนหนึ่งที่ทำให้มันเกิดขึ้น",
      "สิ่งเล็กๆ น้อยๆ รวมกันเป็นสิ่งใหญ่ เขาเห็นมัน แม้ว่าเขาจะยุ่งอยู่ก็ตาม",
      "คุณไม่ได้แค่ช่วยเหลือ — คุณคือความสมดุลของเขา",
      "ทำให้เขารู้สึกมั่นคงในวันนี้ ทุกสิ่งทุกอย่างจะเข้าที่เอง"
    ]
  },
  'assistant_dashboard_tips': {
    en: {
      cleaning: "Keep the space tidy and chill — it helps him focus.",
      health: "If he’s in pain, don’t overdo it. Just be around, be calm.",
      food: "Make sure there’s something ready before he needs to ask.",
      shopping: "Think about what would make life easier for him today.",
      productivity: "How did you make his day easier or lighter today?"
    },
    th: {
      cleaning: "รักษาสถานที่ให้เป็นระเบียบและผ่อนคลาย — ช่วยให้เขามีสมาธิ",
      health: "ถ้าเขาเจ็บปวด อย่าหักโหม แค่อยู่ใกล้ๆ และสงบ",
      food: "ตรวจสอบให้แน่ใจว่ามีอาหารพร้อมก่อนที่เขาจะต้องขอ",
      shopping: "คิดถึงสิ่งที่จะทำให้ชีวิตเขาง่ายขึ้นในวันนี้",
      productivity: "วันนี้คุณช่วยให้วันของเขาง่ายขึ้นหรือเบาลงได้อย่างไรบ้าง?"
    }
  },
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
  'quick_mood_labels': {
    en: [
      "✅ Focused",
      "😐 Distracted",
      "😓 In Pain",
      "🛋️ Low Energy",
      "🎯 Locked In"
    ],
    th: [
      "✅ มีสมาธิ",
      "😐 วอกแวก",
      "😓 เจ็บปวด",
      "🛋️ พลังงานต่ำ",
      "🎯 มุ่งมั่น"
    ]
  },
  'daily_checkin_prompt': {
    en: {
      assistant: "What did you do today that helped him? Could be big or small.",
      boss: "Anything she did today that made things easier? Leave a quick note."
    },
    th: {
      assistant: "วันนี้คุณทำอะไรที่ช่วยเขาบ้าง? จะเล็กหรือใหญ่ก็ได้",
      boss: "วันนี้เธอทำอะไรที่ทำให้สิ่งต่างๆ ง่ายขึ้นบ้าง? ทิ้งข้อความสั้นๆ"
    }
  },
  'win_of_the_day_examples': {
    en: [
      "Handled all the food stuff without being asked.",
      "Kept the place really quiet while he worked.",
      "Noticed he was tense and gave him space.",
      "Found something he needed online.",
      "Made sure he ate before a call."
    ],
    th: [
      "จัดการเรื่องอาหารทั้งหมดโดยไม่ต้องถูกขอ",
      "รักษาสถานที่ให้เงียบสงบมากในขณะที่เขาทำงาน",
      "สังเกตเห็นว่าเขาเครียดและให้พื้นที่ส่วนตัว",
      "พบสิ่งที่เขาต้องการทางออนไลน์",
      "ตรวจสอบให้แน่ใจว่าเขากินก่อนการโทร"
    ]
  },
  'private_message_examples': {
    en: [
      "He looked tired today. Maybe remind him to stretch?",
      "She’s been doing extra lately. Leave her something sweet."
    ],
    th: [
      "วันนี้เขาดูเหนื่อย อาจจะเตือนให้เขายืดเส้นยืดสายไหม?",
      "ช่วงนี้เธอทำงานพิเศษเยอะ ทิ้งอะไรหวานๆ ให้เธอหน่อย"
    ]
  },
  'bonus_tracker_text': {
    en: {
      current: "Tasks done today: ",
      status: "You’re on track for the weekly bonus. Keep it up!"
    },
    th: {
      current: "งานที่ทำวันนี้: ",
      status: "คุณกำลังไปได้ดีสำหรับโบนัสรายสัปดาห์ สู้ๆ!"
    }
  },
  'language_toggle_tip': { en: "Switch between English and Thai — everything updates automatically.", th: "สลับระหว่างภาษาอังกฤษและภาษาไทย — ทุกอย่างจะอัปเดตโดยอัตโนมัติ" },
  'logout_message': { en: "Done for now? You can log out or just leave it open.", th: "เสร็จแล้วใช่ไหม? คุณสามารถออกจากระบบหรือเปิดทิ้งไว้ก็ได้" },
  'footer_text': { en: "Built for two people who make each other better.", th: "สร้างขึ้นเพื่อคนสองคนที่ทำให้กันและกันดีขึ้น" },
  'good_morning': { en: 'Good morning', th: 'สวัสดีตอนเช้า' },
  'good_afternoon': { en: 'Good afternoon', th: 'สวัสดีตอนบ่าย' },
  'good_evening': { en: 'Good evening', th: 'สวัสดีตอนเย็น' },
  'todays_top_tasks': { en: 'Today’s Top Tasks', th: 'งานสำคัญประจำวัน' },
  'add_new_task': { en: 'Add a new task...', th: 'เพิ่มงานใหม่...' },
  'add_task': { en: 'Add Task', th: 'เพิ่มงาน' },
  'done': { en: 'Done', th: 'เสร็จแล้ว' },
  'in_progress': { en: 'In Progress', th: 'กำลังดำเนินการ' },
  'missed': { en: 'Missed', th: 'พลาด' },
  'status': { en: 'Status', th: 'สถานะ' },
  'task_update_note': { en: 'This automatically updates the boss’s view.', th: 'สิ่งนี้จะอัปเดตมุมมองของเจ้านายโดยอัตโนมัติ' },
  'pain_mode_on': { en: 'Pain Mode ON', th: 'โหมดเจ็บปวดเปิดอยู่' },
  'pain_mode_banner_message': { en: 'Boss is in pain today. Prioritize wellness + quiet.', th: 'วันนี้เจ้านายกำลังเจ็บปวด โปรดให้ความสำคัญกับสุขภาพและความเงียบสงบ' },
  'view_edit_history': { en: 'View Edit History', th: 'ดูประวัติการแก้ไข' },
  'history': { en: 'History', th: 'ประวัติ' },
  'history_description': { en: 'Review changes made to this section.', th: 'ตรวจสอบการเปลี่ยนแปลงที่ทำในส่วนนี้' },
  'no_history_yet': { en: 'No history yet.', th: 'ยังไม่มีประวัติ' },
  'close': { en: 'Close', th: 'ปิด' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getDailyMotivationalPhrase: () => string;
  getAssistantDashboardTip: (tab: string) => string;
  getNotePrompt: (role: Role) => string;
  getQuickMoodLabels: () => string[];
  getDailyCheckinPrompt: (role: Role) => string;
  getWinOfTheDayExamples: () => string[];
  getPrivateMessageExamples: () => string[];
  getBonusTrackerText: (key: 'current' | 'status') => string;
  getLanguageToggleTip: () => string;
  getLogoutMessage: () => string;
  getFooterText: () => string;
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
    if (typeof value !== 'string') {
      console.warn(`Translation for key '${key}' is not a string, but t() expects a string.`);
      return key; // Return key or a generic message for misuse
    }
    return value;
  };

  const getDailyMotivationalPhrase = (): string => {
    const phrases = translations['motivational_messages'][language];
    if (!Array.isArray(phrases)) {
      console.error("Motivational messages are not an array as expected.");
      return "Error: Motivational phrase not found.";
    }
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return phrases[dayOfYear % phrases.length];
  };

  const getAssistantDashboardTip = (tab: string): string => {
    const tips = translations['assistant_dashboard_tips'][language];
    if (typeof tips !== 'object' || Array.isArray(tips) || !(tab in tips)) {
      console.error(`Assistant dashboard tip for tab '${tab}' not found or not an object.`);
      return `Tip for ${tab} not found.`;
    }
    return tips[tab];
  };

  const getNotePrompt = (role: Role): string => {
    const prompts = translations[`${role}_note_prompts`][language];
    if (!Array.isArray(prompts)) {
      console.error(`Note prompts for role '${role}' are not an array as expected.`);
      return "Add a note...";
    }
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };

  const getQuickMoodLabels = (): string[] => {
    const labels = translations['quick_mood_labels'][language];
    if (!Array.isArray(labels)) {
      console.error("Quick mood labels are not an array as expected.");
      return [];
    }
    return labels;
  };

  const getDailyCheckinPrompt = (role: Role): string => {
    const prompts = translations['daily_checkin_prompt'][language];
    if (typeof prompts !== 'object' || Array.isArray(prompts) || !(role in prompts)) {
      console.error(`Daily check-in prompt for role '${role}' not found or not an object.`);
      return "Daily check-in prompt not found.";
    }
    return prompts[role];
  };

  const getWinOfTheDayExamples = (): string[] => {
    const examples = translations['win_of_the_day_examples'][language];
    if (!Array.isArray(examples)) {
      console.error("Win of the day examples are not an array as expected.");
      return [];
    }
    return examples;
  };

  const getPrivateMessageExamples = (): string[] => {
    const examples = translations['private_message_examples'][language];
    if (!Array.isArray(examples)) {
      console.error("Private message examples are not an array as expected.");
      return [];
    }
    return examples;
  };

  const getBonusTrackerText = (key: 'current' | 'status'): string => {
    const text = translations['bonus_tracker_text'][language];
    if (typeof text !== 'object' || Array.isArray(text) || !(key in text)) {
      console.error(`Bonus tracker text for key '${key}' not found or not an object.`);
      return `Bonus text for ${key} not found.`;
    }
    return text[key];
  };

  const getLanguageToggleTip = (): string => t('language_toggle_tip');
  const getLogoutMessage = (): string => t('logout_message');
  const getFooterText = (): string => t('footer_text');

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      getDailyMotivationalPhrase,
      getAssistantDashboardTip,
      getNotePrompt,
      getQuickMoodLabels,
      getDailyCheckinPrompt,
      getWinOfTheDayExamples,
      getPrivateMessageExamples,
      getBonusTrackerText,
      getLanguageToggleTip,
      getLogoutMessage,
      getFooterText
    }}>
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