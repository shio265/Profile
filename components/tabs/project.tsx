import Tachyon from './project/Tachyon';
import Profile from './project/Profile';

export default function Project() {
  return (
    <div className="columns-1 md:columns-2 gap-4 space-y-4">
      <div className="break-inside-avoid">
        <Tachyon />
      </div>
      <div className="break-inside-avoid">
        <Profile />
      </div>
    </div>  
  );
}