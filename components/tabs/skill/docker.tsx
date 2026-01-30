import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Docker() {
  return (
    <section>
      <Card className="p-6">
        <h3 className="text-sm">Docker</h3>
        <Separator/>
        <p>
            I can using Docker to containerize applications and create consistent development and deployment environments. I am familiar with writing Dockerfiles, using docker-compose, and managing multi-container setups for web and backend services.
        </p>   
      </Card>
    </section>
  );
}
