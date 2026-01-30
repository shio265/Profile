import JavaScript from './skill/javascript';
import Rust from './skill/rust';
import DotNET from './skill/dotNET'
import Docker from './skill/docker';
import Cloudflare from './skill/cloudflare';
import Nextjs from './skill/next';
import Electron from './skill/electron';
import Git from './skill/git';
import Nodejs from './skill/node';

export default function Skill() {
  return (
    <div className="columns-1 md:columns-2 gap-4 space-y-4">
     <div className="break-inside-avoid">
        <JavaScript/>
      </div>
      <div className="break-inside-avoid">
        <Rust/>
      </div>
      <div className="break-inside-avoid">
        <DotNET/>
      </div>
      <div className="break-inside-avoid">
        <Electron/>
      </div>
      <div className="break-inside-avoid">
        <Nextjs/>
      </div>
      <div className="break-inside-avoid">
        <Cloudflare/>
      </div>
      <div className="break-inside-avoid">
        <Docker/>
      </div>
      <div className="break-inside-avoid">
        <Git/>
      </div>
      <div className="break-inside-avoid">
        <Nodejs/>   
      </div>
    </div>  
  );
}

