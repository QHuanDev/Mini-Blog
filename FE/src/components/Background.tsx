
import {
  Code,
  Terminal,
  Database,
  Cloud,
  Layers,
  Server,
  GitBranch,
  Cpu,
  Globe,
  Boxes,
  Monitor,
  Wifi,
  Lock,
  Hash,
  Command,
} from "lucide-react";
export interface IconConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  IconComponent: React.ElementType;
}
// Hardcoded configurations for deterministic rendering (fixed background)
// This avoids random functions and ensures smooth, consistent placement.
const STATIC_ICONS: IconConfig[] = [
  { id: 1, IconComponent: Code, x: 5, y: 10, size: 30, duration: 12, delay: 0 },
  {
    id: 2,
    IconComponent: Terminal,
    x: 25,
    y: 15,
    size: 24,
    duration: 15,
    delay: 2,
  },
  {
    id: 3,
    IconComponent: Database,
    x: 50,
    y: 5,
    size: 35,
    duration: 18,
    delay: 1,
  },
  {
    id: 4,
    IconComponent: Cloud,
    x: 80,
    y: 12,
    size: 40,
    duration: 20,
    delay: 3,
  },
  {
    id: 5,
    IconComponent: Layers,
    x: 10,
    y: 35,
    size: 28,
    duration: 14,
    delay: 5,
  },
  {
    id: 6,
    IconComponent: Server,
    x: 85,
    y: 30,
    size: 32,
    duration: 16,
    delay: 4,
  },
  {
    id: 7,
    IconComponent: GitBranch,
    x: 15,
    y: 60,
    size: 25,
    duration: 13,
    delay: 2,
  },
  { id: 8, IconComponent: Cpu, x: 75, y: 55, size: 38, duration: 19, delay: 6 },
  {
    id: 9,
    IconComponent: Globe,
    x: 40,
    y: 75,
    size: 30,
    duration: 17,
    delay: 0,
  },
  {
    id: 10,
    IconComponent: Boxes,
    x: 90,
    y: 80,
    size: 26,
    duration: 15,
    delay: 1,
  },
  {
    id: 11,
    IconComponent: Monitor,
    x: 5,
    y: 85,
    size: 34,
    duration: 14,
    delay: 3,
  },
  {
    id: 12,
    IconComponent: Wifi,
    x: 60,
    y: 20,
    size: 22,
    duration: 16,
    delay: 5,
  },
  {
    id: 13,
    IconComponent: Lock,
    x: 30,
    y: 45,
    size: 28,
    duration: 18,
    delay: 2,
  },
  {
    id: 14,
    IconComponent: Hash,
    x: 65,
    y: 90,
    size: 30,
    duration: 13,
    delay: 4,
  },
  {
    id: 15,
    IconComponent: Command,
    x: 55,
    y: 40,
    size: 24,
    duration: 15,
    delay: 1,
  },
];

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-linear-to-br from-black via-slate-950 to-slate-900">
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(30,41,59,0.3),transparent_50%)]" />

      {
        STATIC_ICONS.map((config) => (
          <div
            key={config.id}
            className="absolute text-slate-700/40 animate-float"
            style={{
              left: `${config.x}%`,
              top: `${config.y}%`,
              animationDuration: `${config.duration}s`,
              animationDelay: `${config.delay}s`,
            }}
          >
            <config.IconComponent size={config.size} strokeWidth={1.5} />
          </div>
        ))}
    </div>
  );
};

export default Background;
