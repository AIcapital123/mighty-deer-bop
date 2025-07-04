import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserRound } from 'lucide-react'; // Import a generic user icon

interface RoleSelectorProps {
  onRoleSelect: (role: 'boss' | 'assistant') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const { language, setLanguage, t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<'boss' | 'assistant' | null>(null);

  // Define image paths for the avatars
  const bossAvatar = '/avatars/IMG_5529.PNG';
  const assistantAvatar = '/avatars/IMG_5528.JPG';

  const handleSelect = (value: string) => {
    setSelectedRole(value as 'boss' | 'assistant');
  };

  const handleSubmit = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  const handleLanguageToggle = (checked: boolean) => {
    setLanguage(checked ? 'th' : 'en');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-4">
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
        <Label htmlFor="language-toggle-home" className="text-gray-700 dark:text-gray-200">{t('english')}</Label>
        <Switch
          id="language-toggle-home"
          checked={language === 'th'}
          onCheckedChange={handleLanguageToggle}
        />
        <Label htmlFor="language-toggle-home" className="text-gray-700 dark:text-gray-200">{t('thai')}</Label>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center z-10 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">{t('app_name')}</h1>
        <p className="text-md mb-6 text-gray-600 dark:text-gray-300">{t('app_description')}</p>
        <h2 className="text-xl mb-6 text-gray-700 dark:text-gray-200">{t('select_your_role')}</h2>

        <RadioGroup onValueChange={handleSelect} className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="boss" id="r1" />
            <Label htmlFor="r1" className="text-lg text-gray-700 dark:text-gray-200 flex items-center">
              <UserRound className="h-5 w-5 mr-2" /> {t('i_am_the_boss')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="assistant" id="r2" />
            <Label htmlFor="r2" className="text-lg text-gray-700 dark:text-gray-200 flex items-center">
              <UserRound className="h-5 w-5 mr-2" /> {t('i_am_the_assistant')}
            </Label>
          </div>
        </RadioGroup>

        {/* Avatars section - visible once a role is selected */}
        {selectedRole && (
          <div className="mt-6 mb-6 flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <img
                src={bossAvatar}
                alt="Boss Avatar"
                className={`w-24 h-24 rounded-full object-cover transition-all duration-300 ${
                  selectedRole === 'boss' ? 'border-4 border-blue-500 shadow-lg' : 'border-4 border-transparent opacity-50'
                }`}
              />
              <p className={`mt-2 text-sm font-medium ${selectedRole === 'boss' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {t('boss')}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={assistantAvatar}
                alt="Assistant Avatar"
                className={`w-24 h-24 rounded-full object-cover transition-all duration-300 ${
                  selectedRole === 'assistant' ? 'border-4 border-blue-500 shadow-lg' : 'border-4 border-transparent opacity-50'
                }`}
              />
              <p className={`mt-2 text-sm font-medium ${selectedRole === 'assistant' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {t('assistant')}
              </p>
            </div>
          </div>
        )}

        <Button onClick={handleSubmit} disabled={!selectedRole} className="w-full py-3 text-lg">
          {selectedRole ? t(selectedRole) : t('select_a_role_to_continue')}
        </Button>
      </div>
    </div>
  );
};

export default RoleSelector;