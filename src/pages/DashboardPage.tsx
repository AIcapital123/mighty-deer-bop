import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { MadeWithDyad } from '@/components/made-with-dyad';
import {
  Calendar, Phone, ShoppingCart, Heart, Utensils,
  Brush, TrendingUp, DollarSign
} from 'lucide-react';

// Placeholder components for each tab
import AppointmentsTab from '@/pages/tabs/AppointmentsTab';
import CallsTab from '@/pages/tabs/CallsTab';
import ShoppingTab from '@/pages/tabs/ShoppingTab';
import HealthTab from '@/pages/tabs/HealthTab';
import FoodTab from '@/pages/tabs/FoodTab';
import CleaningTab from '@/pages/tabs/CleaningTab';
import ProductivityTab from '@/pages/tabs/ProductivityTab';
import SalaryLogsTab from '@/pages/tabs/SalaryLogsTab';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const [selectedRole, setSelectedRole] = useState<'boss' | 'assistant' | null>(null);
  const [activeTab, setActiveTab] = useState<string>('appointments'); // Default tab

  useEffect(() => {
    if (location.state && location.state.selectedRole) {
      setSelectedRole(location.state.selectedRole);
    } else {
      // If no role is selected, redirect back to the role selection page
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!selectedRole) {
    return null; // Or a loading spinner
  }

  const handleLanguageToggle = (checked: boolean) => {
    setLanguage(checked ? 'th' : 'en');
  };

  const tabs = [
    { id: 'appointments', label: t('appointments'), icon: Calendar, component: AppointmentsTab, roles: ['boss', 'assistant'] },
    { id: 'calls', label: t('calls'), icon: Phone, component: CallsTab, roles: ['boss', 'assistant'] },
    { id: 'shopping', label: t('shopping'), icon: ShoppingCart, component: ShoppingTab, roles: ['boss', 'assistant'] },
    { id: 'health', label: t('health'), icon: Heart, component: HealthTab, roles: ['boss', 'assistant'] },
    { id: 'food', label: t('food'), icon: Utensils, component: FoodTab, roles: ['boss', 'assistant'] },
    { id: 'cleaning', label: t('cleaning'), icon: Brush, component: CleaningTab, roles: ['boss', 'assistant'] },
    { id: 'productivity', label: t('productivity'), icon: TrendingUp, component: ProductivityTab, roles: ['boss', 'assistant'] },
    { id: 'salary_logs', label: t('salary_logs'), icon: DollarSign, component: SalaryLogsTab, roles: ['assistant'] }, // Assistant View Only
  ];

  const filteredTabs = tabs.filter(tab => tab.roles.includes(selectedRole));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          BossCare - {selectedRole === 'boss' ? t('boss') : t('assistant')} Dashboard
        </h1>
        <div className="flex items-center space-x-2">
          <Label htmlFor="language-toggle">{t('english')}</Label>
          <Switch
            id="language-toggle"
            checked={language === 'th'}
            onCheckedChange={handleLanguageToggle}
          />
          <Label htmlFor="language-toggle">{t('thai')}</Label>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto flex-wrap">
          {filteredTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex-grow flex items-center justify-center space-x-2">
              {tab.icon && React.createElement(tab.icon, { className: "h-4 w-4" })}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {filteredTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-4">
            {React.createElement(tab.component, { role: selectedRole })}
          </TabsContent>
        ))}
      </Tabs>
      <MadeWithDyad />
    </div>
  );
};

export default DashboardPage;