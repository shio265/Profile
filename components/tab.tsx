import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue={tabs[0].value} className="w-full">
        <TabsList className="w-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <Card className="shadow-none py-0">
          <TabsContents className="py-6">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="flex flex-col gap-6">
                <CardHeader>
                  <CardTitle>{tab.card.title}</CardTitle>
                  <CardDescription>{tab.card.description}</CardDescription>
                </CardHeader>
                <CardContent>{tab.card.content}</CardContent>
              </TabsContent>
            ))}
          </TabsContents>
        </Card>
      </Tabs>
    </div>
  );
}