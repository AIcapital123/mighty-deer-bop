import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Role } from '@/types/app';

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

  const name = role === 'boss' ? 'Chris' : 'Ann';
  const avatarSrc = role === 'boss' ? '/avatars/IMG_5529.PNG' : '/avatars/IMG_5528.JPG';

  return (
    <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
      <img
        src={avatarSrc}
        alt={`${name}'s avatar`}
        className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400"
      />
      <span className="text-lg font-medium">{greeting}, {name}!</span>
    </div>
  );
};

export default ProfileGreeting;