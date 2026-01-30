import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Nodejs() {
    return (
        <section>
            <Card className="p-6">
                <h3 className="text-sm">Node.js</h3>
                <Separator/>
                <p>
                    Can using Node.js for developing server-side applications, including Express.js, RESTful APIs, and real-time applications with WebSockets.
                </p>
            </Card>
        </section>
    );
}