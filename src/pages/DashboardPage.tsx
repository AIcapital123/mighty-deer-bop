import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { MadeWithDyad } from '@/components/made-with-dyad';
import {
  Calendar, Phone, ShoppingCart, Heart, Utensils,
  Brush, TrendingUp, DollarSign, Brain
} from 'lucide-react';
import { Note, Role, NoteStatus } from '@/types/app';
import { showSuccess } from '@/utils/toast';
import { toast } from 'sonner';
import ProfileGreeting from '@/components/ProfileGreeting';
import PainModeBanner from '@/components/PainModeBanner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

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
  const { language, setLanguage, t, getDailyMotivationalPhrase } = useLanguage();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [activeTab, setActiveTab] = useState<string>('appointments');
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [isPainMode, setIsPainMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state && location.state.selectedRole) {
      setSelectedRole(location.state.selectedRole);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const fetchNotes = useCallback(async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      toast.error('Failed to load notes.');
    } else if (data) {
      setAllNotes(data);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (!selectedRole) return;

    const channel = supabase
      .channel(`dashboard-notes-${selectedRole}-${Date.now()}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notes' },
        (payload) => {
          fetchNotes(); 

          const newRecord = payload.new as Note;
          const oldRecord = payload.old as Note;

          if (payload.eventType === 'INSERT') {
            if (newRecord.added_by !== selectedRole) {
              toast.info(`${t('new_note_from')} ${t(newRecord.added_by)}`, {
                description: `"${newRecord.content.substring(0, 50)}..."`,
              });
            }
          } else if (payload.eventType === 'UPDATE') {
            if (newRecord.status !== oldRecord.status && newRecord.added_by === selectedRole) {
              toast.success(t('note_status_updated'), {
                description: `"${newRecord.content.substring(0, 30)}..." is now ${t(newRecord.status || '')}`,
              });
            }
          }
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          toast.error('Connection error. Real-time updates may not work.');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedRole, t, fetchNotes]);

  if (!selectedRole) {
    return null;
  }

  const handleLanguageToggle = (checked: boolean) => {
    setLanguage(checked ? 'th' : 'en');
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAddNote = async (tabId: string, content: string, role: Role) => {
    const { error } = await supabase
      .from('notes')
      .insert([{ content, added_by: role, tab_id: tabId, status: 'Pending' }]);

    if (error) {
      console.error('Error adding note:', error);
      toast.error('Failed to add note.');
    } else {
      showSuccess(t('note_added_successfully'));
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    const { error } = await supabase
      .from('notes')
      .update({ is_deleted: true })
      .eq('id', noteId);

    if (error) {
      toast.error('Failed to delete note.');
    } else {
      toast.success('Note moved to history.');
    }
  };

  const handleUpdateNoteStatus = async (noteId: number, status: NoteStatus) => {
    const { error } = await supabase
      .from('notes')
      .update({ status })
      .eq('id', noteId);

    if (error) {
      toast.error('Failed to update note status.');
    } else {
      toast.success('Note status updated.');
    }
  };

  const tabs = [
    { id: 'appointments', label: t('appointments'), icon: Calendar, component: AppointmentsTab, roles: ['boss', 'assistant'], colorClass: 'text-blue-600 dark:text-blue-400' },
    { id: 'calls', label: t('calls'), icon: Phone, component: CallsTab, roles: ['boss', 'assistant'], colorClass: 'text-purple-600 dark:text-purple-400' },
    { id: 'shopping', label: t('shopping'), icon: ShoppingCart, component: ShoppingTab, roles: ['boss', 'assistant'], colorClass: 'text-green-600 dark:text-green-400' },
    { id: 'health', label: t('health'), icon: Heart, component: HealthTab, roles: ['boss', 'assistant'], colorClass: 'text-red-600 dark:text-red-400' },
    { id: 'food', label: t('food'), icon: Utensils, component: FoodTab, roles: ['boss', 'assistant'], colorClass: 'text-yellow-600 dark:text-yellow-400' },
    { id: 'cleaning', label: t('cleaning'), icon: Brush, component: CleaningTab, roles: ['boss', 'assistant'], colorClass: 'text-indigo-600 dark:text-indigo-400' },
    { id: 'productivity', label: t('productivity'), icon: TrendingUp, component: ProductivityTab, roles: ['boss', 'assistant'], colorClass: 'text-orange-600 dark:text-orange-400' },
    { id: 'salary_logs', label: t('salary_logs'), icon: DollarSign, component: SalaryLogsTab, roles: ['boss', 'assistant'], colorClass: 'text-teal-600 dark:text-teal-400' },
  ];

  const filteredTabs = tabs.filter(tab => tab.roles.includes(selectedRole));
  const urgentTabs = ['health', 'food', 'cleaning', 'productivity'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <div className="sticky top-0 z-50 bg-gray-50 dark:bg-gray-950 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <ProfileGreeting role={selectedRole} />
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {selectedRole === 'assistant' && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="pain-mode-toggle" className="text-gray-700 dark:text-gray-200 flex items-center space-x-1">
                  <Brain className="h-4 w-4" />
                  <span>{t('pain_mode_on')}</span>
                </Label>
                <Switch
                  id="pain-mode-toggle"
                  checked={isPainMode}
                  onCheckedChange={setIsPainMode}
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Label htmlFor="language-toggle" className="text-gray-700 dark:text-gray-200">{t('english')}</Label>
              <Switch
                id="language-toggle"
                checked={language === 'th'}
                onCheckedChange={handleLanguageToggle}
              />
              <Label htmlFor="language-toggle" className="text-gray-700 dark:text-gray-200">{t('thai')}</Label>
            </div>
          </div>
        </div>
        {isPainMode && selectedRole === 'assistant' && <PainModeBanner />}
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto flex-wrap">
          {filteredTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "flex-grow flex items-center justify-center space-x-2 text-lg",
                tab.colorClass,
                isPainMode && selectedRole === 'assistant' && !urgentTabs.includes(tab.id) && "opacity-50 grayscale",
                isPainMode && selectedRole === 'assistant' && urgentTabs.includes(tab.id) && "ring-2 ring-red-500 dark:ring-red-400"
              )}
            >
              {tab.icon && React.createElement(tab.icon, { className: "h-5 w-5" })}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <div ref={contentRef} className="scroll-mt-4">
          {filteredTabs.map((tab) => {
            const TabComponent = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id} className="mt-4">
                <TabComponent
                  role={selectedRole}
                  notes={allNotes.filter(note => note.tab_id === tab.id)}
                  onAddNote={(content: string) => handleAddNote(tab.id, content, selectedRole)}
                  onDeleteNote={handleDeleteNote}
                  onUpdateNoteStatus={handleUpdateNoteStatus}
                  tabId={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  colorClass={tab.colorClass}
                />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>

      {selectedRole === 'assistant' && (
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center shadow-md">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            {getDailyMotivationalPhrase()}
          </p>
        </div>
      )}

      <MadeWithDyad />
    </div>
  );
};

export default DashboardPage;