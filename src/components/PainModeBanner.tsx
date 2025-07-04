import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain } from 'lucide-react'; // Using Brain icon for pain mode

const PainModeBanner: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg flex items-center space-x-2 shadow-md">
      <Brain className="h-6 w-6" />
      <p className="font-semibold">{t('pain_mode_banner_message')}</p>
    </div>
  );
};

export default PainModeBanner;