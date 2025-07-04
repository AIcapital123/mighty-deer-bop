import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TabProps {
  role: 'boss' | 'assistant';
}

const SalaryLogsTab: React.FC<TabProps> = ({ role }) => {
  const { t } = useLanguage();
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">{t('salary_logs')}</h2>
      {role === 'assistant' ? (
        <p className="text-gray-700 dark:text-gray-300">Assistant view for Salary & Logs.</p>
      ) : (
        <p className="text-red-500 dark:text-red-400">This tab is only visible to the Boss.</p>
      )}
      {/* Future content for Salary & Logs */}
    </div>
  );
};

export default SalaryLogsTab;