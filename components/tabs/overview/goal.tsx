import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Goal() {
  return (
    <section>
      <Card className="p-6">
        <h3 className="text-sm">Goal</h3>
        <Separator/>
        <p>
          My current goal is to complete a master&apos;s degree in Advanced Software Engineering.
        </p>
      </Card>
    </section>
  );
}
