import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CurrentStatus() {
  return (
    <section>
      <Card className="p-6">
        <h3 className="text-sm">Current Status</h3>
        <Separator/>
        <p className="text-muted-foreground">
          Interning part-time at a small data center, and I do freelance work on the side.
        </p>
      </Card>
    </section>
  );
}
