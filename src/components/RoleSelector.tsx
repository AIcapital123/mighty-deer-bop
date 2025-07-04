import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";

interface RoleSelectorProps {
  onRoleSelect: (role: 'boss' | 'assistant') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const { language, setLanguage, t } = useLanguage();
  const [selectedRole, setSelectedRole] = React.useState<'boss' | 'assistant' | null>(null);

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
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center z-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">{t('app_name')}</h1>
        <p className="text-md mb-6 text-gray-600 dark:text-gray-300">{t('app_description')}</p>
        <h2 className="text-xl mb-6 text-gray-700 dark:text-gray-200">{t('select_your_role')}</h2>
        <RadioGroup onValueChange={handleSelect} className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="boss" id="r1" />
            <Label htmlFor="r1" className="text-lg text-gray-700 dark:text-gray-200">{t('i_am_the_boss')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="assistant" id="r2" />
            <Label htmlFor="r2" className="text-lg text-gray-700 dark:text-gray-200">{t('i_am_the_assistant')}</Label>
          </div>
        </RadioGroup>
        <Button onClick={handleSubmit} disabled={!selectedRole} className="w-full py-3 text-lg">
          {selectedRole ? t(selectedRole) : t('select_a_role_to_continue')}
        </Button>
      </div>
    </div>
  );
};

export default RoleSelector;