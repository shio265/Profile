import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Nextjs() {
    return (
        <section>
            <Card className="p-6">
                <h3 className="text-sm">React + Next.js</h3>
                <Separator/>
                <p>
                    I can using Next.js for developing React-based web applications, including App Router, Static Site Generation (SSG), API Routes, and middleware.
                </p>
            </Card>
        </section>
    );
}