import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { MadeWithDyad } from '@/components/made-with-dyad';
import { LayoutDashboard, ClipboardList, Wallet, MessageSquare, Brain } from 'lucide-react';
import { Note, Role, NoteStatus } from '@/types/app';
import { showSuccess } from '@/utils/toast';
import { toast } from 'sonner';
import ProfileGreeting from '@/components/ProfileGreeting';
import PainModeBanner from '@/components/PainModeBanner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

// New Tab Components
import NotesTab from '@/pages/tabs/NotesTab';
import SalaryTab from '@/pages/tabs/SalaryTab';
import AssistantTasksTab from '@/pages/tabs/AssistantTasksTab';
import BossOverviewTab from '@/pages/tabs/BossOverviewTab';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t, getDailyMotivationalPhrase } = useLanguage();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [activeTab, setActiveTab] = useState<string>('notes');
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [isPainMode, setIsPainMode] = useState(false);

  useEffect(() => {
    if (location.state && location.state.selectedRole) {
      const role = location.state.selectedRole;
      setSelectedRole(role);
      // Set default tab based on role
      setActiveTab(role === 'boss' ? 'overview' : 'tasks');
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
      toast.error('Failed to load notes.');
    } else if (data) {
      setAllNotes(data as Note[]);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (!selectedRole) return;

    const channel = supabase
      .channel('realtime-notes-dashboard')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notes' },
        (payload) => {
          fetchNotes();
          if (payload.eventType === 'INSERT') {
            const newNote = payload.new as Note;
            if (newNote.added_by !== selectedRole) {
              toast.info(`New note from ${t(newNote.added_by)}: "${newNote.content.substring(0, 30)}..."`);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedRole, t, fetchNotes]);

  if (!selectedRole) {
    return null;
  }

  const handleLanguageToggle = (checked: boolean) => setLanguage(checked ? 'th' : 'en');

  const handleAddNote = async (content: string, status: NoteStatus) => {
    const { error } = await supabase
      .from('notes')
      .insert([{ content, status, added_by: selectedRole, tab_id: 'Notes' }]);

    if (error) {
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

  const bossTabs = [
    { id: 'overview', label: t('overview'), icon: LayoutDashboard, component: BossOverviewTab },
    { id: 'salary', label: t('salary'), icon: Wallet, component: SalaryTab },
    { id: 'notes', label: t('notes'), icon: MessageSquare, component: NotesTab },
  ];

  const assistantTabs = [
    { id: 'tasks', label: t('tasks'), icon: ClipboardList, component: AssistantTasksTab },
    { id: 'salary', label: t('salary'), icon: Wallet, component: SalaryTab },
    { id: 'notes', label: t('notes'), icon: MessageSquare, component: NotesTab },
  ];

  const tabs = selectedRole === 'boss' ? bossTabs : assistantTabs;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <header className="sticky top-0 z-50 bg-gray-50/90 dark:bg-gray-950/90 backdrop-blur-sm pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <ProfileGreeting role={selectedRole} />
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {selectedRole === 'assistant' && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="pain-mode-toggle" className="text-gray-700 dark:text-gray-200 flex items-center space-x-1">
                  <Brain className="h-4 w-4" />
                  <span>{t('pain_mode_on')}</span>
                </Label>
                <Switch id="pain-mode-toggle" checked={isPainMode} onCheckedChange={setIsPainMode} />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Label htmlFor="language-toggle">{t('english')}</Label>
              <Switch id="language-toggle" checked={language === 'th'} onCheckedChange={handleLanguageToggle} />
              <Label htmlFor="language-toggle">{t('thai')}</Label>
            </div>
          </div>
        </div>
        {isPainMode && selectedRole === 'assistant' && <PainModeBanner />}
      </header>

      <main className="w-full mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-base">
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => {
            const TabComponent = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id} className="mt-4">
                {tab.id === 'notes' ? (
                  <NotesTab
                    role={selectedRole}
                    notes={allNotes}
                    onAddNote={handleAddNote}
                    onDeleteNote={handleDeleteNote}
                  />
                ) : (
                  <TabComponent role={selectedRole} />
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </main>

      {selectedRole === 'assistant' && (
        <footer className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center shadow-md">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            {getDailyMotivationalPhrase()}
          </p>
        </footer>
      )}

      <MadeWithDyad />
    </div>
  );
};

export default DashboardPage;