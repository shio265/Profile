'use client';

import { useEffect, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs';

interface TabData {
  value: string;
  title: string;
  card: {
    title: string;
    description: string;
    content: React.ReactNode;
  };
}

interface TabComponentProps {
  tabs: TabData[];
}

export default function TabComponent({ tabs }: TabComponentProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('changeTab', handleTabChange as EventListener);

    return () => {
      window.removeEventListener('changeTab', handleTabChange as EventListener);
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContents className="py-6">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div>{tab.card.content}</div>
            </TabsContent>
          ))}
        </TabsContents>
      </Tabs>
    </div>
  );
}