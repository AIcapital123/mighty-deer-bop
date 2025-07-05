import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const DailyChecklist: React.FC = () => {
  const tasks = [
    "Prepare quiet work area",
    "Handle food and water",
    "Check appointments",
    "Minimize distractions"
  ];

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Today's Focus</h3>
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Checkbox id={`task-${index}`} />
          <Label htmlFor={`task-${index}`}>{task}</Label>
        </div>
      ))}
    </div>
  );
};

export default DailyChecklist;