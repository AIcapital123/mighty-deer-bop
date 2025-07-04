import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Role } from '@/types/app';
import { CircleUser } from 'lucide-react'; // Using CircleUser for a simple avatar

interface ProfileGreetingProps {
  role: Role;
}

const ProfileGreeting: React.FC<ProfileGreetingProps> = ({ role }) => {
  const { t } = useLanguage();
  const hour = new Date().getHours();
  let greeting = '';

  if (hour < 12) {
    greeting = t('good_morning');
  } else if (hour < 18) {
    greeting = t('good_afternoon');
  } else {
    greeting = t('good_evening');
  }

  const roleText = role === 'boss' ? t('boss') : t('assistant');

  return (
    <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
      <CircleUser className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      <span className="text-lg font-medium">{greeting}, {roleText}!</span>
    </div>
  );
};

export default ProfileGreeting;