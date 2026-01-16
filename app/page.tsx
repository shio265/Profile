'use client';

// import { Badge } from '@/components/ui/badge';
import ProfileTabs from '@/components/tab';
import Banner from '@/components/banner';

export default function Main() {
  return (
    <div className="bg-background min-h-screen">
      <Banner />
      
      {/* Tabs Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto py-8">
            <ProfileTabs tabs={[
              {
                value: 'overview',
                title: 'Overview',
                card: {
                  title: 'Overview',
                  description: 'Get to know more about me and my background.',
                  content: 'Oops! this page not ready yet.',
                },
              },
              {
                value: 'skill',
                title: 'Skill',
                card: {
                  title: 'Skills',
                  description: 'Technologies and tools I work with.',
                  content: 'Nothing to see here yet.',
                },
              },
              {
                value: 'project',
                title: 'Project',
                card: {
                  title: 'Projects',
                  description: 'My work and contributions.',
                  content: 'Nothing to see here yet.',
                },
              },
              {
                value: 'certification',
                title: 'Certification',
                card: {
                  title: 'Certifications',
                  description: 'My professional certifications.',
                  content: 'Nothing to see here yet.',
                },
              }
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
}