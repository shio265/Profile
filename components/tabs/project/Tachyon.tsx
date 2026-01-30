export default function Tachyon() {
  const backgroundImage = '/projects/tachyon.png';
  const projectLink = 'https://github.com/shio265/tachyon';

  return (
    <a 
      href={projectLink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-lg overflow-hidden min-h-50 p-6 flex flex-col justify-end transition-transform hover:scale-[1.02] cursor-pointer"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: backgroundImage ? undefined : 'hsl(var(--card))'
      }}
    >
      <div className="absolute inset-0 bg-black/80 transition-opacity hover:bg-black/90"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2">Tachyon</h3>
        <p className="text-muted-foreground text-sm">
          Lightweight Node Express + GraphQL API server for game redeem code archive.
        </p>
      </div>
    </a>
  );
}