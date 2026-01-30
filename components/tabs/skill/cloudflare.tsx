import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Cloudflare() {
    return (
        <section>
            <Card className="p-6">
                <h3 className="text-sm">Cloudflare</h3>
                <Separator/>
                <p>
                    Experience working with Cloudflare (DNS, CDN, SSL), WAF, and Zero Trust to secure and optimize web applications.
                </p>   
            </Card>
        </section>
    );
}