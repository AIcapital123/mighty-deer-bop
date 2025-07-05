import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Role } from '@/types/app';

interface BossOverviewTabProps {
  role: Role;
}

const BossOverviewTab: React.FC<BossOverviewTabProps> = ({ role }) => {
  const { t } = useLanguage();

  const tasks = [
    'check_assistant_updates',
    'log_pain_condition',
    'approve_urgent_tasks',
    'leave_note_or_motivation',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('boss_priorities_today')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((taskKey) => (
          <div key={taskKey} className="flex items-center space-x-3 p-2 rounded-md bg-gray-50 dark:bg-gray-700">
            <Checkbox id={taskKey} />
            <Label htmlFor={taskKey} className="text-base text-gray-800 dark:text-gray-200">
              {t(taskKey)}
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BossOverviewTab;