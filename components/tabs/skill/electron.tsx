import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Electron() {
    return (
        <section>
            <Card className="p-6">
                <h3 className="text-sm">Electron</h3>
                <Separator/>
                <p>
                    I can using React together with Electron to build cross-platform desktop applications. I am familiar with setting up the Electron environment, managing inter-process communication (IPC), and packaging applications for distribution.
                </p>
            </Card>
        </section>
    );
}