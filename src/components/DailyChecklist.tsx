import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils'; // For conditional class names

type TaskStatus = 'done' | 'in-progress' | 'missed';

interface Task {
  id: string;
  content: string;
  status: TaskStatus;
}

const DailyChecklist: React.FC = () => {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', content: t('prepare_morning_coffee'), status: 'in-progress' },
    { id: '2', content: t('organize_desk'), status: 'done' },
    { id: '3', content: t('check_emails'), status: 'missed' },
  ]);
  const [newTaskContent, setNewTaskContent] = useState('');

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), content: newTaskContent.trim(), status: 'in-progress' }]);
      setNewTaskContent('');
    }
  };

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('todays_top_tasks')}</h3>
      <div className="flex space-x-2">
        <Input
          placeholder={t('add_new_task')}
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleAddTask}>{t('add_task')}</Button>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
            <Label className="flex items-center space-x-2 flex-grow">
              <Checkbox
                checked={task.status === 'done'}
                onCheckedChange={(checked) => handleStatusChange(task.id, checked ? 'done' : 'in-progress')}
                className="mr-2"
              />
              <span className={cn(
                "text-gray-700 dark:text-gray-200",
                task.status === 'done' && "line-through text-gray-500 dark:text-gray-400",
                task.status === 'missed' && "text-red-500 dark:text-red-400"
              )}>
                {task.content}
              </span>
            </Label>
            <Select value={task.status} onValueChange={(value: TaskStatus) => handleStatusChange(task.id, value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t('status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="done">{t('done')}</SelectItem>
                <SelectItem value="in-progress">{t('in_progress')}</SelectItem>
                <SelectItem value="missed">{t('missed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('task_update_note')}
      </p>
    </div>
  );
};

export default DailyChecklist;