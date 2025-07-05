import React, { useState, useEffect } from 'react';
import { Role, Compensation } from '@/types/app';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SalaryTabProps {
  role: Role;
}

const SalaryTab: React.FC<SalaryTabProps> = ({ role }) => {
  const { t } = useLanguage();
  const [compensation, setCompensation] = useState<Compensation | null>(null);
  const [newBonus, setNewBonus] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompensation = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('compensation')
        .select('*')
        .eq('role', 'assistant')
        .single();

      if (error) {
        toast.error('Failed to load salary data.');
        console.error(error);
      } else {
        setCompensation(data);
        setNewBonus(data.bonus);
      }
      setIsLoading(false);
    };

    fetchCompensation();
  }, []);

  const handleUpdateBonus = async () => {
    if (compensation) {
      const { error } = await supabase
        .from('compensation')
        .update({ bonus: newBonus })
        .eq('id', compensation.id);

      if (error) {
        toast.error('Failed to update bonus.');
      } else {
        setCompensation({ ...compensation, bonus: newBonus });
        toast.success(t('bonus_updated'));
      }
    }
  };

  if (isLoading) {
    return <p>Loading salary details...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{role === 'assistant' ? t('my_salary_overview') : t('assistant_compensation')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">{t('monthly_base_salary')}</p>
          <p className="text-2xl font-bold">฿30,000</p>
        </div>
        <div>
          <p className="font-medium">{t('bonus_this_month')}</p>
          <p className="text-2xl font-bold text-green-600">฿{compensation?.bonus || 0}</p>
        </div>
        {role === 'boss' ? (
          <div className="space-y-2 pt-4 border-t">
            <label htmlFor="bonus-amount" className="font-medium">{t('update_bonus_amount')}</label>
            <div className="flex items-center space-x-2">
              <Input
                id="bonus-amount"
                type="number"
                value={newBonus}
                onChange={(e) => setNewBonus(Number(e.target.value))}
                className="max-w-xs"
              />
              <Button onClick={handleUpdateBonus}>{t('save_bonus')}</Button>
            </div>
          </div>
        ) : (
          <CardDescription>{t('bonus_description')}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default SalaryTab;