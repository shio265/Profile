import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function dotNET() {
  return (
    <section>
      <Card className="p-6">
        <h3 className="text-sm">.NET</h3>
        <Separator/>
        <p>
            Although my major specializes in .NET, I am not very comfortable with it. However, I can use it to build web applications with ASP.NET Core.
        </p>
      </Card>
    </section>
  );
}