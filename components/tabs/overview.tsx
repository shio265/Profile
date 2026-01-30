import Intro from './overview/intro';
import CurrentStatus from './overview/current-status';
import CoreSkills from './overview/core-skills';
import Goal from './overview/goal';

export default function Overview() {
  return (
    <div className="columns-1 md:columns-2 gap-4 space-y-4">
      <div className="break-inside-avoid">
        <Intro />
      </div>
      <div className="break-inside-avoid">
        <CurrentStatus />
      </div>
      <div className="break-inside-avoid">
        <CoreSkills />
      </div>
      <div className="break-inside-avoid">
        <Goal />
      </div>
    </div>
  );
}
