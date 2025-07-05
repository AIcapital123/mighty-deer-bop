import React from 'react';
import { cn } from '@/lib/utils';
import { NoteStatus } from '@/types/app';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatusBadgeProps {
  status: NoteStatus;
}

const colorMap: Record<NoteStatus, string> = {
  'Urgent': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'Pending': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Complete': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useLanguage();
  return (
    <span className={cn("px-2 py-1 text-xs font-medium rounded-full", colorMap[status])}>
      {t(status)}
    </span>
  );
};

export default StatusBadge;