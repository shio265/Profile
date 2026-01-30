import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CoreSkills() {
  return (
    <section>
      <Card className="p-6">
        <h3 className="text-sm">Core Skills</h3>
        <Separator/>
        <p>
            I have experience working with Kotlin, Javascript, Typescipt and more.
        </p>
        <p>
            Detailed information is available in the <button onClick={() => {
              const event = new CustomEvent('changeTab', { detail: 'skill' });
              window.dispatchEvent(event);
            }} className="text-sky-400 hover:underline cursor-pointer">Skills section</button>.
        </p>
      </Card>
    </section>
  );
}
