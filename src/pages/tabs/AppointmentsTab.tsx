import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TabProps {
  role: 'boss' | 'assistant';
}

const AppointmentsTab: React.FC<TabProps> = ({ role }) => {
  const { t } = useLanguage();
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">{t('appointments')}</h2>
      <p className="text-gray-700 dark:text-gray-300">
        {role === 'boss' ? 'Boss view for Appointments.' : 'Assistant view for Appointments.'}
      </p>
      {/* Future content for Appointments */}
    </div>
  );
};

export default AppointmentsTab;