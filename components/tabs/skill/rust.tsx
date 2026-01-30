import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Rust() {
  return (
    <section>
      <Card className="p-6">
        <h3 className="text-sm">Rust</h3>
        <Separator/>
        <p>
            Although Rust is one of the languages I want to master, my current proficiency is limited to building basic database migrators and scheduled jobs.
        </p>   
      </Card>
    </section>
  );
}
