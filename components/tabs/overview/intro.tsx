import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Intro() {
  return (
    <section>
      <Card className="p-6">
        <h3 className="text-sm">Intro</h3>
        <Separator/>
        <p>
            Hello, I&apos;m Shiorin. I&apos;m currently a graduate student majoring in Computer Science and Information Engineering.
        </p>
        <p>
            My research focuses on mobile applications and web development. I have a passion for creating user-friendly and efficient software solutions.
        </p>
      </Card>
    </section>
  );
}
