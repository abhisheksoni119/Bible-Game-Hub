import type { ReactElement, ReactNode, SVGProps } from "react";

export interface BibleScene {
  id: string;
  title: string;
  verse: string;
  ref: string;
  svg: ReactElement<SVGProps<SVGSVGElement>>;
}

const VB = "0 0 600 400";

interface SceneCfg {
  id: string;
  title: string;
  verse: string;
  ref: string;
  sky?: [string, string];
  ground?: { color: string; top?: string; height?: number; type?: "land" | "water" | "sand" | "stone" | "snow" };
  sun?: { x?: number; y?: number; r?: number; color?: string; rays?: boolean };
  moon?: { x?: number; y?: number; r?: number };
  stars?: number;
  hills?: { color: string; second?: string };
  focal: ReactNode;
}

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

function Stars({ count, seed }: { count: number; seed: number }) {
  const r = rng(seed);
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <circle
          key={i}
          cx={r() * 600}
          cy={r() * 200}
          r={r() * 1.4 + 0.6}
          fill="#fef3c7"
          opacity={0.6 + r() * 0.4}
        />
      ))}
    </>
  );
}

function Hills({ color, second }: { color: string; second?: string }) {
  return (
    <>
      <path d="M 0 320 Q 150 250 300 290 T 600 280 V 400 H 0 Z" fill={color} />
      {second && (
        <path d="M 0 350 Q 200 300 400 340 T 600 330 V 400 H 0 Z" fill={second} />
      )}
    </>
  );
}

function Ground({
  color,
  top,
  height = 80,
  type = "land",
}: NonNullable<SceneCfg["ground"]>) {
  const y = 400 - height;
  return (
    <>
      <rect x="0" y={y} width="600" height={height} fill={color} />
      {top && type === "land" && (
        <path d={`M 0 ${y} Q 150 ${y - 20} 300 ${y} T 600 ${y} V ${y + 6} H 0 Z`} fill={top} />
      )}
      {type === "water" && (
        <>
          <path d={`M 0 ${y + 10} Q 75 ${y} 150 ${y + 10} T 300 ${y + 10} T 450 ${y + 10} T 600 ${y + 10}`} stroke="#bae6fd" strokeWidth="2" fill="none" opacity="0.7" />
          <path d={`M 0 ${y + 30} Q 100 ${y + 20} 200 ${y + 30} T 400 ${y + 30} T 600 ${y + 30}`} stroke="#bae6fd" strokeWidth="2" fill="none" opacity="0.5" />
        </>
      )}
      {type === "sand" && (
        <>
          <ellipse cx="120" cy={y + 30} rx="40" ry="6" fill="#000" opacity="0.06" />
          <ellipse cx="480" cy={y + 50} rx="60" ry="8" fill="#000" opacity="0.06" />
        </>
      )}
    </>
  );
}

function Sun({
  x = 500,
  y = 90,
  r = 40,
  color = "#fde68a",
  rays = false,
}: NonNullable<SceneCfg["sun"]>) {
  return (
    <g>
      {rays &&
        Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={x + Math.cos(a) * (r + 6)}
              y1={y + Math.sin(a) * (r + 6)}
              x2={x + Math.cos(a) * (r + 18)}
              y2={y + Math.sin(a) * (r + 18)}
              stroke={color}
              strokeWidth="3"
              opacity="0.7"
              strokeLinecap="round"
            />
          );
        })}
      <circle cx={x} cy={y} r={r} fill={color} opacity="0.5" />
      <circle cx={x} cy={y} r={r * 0.7} fill={color} />
    </g>
  );
}

function Moon({ x = 500, y = 80, r = 32 }: NonNullable<SceneCfg["moon"]>) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fef9c3" />
      <circle cx={x - 8} cy={y - 4} r={r} fill="#1e1b4b" />
    </g>
  );
}

function buildScene(cfg: SceneCfg): BibleScene {
  const sky = cfg.sky ?? ["#bae6fd", "#7dd3fc"];
  const gradId = `g-${cfg.id}`;
  return {
    id: cfg.id,
    title: cfg.title,
    verse: cfg.verse,
    ref: cfg.ref,
    svg: (
      <svg viewBox={VB} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={sky[0]} />
            <stop offset="1" stopColor={sky[1]} />
          </linearGradient>
        </defs>
        <rect width="600" height="400" fill={`url(#${gradId})`} />
        {cfg.stars && <Stars count={cfg.stars} seed={cfg.id.charCodeAt(0) * 137 + cfg.id.length * 17} />}
        {cfg.moon && <Moon {...cfg.moon} />}
        {cfg.sun && <Sun {...cfg.sun} />}
        {cfg.hills && <Hills {...cfg.hills} />}
        {cfg.ground && <Ground {...cfg.ground} />}
        {cfg.focal}
      </svg>
    ),
  };
}

// Reusable focal element helpers
function Person({
  x,
  y,
  body = "#7c2d12",
  skin = "#fde68a",
  hair = "#1c1917",
  scale = 1,
}: {
  x: number;
  y: number;
  body?: string;
  skin?: string;
  hair?: string;
  scale?: number;
}): ReactNode {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="40" rx="22" ry="35" fill={body} />
      <circle cx="0" cy="0" r="14" fill={skin} />
      <path d="M -14 -3 Q 0 -20 14 -3 L 13 6 L -13 6 Z" fill={hair} />
    </g>
  );
}

function Tree({ x, y, leaves = "#15803d", trunk = "#78350f", scale = 1 }: { x: number; y: number; leaves?: string; trunk?: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-8" y="0" width="16" height="50" fill={trunk} rx="3" />
      <circle cx="0" cy="-10" r="40" fill={leaves} />
      <circle cx="-25" cy="0" r="25" fill={leaves} />
      <circle cx="25" cy="0" r="25" fill={leaves} />
    </g>
  );
}

function Cloud({ x, y, scale = 1, color = "#fff" }: { x: number; y: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.85">
      <ellipse cx="0" cy="0" rx="30" ry="14" fill={color} />
      <ellipse cx="-20" cy="4" rx="20" ry="10" fill={color} />
      <ellipse cx="22" cy="4" rx="22" ry="11" fill={color} />
    </g>
  );
}

function Mountain({ x, y, w = 200, h = 140, color = "#64748b", snow = "#f1f5f9" }: { x: number; y: number; w?: number; h?: number; color?: string; snow?: string }) {
  return (
    <g>
      <polygon points={`${x},${y} ${x + w / 2},${y - h} ${x + w},${y}`} fill={color} />
      <polygon points={`${x + w / 2 - 24},${y - h + 50} ${x + w / 2},${y - h} ${x + w / 2 + 24},${y - h + 50} ${x + w / 2 + 12},${y - h + 60} ${x + w / 2},${y - h + 50} ${x + w / 2 - 12},${y - h + 60}`} fill={snow} />
    </g>
  );
}

function Star({ x, y, r = 18, color = "#fde68a" }: { x: number; y: number; r?: number; color?: string }) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${x + Math.cos(ang) * rr},${y + Math.sin(ang) * rr}`);
  }
  return <polygon points={pts.join(" ")} fill={color} />;
}

function Tent({ x, y, color = "#a16207" }: { x: number; y: number; color?: string }) {
  return (
    <g>
      <polygon points={`${x},${y} ${x + 40},${y - 60} ${x + 80},${y}`} fill={color} />
      <path d={`M ${x + 32} ${y} L ${x + 40} ${y - 30} L ${x + 48} ${y}`} fill="#3f1d05" />
    </g>
  );
}

function Boat({ x, y, hull = "#7c2d12", sail = "#fef3c7" }: { x: number; y: number; hull?: string; sail?: string }) {
  return (
    <g>
      <path d={`M ${x} ${y} Q ${x + 60} ${y + 30} ${x + 120} ${y} L ${x + 110} ${y - 8} L ${x + 10} ${y - 8} Z`} fill={hull} />
      <line x1={x + 60} y1={y - 8} x2={x + 60} y2={y - 70} stroke="#3f1d05" strokeWidth="3" />
      <polygon points={`${x + 60},${y - 70} ${x + 95},${y - 10} ${x + 60},${y - 10}`} fill={sail} />
    </g>
  );
}

function Cross({ x, y, h = 100, color = "#78350f" }: { x: number; y: number; h?: number; color?: string }) {
  return (
    <g>
      <rect x={x - 5} y={y - h} width="10" height={h} fill={color} />
      <rect x={x - 25} y={y - h * 0.7} width="50" height="10" fill={color} />
    </g>
  );
}

// =============================================================
// SCENES (50+)
// =============================================================

const SCENE_DEFS: SceneCfg[] = [
  // ---------- OLD TESTAMENT ----------
  {
    id: "creation-light",
    title: "Creation: Let There Be Light",
    verse: "\"And God said, Let there be light: and there was light.\"",
    ref: "Genesis 1:3",
    sky: ["#020617", "#1e1b4b"],
    stars: 50,
    focal: (
      <g>
        <circle cx="300" cy="200" r="120" fill="#fef3c7" opacity="0.15" />
        <circle cx="300" cy="200" r="80" fill="#fde68a" opacity="0.4" />
        <circle cx="300" cy="200" r="40" fill="#fef9c3" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={300 + Math.cos(a) * 50}
              y1={200 + Math.sin(a) * 50}
              x2={300 + Math.cos(a) * 130}
              y2={200 + Math.sin(a) * 130}
              stroke="#fde68a"
              strokeWidth="3"
              opacity="0.5"
            />
          );
        })}
      </g>
    ),
  },
  {
    id: "creation-sea-sky",
    title: "Creation: Sea & Sky",
    verse: "\"And God called the firmament Heaven... And God called the dry land Earth.\"",
    ref: "Genesis 1:8-10",
    sky: ["#bae6fd", "#38bdf8"],
    sun: { x: 480, y: 80, r: 36, rays: true },
    ground: { color: "#1e40af", top: "#3b82f6", height: 140, type: "water" },
    focal: (
      <>
        <Cloud x={120} y={100} scale={1.2} />
        <Cloud x={350} y={70} />
        <Cloud x={500} y={140} scale={0.8} />
      </>
    ),
  },
  {
    id: "garden-eden",
    title: "Garden of Eden",
    verse: "\"And the LORD God planted a garden eastward in Eden.\"",
    ref: "Genesis 2:8",
    sky: ["#a7f3d0", "#86efac"],
    sun: { x: 500, y: 80 },
    ground: { color: "#15803d", top: "#16a34a", height: 80 },
    focal: (
      <>
        <Tree x={200} y={250} scale={1.3} />
        <Tree x={400} y={250} leaves="#22c55e" scale={1.4} />
        <g>
          <rect x="295" y="180" width="20" height="160" fill="#78350f" />
          <circle cx="305" cy="170" r="80" fill="#15803d" />
          <circle cx="305" cy="120" r="50" fill="#22c55e" />
          <circle cx="280" cy="180" r="10" fill="#dc2626" />
          <circle cx="330" cy="170" r="10" fill="#dc2626" />
          <circle cx="305" cy="140" r="10" fill="#dc2626" />
        </g>
        <path d="M 305 320 Q 280 290 305 270 Q 330 250 305 230" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="308" cy="228" r="4" fill="#15803d" />
      </>
    ),
  },
  {
    id: "tree-of-life",
    title: "The Tree of Life",
    verse: "\"And the tree of life also in the midst of the garden.\"",
    ref: "Genesis 2:9",
    sky: ["#fef3c7", "#fde68a"],
    sun: { x: 300, y: 80, r: 60, color: "#fde68a", rays: true },
    ground: { color: "#16a34a", top: "#22c55e", height: 60 },
    focal: (
      <g>
        <rect x="280" y="180" width="40" height="180" fill="#78350f" />
        <circle cx="300" cy="170" r="100" fill="#15803d" />
        <circle cx="240" cy="180" r="50" fill="#22c55e" />
        <circle cx="360" cy="180" r="50" fill="#22c55e" />
        <circle cx="300" cy="100" r="60" fill="#16a34a" />
        {[
          [270, 130], [320, 150], [350, 110], [250, 140], [330, 90], [290, 200], [340, 200],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="6" fill="#facc15" />
        ))}
      </g>
    ),
  },
  {
    id: "noahs-ark",
    title: "Noah's Ark",
    verse: "\"And God remembered Noah, and every living thing... in the ark.\"",
    ref: "Genesis 8:1",
    sky: ["#fde68a", "#fcd34d"],
    sun: { x: 120, y: 100, r: 40 },
    ground: { color: "#1e40af", top: "#3b82f6", height: 140, type: "water" },
    focal: (
      <>
        {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"].map((c, i) => (
          <path key={i} d={`M ${50 + i * 6} 250 A ${250 - i * 6} ${250 - i * 6} 0 0 1 ${550 - i * 6} 250`} stroke={c} strokeWidth="6" fill="none" opacity="0.55" />
        ))}
        <path d="M 180 280 Q 300 320 420 280 L 410 240 L 190 240 Z" fill="#92400e" />
        <rect x="200" y="180" width="200" height="60" fill="#b45309" />
        {[220, 260, 300, 340].map((x, i) => (
          <rect key={i} x={x} y="195" width="20" height="20" fill="#fde68a" />
        ))}
        <polygon points="200,180 300,140 400,180" fill="#7c2d12" />
        <g transform="translate(440 110)">
          <ellipse cx="0" cy="0" rx="18" ry="8" fill="#fff" />
          <circle cx="14" cy="-3" r="6" fill="#fff" />
          <path d="M -10 -4 Q -16 -16 -2 -10" fill="#fff" />
          <path d="M 18 -2 l 4 -1 l -4 -1 z" fill="#f59e0b" />
        </g>
      </>
    ),
  },
  {
    id: "tower-babel",
    title: "Tower of Babel",
    verse: "\"Let us build us a city and a tower, whose top may reach unto heaven.\"",
    ref: "Genesis 11:4",
    sky: ["#cbd5e1", "#94a3b8"],
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <g>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const w = 220 - i * 30;
          const x = (600 - w) / 2;
          const y = 340 - i * 45;
          return (
            <g key={i}>
              <rect x={x} y={y - 45} width={w} height="45" fill={i % 2 ? "#a8a29e" : "#78716c"} />
              {[0, 1, 2, 3, 4].map((j) => (
                <rect key={j} x={x + 10 + j * (w - 20) / 5} y={y - 30} width="12" height="14" fill="#1c1917" opacity="0.6" />
              ))}
            </g>
          );
        })}
        <Cloud x={120} y={100} color="#cbd5e1" />
        <Cloud x={480} y={130} color="#cbd5e1" />
      </g>
    ),
  },
  {
    id: "abraham-stars",
    title: "Abraham Counts the Stars",
    verse: "\"Look now toward heaven, and tell the stars... So shall thy seed be.\"",
    ref: "Genesis 15:5",
    sky: ["#1e1b4b", "#3730a3"],
    stars: 80,
    moon: { x: 480, y: 80, r: 30 },
    ground: { color: "#1c1917", top: "#451a03", height: 70 },
    focal: (
      <>
        <Tent x={80} y={330} />
        <g transform="translate(300 270)">
          <ellipse cx="0" cy="40" rx="22" ry="35" fill="#7c2d12" />
          <circle cx="0" cy="0" r="14" fill="#fde68a" />
          <path d="M -14 -3 Q 0 -20 14 -3 L 13 6 L -13 6 Z" fill="#9ca3af" />
          <path d="M -8 4 Q 0 18 8 4 Z" fill="#e5e7eb" />
          <line x1="14" y1="-10" x2="40" y2="-50" stroke="#fde68a" strokeWidth="2" opacity="0.7" />
        </g>
      </>
    ),
  },
  {
    id: "isaac-altar",
    title: "Isaac on the Altar",
    verse: "\"The angel of the LORD called unto him out of heaven... Lay not thine hand upon the lad.\"",
    ref: "Genesis 22:11-12",
    sky: ["#fbbf24", "#dc2626"],
    sun: { x: 100, y: 90, r: 35 },
    hills: { color: "#7c2d12", second: "#92400e" },
    focal: (
      <g>
        <rect x="240" y="280" width="120" height="50" fill="#78350f" />
        <rect x="230" y="270" width="140" height="14" fill="#a16207" />
        <ellipse cx="300" cy="270" rx="40" ry="8" fill="#dc2626" />
        <g transform="translate(180 250)">
          <ellipse cx="0" cy="40" rx="22" ry="35" fill="#fef3c7" />
          <circle cx="0" cy="0" r="14" fill="#fde68a" />
          <path d="M -14 -3 Q 0 -20 14 -3 L 13 6 L -13 6 Z" fill="#9ca3af" />
          <path d="M -8 4 Q 0 18 8 4 Z" fill="#e5e7eb" />
        </g>
        <g transform="translate(440 280)">
          <ellipse cx="0" cy="20" rx="30" ry="18" fill="#f5f5f4" />
          <circle cx="-22" cy="10" r="14" fill="#f5f5f4" />
          <path d="M -28 0 q -8 -8 -2 -14" stroke="#a8a29e" strokeWidth="3" fill="none" />
          <path d="M -16 0 q 8 -8 2 -14" stroke="#a8a29e" strokeWidth="3" fill="none" />
        </g>
      </g>
    ),
  },
  {
    id: "jacobs-ladder",
    title: "Jacob's Ladder",
    verse: "\"He dreamed, and behold a ladder set up on the earth, and the top of it reached to heaven.\"",
    ref: "Genesis 28:12",
    sky: ["#1e1b4b", "#312e81"],
    stars: 40,
    ground: { color: "#451a03", height: 60 },
    focal: (
      <g>
        <line x1="240" y1="340" x2="320" y2="40" stroke="#fde68a" strokeWidth="6" />
        <line x1="280" y1="340" x2="360" y2="40" stroke="#fde68a" strokeWidth="6" />
        {Array.from({ length: 9 }).map((_, i) => {
          const y1 = 340 - i * 35;
          const x1 = 240 + ((340 - y1) / 300) * 80;
          const x2 = 280 + ((340 - y1) / 300) * 80;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y1} stroke="#fcd34d" strokeWidth="4" />;
        })}
        {[60, 100, 280].map((y, i) => (
          <g key={i} transform={`translate(${380 + i * 30} ${y})`}>
            <ellipse cx="0" cy="0" rx="14" ry="6" fill="#fef9c3" />
            <ellipse cx="-12" cy="-2" rx="8" ry="10" fill="#fef9c3" />
            <ellipse cx="12" cy="-2" rx="8" ry="10" fill="#fef9c3" />
          </g>
        ))}
        <g transform="translate(120 320)">
          <ellipse cx="0" cy="0" rx="35" ry="14" fill="#7c2d12" />
          <circle cx="-15" cy="-6" r="10" fill="#fde68a" />
        </g>
      </g>
    ),
  },
  {
    id: "joseph-coat",
    title: "Joseph's Coat of Many Colors",
    verse: "\"Israel loved Joseph more than all his children... and made him a coat of many colours.\"",
    ref: "Genesis 37:3",
    sky: ["#fef3c7", "#fcd34d"],
    sun: { x: 500, y: 80, rays: true },
    ground: { color: "#ca8a04", top: "#eab308", height: 60 },
    focal: (
      <g transform="translate(300 200)">
        <circle cx="0" cy="-60" r="28" fill="#fde68a" />
        <path d="M -28 -50 Q 0 -85 28 -50 L 26 -38 L -26 -38 Z" fill="#1c1917" />
        <path d="M -55 -40 Q 0 -50 55 -40 L 75 80 L -75 80 Z" fill="#3b82f6" />
        <rect x="-55" y="-30" width="110" height="20" fill="#dc2626" />
        <rect x="-65" y="0" width="130" height="20" fill="#22c55e" />
        <rect x="-72" y="30" width="144" height="20" fill="#a855f7" />
        <rect x="-75" y="60" width="150" height="20" fill="#f97316" />
      </g>
    ),
  },
  {
    id: "burning-bush",
    title: "The Burning Bush",
    verse: "\"The bush burned with fire, and the bush was not consumed.\"",
    ref: "Exodus 3:2",
    sky: ["#fbbf24", "#f97316"],
    sun: { x: 100, y: 80 },
    ground: { color: "#a16207", top: "#ca8a04", height: 80 },
    focal: (
      <g transform="translate(300 240)">
        <circle cx="0" cy="0" r="80" fill="#dc2626" opacity="0.9" />
        <circle cx="-20" cy="-10" r="50" fill="#f97316" />
        <circle cx="25" cy="-5" r="55" fill="#fbbf24" />
        <circle cx="0" cy="-30" r="35" fill="#fde68a" />
        {[[-40, 0], [30, 10], [-10, 30], [40, -20]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="12" fill="#15803d" opacity="0.8" />
        ))}
      </g>
    ),
  },
  {
    id: "moses-red-sea",
    title: "Moses Parts the Red Sea",
    verse: "\"And the children of Israel went into the midst of the sea upon the dry ground.\"",
    ref: "Exodus 14:22",
    sky: ["#fbbf24", "#f97316"],
    sun: { x: 300, y: 90, r: 50 },
    focal: (
      <>
        <path d="M 0 260 Q 100 280 180 260 L 180 400 L 0 400 Z" fill="#1e40af" />
        <path d="M 600 260 Q 500 280 420 260 L 420 400 L 600 400 Z" fill="#1e40af" />
        <path d="M 0 260 Q 60 240 120 260 Q 150 270 180 260" stroke="#bae6fd" strokeWidth="3" fill="none" />
        <path d="M 600 260 Q 540 240 480 260 Q 450 270 420 260" stroke="#bae6fd" strokeWidth="3" fill="none" />
        <rect x="180" y="280" width="240" height="120" fill="#d6a373" />
        <g transform="translate(300 270)">
          <ellipse cx="0" cy="40" rx="22" ry="35" fill="#fff" />
          <circle cx="0" cy="-5" r="14" fill="#fde68a" />
          <path d="M -14 -5 Q 0 -25 14 -5 L 12 8 L -12 8 Z" fill="#9ca3af" />
          <line x1="20" y1="0" x2="40" y2="-50" stroke="#7c2d12" strokeWidth="4" />
          <circle cx="40" cy="-50" r="4" fill="#eab308" />
        </g>
      </>
    ),
  },
  {
    id: "manna-heaven",
    title: "Manna from Heaven",
    verse: "\"It is the bread which the LORD hath given you to eat.\"",
    ref: "Exodus 16:15",
    sky: ["#fef9c3", "#fcd34d"],
    sun: { x: 500, y: 80, rays: true },
    ground: { color: "#ca8a04", top: "#eab308", height: 70 },
    focal: (
      <>
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (i * 53) % 600;
          const y = 60 + ((i * 31) % 200);
          return <circle key={i} cx={x} cy={y} r="5" fill="#fef9c3" opacity="0.95" />;
        })}
        <Person x={200} y={280} body="#3b82f6" />
        <Person x={400} y={280} body="#dc2626" />
        <Tent x={280} y={340} />
      </>
    ),
  },
  {
    id: "ten-commandments",
    title: "The Ten Commandments",
    verse: "\"And he gave unto Moses... two tables of testimony, tables of stone.\"",
    ref: "Exodus 31:18",
    sky: ["#1e293b", "#475569"],
    moon: { x: 100, y: 90 },
    hills: { color: "#1c1917", second: "#292524" },
    focal: (
      <g transform="translate(300 200)">
        <path d="M -90 -60 Q -90 -100 -60 -100 L 0 -100 L 0 100 L -90 100 Z" fill="#a8a29e" />
        <path d="M 90 -60 Q 90 -100 60 -100 L 0 -100 L 0 100 L 90 100 Z" fill="#a8a29e" />
        <path d="M -90 -60 Q -90 -100 -60 -100 L 0 -100 L 0 100 L -90 100 Z" fill="none" stroke="#525252" strokeWidth="3" />
        <path d="M 90 -60 Q 90 -100 60 -100 L 0 -100 L 0 100 L 90 100 Z" fill="none" stroke="#525252" strokeWidth="3" />
        {["I", "II", "III", "IV", "V"].map((n, i) => (
          <text key={n} x="-45" y={-60 + i * 35} fill="#1c1917" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="serif">{n}</text>
        ))}
        {["VI", "VII", "VIII", "IX", "X"].map((n, i) => (
          <text key={n} x="45" y={-60 + i * 35} fill="#1c1917" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="serif">{n}</text>
        ))}
      </g>
    ),
  },
  {
    id: "walls-jericho",
    title: "Walls of Jericho",
    verse: "\"The wall fell down flat, so that the people went up into the city.\"",
    ref: "Joshua 6:20",
    sky: ["#fde68a", "#fbbf24"],
    sun: { x: 500, y: 80 },
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <g>
        <path d="M 100 340 L 130 280 L 160 340" fill="#a8a29e" />
        <rect x="170" y="260" width="280" height="80" fill="#78716c" transform="rotate(-3 310 300)" />
        <rect x="200" y="220" width="240" height="60" fill="#a8a29e" transform="rotate(2 320 250)" />
        {[[180, 280], [240, 280], [300, 280], [360, 280], [420, 280]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="16" height="24" fill="#1c1917" opacity="0.6" />
        ))}
        <polygon points="50,340 80,260 110,340" fill="#dc2626" />
        <polygon points="490,340 520,260 550,340" fill="#dc2626" />
      </g>
    ),
  },
  {
    id: "samson-pillars",
    title: "Samson and the Pillars",
    verse: "\"Let me die with the Philistines.\"",
    ref: "Judges 16:30",
    sky: ["#7f1d1d", "#1c1917"],
    ground: { color: "#451a03", height: 60 },
    focal: (
      <g>
        <rect x="120" y="120" width="40" height="220" fill="#a8a29e" transform="rotate(-8 140 230)" />
        <rect x="440" y="120" width="40" height="220" fill="#a8a29e" transform="rotate(8 460 230)" />
        <rect x="80" y="100" width="440" height="30" fill="#78716c" />
        <g transform="translate(300 260)">
          <ellipse cx="0" cy="40" rx="30" ry="40" fill="#7c2d12" />
          <circle cx="0" cy="-5" r="18" fill="#fde68a" />
          <path d="M -22 -10 Q 0 -40 22 -10 Q 18 16 -18 16 Z" fill="#1c1917" />
          <ellipse cx="-30" cy="20" rx="10" ry="20" fill="#fde68a" transform="rotate(-30 -30 20)" />
          <ellipse cx="30" cy="20" rx="10" ry="20" fill="#fde68a" transform="rotate(30 30 20)" />
        </g>
      </g>
    ),
  },
  {
    id: "david-goliath",
    title: "David and Goliath",
    verse: "\"David... took thence a stone, and slang it, and smote the Philistine.\"",
    ref: "1 Samuel 17:49",
    sky: ["#bae6fd", "#7dd3fc"],
    sun: { x: 100, y: 90 },
    ground: { color: "#65a30d", top: "#84cc16", height: 70 },
    focal: (
      <>
        <g transform="translate(440 200)">
          <ellipse cx="0" cy="60" rx="40" ry="60" fill="#475569" />
          <circle cx="0" cy="-15" r="22" fill="#fde68a" />
          <path d="M -20 -15 Q 0 -45 20 -15 L 18 0 L -18 0 Z" fill="#1c1917" />
          <rect x="20" y="-10" width="6" height="80" fill="#78350f" />
          <polygon points="20,-10 60,-10 26,-30" fill="#a8a29e" />
        </g>
        <g transform="translate(180 280)">
          <ellipse cx="0" cy="30" rx="14" ry="22" fill="#a16207" />
          <circle cx="0" cy="0" r="10" fill="#fde68a" />
          <path d="M -10 -2 Q 0 -16 10 -2 L 9 4 L -9 4 Z" fill="#92400e" />
          <ellipse cx="14" cy="10" rx="3" ry="8" fill="#fde68a" transform="rotate(40 14 10)" />
          <circle cx="22" cy="-2" r="4" fill="#a8a29e" />
        </g>
      </>
    ),
  },
  {
    id: "david-harp",
    title: "David Plays the Harp",
    verse: "\"David took an harp, and played with his hand.\"",
    ref: "1 Samuel 16:23",
    sky: ["#fed7aa", "#fb923c"],
    sun: { x: 480, y: 90 },
    ground: { color: "#16a34a", top: "#22c55e", height: 80 },
    focal: (
      <g transform="translate(300 200)">
        <ellipse cx="0" cy="60" rx="35" ry="50" fill="#3b82f6" />
        <circle cx="0" cy="-10" r="20" fill="#fde68a" />
        <path d="M -18 -10 Q 0 -38 18 -10 L 16 4 L -16 4 Z" fill="#a16207" />
        <g transform="translate(40 30)">
          <path d="M 0 0 Q 30 -40 50 0 L 50 60 Q 25 70 0 60 Z" fill="#a16207" />
          {[10, 20, 30, 40].map((x, i) => (
            <line key={i} x1={x} y1="-10" x2={x} y2="60" stroke="#fde68a" strokeWidth="1" />
          ))}
        </g>
      </g>
    ),
  },
  {
    id: "solomon-temple",
    title: "Solomon's Temple",
    verse: "\"The house which king Solomon built for the LORD.\"",
    ref: "1 Kings 6:2",
    sky: ["#fde68a", "#fbbf24"],
    sun: { x: 100, y: 90, rays: true },
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <g>
        <rect x="150" y="180" width="300" height="160" fill="#fef3c7" />
        <polygon points="120,180 300,90 480,180" fill="#a16207" />
        {[180, 240, 300, 360, 420].map((x) => (
          <rect key={x} x={x - 8} y="180" width="16" height="160" fill="#fbbf24" />
        ))}
        <rect x="280" y="240" width="40" height="100" fill="#78350f" />
        <circle cx="300" cy="290" r="3" fill="#fde68a" />
      </g>
    ),
  },
  {
    id: "elijah-fire-chariot",
    title: "Elijah's Chariot of Fire",
    verse: "\"Behold, there appeared a chariot of fire... and Elijah went up by a whirlwind into heaven.\"",
    ref: "2 Kings 2:11",
    sky: ["#dc2626", "#f97316"],
    sun: { x: 300, y: 100, r: 60, color: "#fde68a" },
    ground: { color: "#7c2d12", height: 50 },
    focal: (
      <g>
        <g transform="translate(300 200)">
          <circle cx="0" cy="0" r="80" fill="#fbbf24" opacity="0.7" />
          <circle cx="0" cy="0" r="50" fill="#fde68a" opacity="0.9" />
          <rect x="-30" y="-10" width="60" height="30" fill="#a16207" />
          <circle cx="-25" cy="25" r="12" fill="#1c1917" />
          <circle cx="25" cy="25" r="12" fill="#1c1917" />
        </g>
        <g transform="translate(180 200)">
          <ellipse cx="0" cy="40" rx="30" ry="50" fill="#fff" />
          <circle cx="0" cy="-15" r="18" fill="#fde68a" />
          <path d="M -18 -15 Q 0 -45 18 -15 L 16 -2 L -16 -2 Z" fill="#e5e7eb" />
        </g>
      </g>
    ),
  },
  {
    id: "jonah-whale",
    title: "Jonah and the Whale",
    verse: "\"The LORD had prepared a great fish to swallow up Jonah.\"",
    ref: "Jonah 1:17",
    sky: ["#7dd3fc", "#0ea5e9"],
    ground: { color: "#1e40af", top: "#3b82f6", height: 200, type: "water" },
    focal: (
      <>
        <g transform="translate(300 290)">
          <ellipse cx="0" cy="0" rx="160" ry="60" fill="#1e3a8a" />
          <ellipse cx="0" cy="-10" rx="160" ry="50" fill="#3b82f6" />
          <circle cx="-110" cy="-20" r="6" fill="#fff" />
          <circle cx="-110" cy="-20" r="3" fill="#1c1917" />
          <path d="M -160 0 Q -180 -10 -160 -20" stroke="#1e3a8a" strokeWidth="3" fill="none" />
          <polygon points="140,-30 200,-50 180,-10" fill="#1e3a8a" />
          <path d="M -100 -25 Q -90 -45 -75 -30" stroke="#fff" strokeWidth="3" fill="none" />
          <circle cx="-95" cy="-50" r="5" fill="#fff" opacity="0.8" />
          <circle cx="-85" cy="-60" r="3" fill="#fff" opacity="0.7" />
        </g>
        <Cloud x={120} y={80} />
        <Cloud x={460} y={120} scale={0.9} />
      </>
    ),
  },
  {
    id: "daniel-lions",
    title: "Daniel in the Lions' Den",
    verse: "\"My God hath sent his angel, and hath shut the lions' mouths.\"",
    ref: "Daniel 6:22",
    sky: ["#44403c", "#1c1917"],
    focal: (
      <>
        <path d="M 50 380 L 50 200 Q 300 50 550 200 L 550 380 Z" fill="#292524" />
        <path d="M 80 380 L 80 220 Q 300 90 520 220 L 520 380 Z" fill="#1c1917" />
        <polygon points="270,80 330,80 380,300 220,300" fill="#fef3c7" opacity="0.18" />
        <g transform="translate(300 280)">
          <ellipse cx="0" cy="40" rx="28" ry="40" fill="#7c2d12" />
          <circle cx="0" cy="-5" r="18" fill="#fde68a" />
          <path d="M -18 -5 Q 0 -25 18 -5 Q 18 6 -18 6 Z" fill="#92400e" />
        </g>
        <g transform="translate(140 320)">
          <ellipse cx="0" cy="20" rx="50" ry="25" fill="#a16207" />
          <circle cx="-40" cy="-5" r="28" fill="#78350f" />
          <circle cx="-40" cy="-5" r="20" fill="#a16207" />
          <circle cx="-46" cy="-8" r="2" fill="#1c1917" />
          <circle cx="-34" cy="-8" r="2" fill="#1c1917" />
        </g>
        <g transform="translate(460 320)">
          <ellipse cx="0" cy="20" rx="50" ry="25" fill="#a16207" />
          <circle cx="40" cy="-5" r="28" fill="#78350f" />
          <circle cx="40" cy="-5" r="20" fill="#a16207" />
          <circle cx="34" cy="-8" r="2" fill="#1c1917" />
          <circle cx="46" cy="-8" r="2" fill="#1c1917" />
        </g>
      </>
    ),
  },
  {
    id: "fiery-furnace",
    title: "The Fiery Furnace",
    verse: "\"He delivered his servants that trusted in him.\"",
    ref: "Daniel 3:28",
    sky: ["#7f1d1d", "#dc2626"],
    focal: (
      <>
        <rect x="100" y="200" width="400" height="200" fill="#1c1917" />
        <rect x="160" y="240" width="280" height="160" fill="#a16207" />
        {[
          [200, 260], [320, 250], [440, 270], [180, 320], [340, 330], [260, 290],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M 0 0 Q -10 -20 0 -40 Q 10 -20 0 0 Z" fill="#fbbf24" />
            <path d="M 0 -5 Q -5 -20 0 -30 Q 5 -20 0 -5 Z" fill="#fde68a" />
          </g>
        ))}
        {[220, 300, 380].map((x, i) => (
          <g key={i} transform={`translate(${x} 290)`}>
            <ellipse cx="0" cy="20" rx="15" ry="25" fill="#3b82f6" />
            <circle cx="0" cy="-5" r="10" fill="#fde68a" />
          </g>
        ))}
        <g transform="translate(300 240)">
          <circle cx="0" cy="0" r="30" fill="#fef3c7" opacity="0.5" />
          <ellipse cx="0" cy="20" rx="14" ry="22" fill="#fff" />
          <circle cx="0" cy="-5" r="10" fill="#fde68a" />
          <path d="M -16 0 q -2 -16 -10 -8" stroke="#e5e7eb" strokeWidth="3" fill="none" />
          <path d="M 16 0 q 2 -16 10 -8" stroke="#e5e7eb" strokeWidth="3" fill="none" />
        </g>
      </>
    ),
  },
  {
    id: "esther-crown",
    title: "Queen Esther",
    verse: "\"Who knoweth whether thou art come to the kingdom for such a time as this?\"",
    ref: "Esther 4:14",
    sky: ["#a855f7", "#7e22ce"],
    ground: { color: "#581c87", height: 60 },
    focal: (
      <>
        <g transform="translate(300 200)">
          <ellipse cx="0" cy="60" rx="50" ry="80" fill="#a855f7" />
          <circle cx="0" cy="-25" r="24" fill="#fde68a" />
          <path d="M -24 -25 Q 0 -55 24 -25 Q 24 -10 -24 -10 Z" fill="#451a03" />
          <g transform="translate(0 -50)">
            <polygon points="-20,0 -10,-15 0,0 10,-15 20,0" fill="#fbbf24" />
            <circle cx="-10" cy="-15" r="3" fill="#dc2626" />
            <circle cx="10" cy="-15" r="3" fill="#22c55e" />
            <circle cx="0" cy="-15" r="3" fill="#3b82f6" />
            <rect x="-20" y="0" width="40" height="6" fill="#fbbf24" />
          </g>
        </g>
        <rect x="0" y="280" width="600" height="20" fill="#7c2d12" />
        <rect x="40" y="200" width="20" height="100" fill="#a16207" />
        <rect x="540" y="200" width="20" height="100" fill="#a16207" />
      </>
    ),
  },
  {
    id: "shepherd-psalm",
    title: "The Lord is My Shepherd",
    verse: "\"He maketh me to lie down in green pastures.\"",
    ref: "Psalm 23:1-2",
    sky: ["#bae6fd", "#86efac"],
    sun: { x: 480, y: 90 },
    hills: { color: "#16a34a", second: "#15803d" },
    ground: { color: "#22c55e", top: "#4ade80", height: 50 },
    focal: (
      <>
        <g transform="translate(180 290)">
          <ellipse cx="0" cy="0" rx="22" ry="14" fill="#fff" />
          <circle cx="-18" cy="-4" r="10" fill="#1c1917" />
          <ellipse cx="-22" cy="2" rx="6" ry="4" fill="#fff" />
          <line x1="-12" y1="14" x2="-12" y2="22" stroke="#1c1917" strokeWidth="2" />
          <line x1="-2" y1="14" x2="-2" y2="22" stroke="#1c1917" strokeWidth="2" />
          <line x1="8" y1="14" x2="8" y2="22" stroke="#1c1917" strokeWidth="2" />
          <line x1="14" y1="14" x2="14" y2="22" stroke="#1c1917" strokeWidth="2" />
        </g>
        <g transform="translate(280 290)">
          <ellipse cx="0" cy="0" rx="20" ry="12" fill="#fff" />
          <circle cx="-16" cy="-4" r="9" fill="#1c1917" />
        </g>
        <g transform="translate(420 250)">
          <ellipse cx="0" cy="40" rx="22" ry="35" fill="#3b82f6" />
          <circle cx="0" cy="-5" r="14" fill="#fde68a" />
          <path d="M -14 -5 Q 0 -25 14 -5 L 13 6 L -13 6 Z" fill="#1c1917" />
          <path d="M -22 0 Q -40 -50 -28 -90 Q -22 -100 -16 -90" stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  {
    id: "ezekiel-bones",
    title: "Valley of Dry Bones",
    verse: "\"Can these bones live?\"",
    ref: "Ezekiel 37:3",
    sky: ["#a8a29e", "#78716c"],
    hills: { color: "#57534e", second: "#44403c" },
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <g>
        {[[100, 320], [180, 340], [260, 320], [340, 340], [420, 320], [500, 340], [140, 350], [300, 310], [460, 310]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse cx="0" cy="0" rx="18" ry="3" fill="#f5f5f4" />
            <circle cx="-15" cy="-2" r="5" fill="#f5f5f4" />
            <circle cx="15" cy="-2" r="5" fill="#f5f5f4" />
          </g>
        ))}
        {[[200, 260], [400, 250]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle cx="0" cy="0" r="20" fill="#f5f5f4" />
            <circle cx="-7" cy="-3" r="3" fill="#1c1917" />
            <circle cx="7" cy="-3" r="3" fill="#1c1917" />
            <rect x="-10" y="6" width="4" height="6" fill="#1c1917" />
            <rect x="-2" y="6" width="4" height="6" fill="#1c1917" />
            <rect x="6" y="6" width="4" height="6" fill="#1c1917" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: "isaiah-scroll",
    title: "Isaiah the Prophet",
    verse: "\"Whom shall I send, and who will go for us? Then said I, Here am I; send me.\"",
    ref: "Isaiah 6:8",
    sky: ["#fde68a", "#f97316"],
    sun: { x: 500, y: 80, rays: true },
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <g transform="translate(300 220)">
        <ellipse cx="0" cy="40" rx="40" ry="60" fill="#7c2d12" />
        <circle cx="0" cy="-20" r="22" fill="#fde68a" />
        <path d="M -22 -20 Q 0 -55 22 -20 Q 22 -5 -22 -5 Z" fill="#9ca3af" />
        <path d="M -12 -2 Q 0 16 12 -2 L 10 22 L -10 22 Z" fill="#e5e7eb" />
        <g transform="translate(0 30)">
          <rect x="-40" y="-8" width="80" height="20" fill="#fef3c7" />
          <circle cx="-40" cy="2" r="10" fill="#a16207" />
          <circle cx="40" cy="2" r="10" fill="#a16207" />
          <line x1="-30" y1="-2" x2="30" y2="-2" stroke="#1c1917" strokeWidth="1" />
          <line x1="-30" y1="2" x2="30" y2="2" stroke="#1c1917" strokeWidth="1" />
          <line x1="-30" y1="6" x2="30" y2="6" stroke="#1c1917" strokeWidth="1" />
        </g>
      </g>
    ),
  },

  // ---------- NEW TESTAMENT ----------
  {
    id: "annunciation",
    title: "The Annunciation",
    verse: "\"Hail, thou that art highly favoured, the Lord is with thee.\"",
    ref: "Luke 1:28",
    sky: ["#dbeafe", "#bfdbfe"],
    sun: { x: 80, y: 80, color: "#fef9c3" },
    ground: { color: "#16a34a", top: "#22c55e", height: 60 },
    focal: (
      <>
        <g transform="translate(420 220)">
          <ellipse cx="0" cy="40" rx="30" ry="60" fill="#fff" />
          <circle cx="0" cy="-25" r="22" fill="#fde68a" />
          <path d="M -22 -25 Q 0 -55 22 -25 Q 22 -10 -22 -10 Z" fill="#fbbf24" />
          <ellipse cx="-40" cy="20" rx="20" ry="40" fill="#fff" transform="rotate(-25 -40 20)" />
          <ellipse cx="40" cy="20" rx="20" ry="40" fill="#fff" transform="rotate(25 40 20)" />
          <circle cx="0" cy="-30" r="30" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.7" />
        </g>
        <g transform="translate(180 230)">
          <ellipse cx="0" cy="40" rx="28" ry="50" fill="#3b82f6" />
          <circle cx="0" cy="-15" r="20" fill="#fde68a" />
          <path d="M -20 -15 Q 0 -45 20 -15 Q 20 0 -20 0 Z" fill="#1d4ed8" />
        </g>
        <g transform="translate(180 100)">
          <circle cx="0" cy="0" r="8" fill="#fef9c3" opacity="0.9" />
          <line x1="0" y1="8" x2="0" y2="120" stroke="#fef9c3" strokeWidth="2" opacity="0.5" />
        </g>
      </>
    ),
  },
  {
    id: "nativity",
    title: "The Nativity",
    verse: "\"For unto you is born this day in the city of David a Saviour.\"",
    ref: "Luke 2:11",
    sky: ["#1e1b4b", "#3730a3"],
    stars: 30,
    focal: (
      <>
        <g transform="translate(300 70)">
          <Star x={0} y={0} r={22} />
          <line x1="0" y1="0" x2="0" y2="220" stroke="#fde68a" strokeWidth="2" opacity="0.5" />
        </g>
        <path d="M 0 360 Q 300 300 600 360 V 400 H 0 Z" fill="#78350f" />
        <polygon points="200,260 300,180 400,260" fill="#7c2d12" />
        <rect x="210" y="260" width="180" height="100" fill="#92400e" />
        <rect x="280" y="290" width="40" height="70" fill="#5b1d04" />
        <rect x="265" y="310" width="70" height="20" fill="#d97706" />
        <ellipse cx="300" cy="305" rx="20" ry="6" fill="#fef3c7" />
        <circle cx="300" cy="300" r="8" fill="#fde68a" />
        <Person x={245} y={290} body="#3b82f6" />
        <Person x={355} y={290} body="#a16207" />
      </>
    ),
  },
  {
    id: "wise-men",
    title: "The Wise Men",
    verse: "\"They saw the young child with Mary his mother, and fell down, and worshipped him.\"",
    ref: "Matthew 2:11",
    sky: ["#312e81", "#7c3aed"],
    stars: 25,
    focal: (
      <>
        <Star x={300} y={70} r={20} />
        <line x1="300" y1="70" x2="300" y2="280" stroke="#fde68a" strokeWidth="2" opacity="0.5" />
        <path d="M 0 360 Q 300 320 600 360 V 400 H 0 Z" fill="#78350f" />
        {[150, 300, 450].map((x, i) => (
          <g key={i} transform={`translate(${x} 280)`}>
            <ellipse cx="0" cy="40" rx="25" ry="55" fill={["#dc2626", "#a855f7", "#15803d"][i]} />
            <circle cx="0" cy="-20" r="16" fill="#fde68a" />
            <path d="M -16 -20 Q 0 -45 16 -20 Q 16 -8 -16 -8 Z" fill="#1c1917" />
            <polygon points="-10,-35 0,-50 10,-35 5,-30 -5,-30" fill="#fbbf24" />
            <rect x="-12" y="20" width="24" height="14" fill="#fbbf24" />
          </g>
        ))}
      </>
    ),
  },
  {
    id: "flight-egypt",
    title: "Flight to Egypt",
    verse: "\"Take the young child and his mother, and flee into Egypt.\"",
    ref: "Matthew 2:13",
    sky: ["#1e293b", "#475569"],
    moon: { x: 480, y: 80, r: 28 },
    stars: 20,
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <g transform="translate(280 240)">
        <ellipse cx="0" cy="40" rx="50" ry="30" fill="#a8a29e" />
        <ellipse cx="60" cy="0" rx="20" ry="30" fill="#a8a29e" />
        <circle cx="60" cy="-15" r="15" fill="#a8a29e" />
        <circle cx="55" cy="-18" r="2" fill="#1c1917" />
        <line x1="-40" y1="60" x2="-40" y2="100" stroke="#a8a29e" strokeWidth="6" />
        <line x1="-20" y1="60" x2="-20" y2="100" stroke="#a8a29e" strokeWidth="6" />
        <line x1="20" y1="60" x2="20" y2="100" stroke="#a8a29e" strokeWidth="6" />
        <line x1="40" y1="60" x2="40" y2="100" stroke="#a8a29e" strokeWidth="6" />
        <g transform="translate(0 -40)">
          <ellipse cx="0" cy="20" rx="20" ry="30" fill="#3b82f6" />
          <circle cx="0" cy="-5" r="12" fill="#fde68a" />
          <path d="M -12 -5 Q 0 -25 12 -5 Q 12 4 -12 4 Z" fill="#1d4ed8" />
        </g>
      </g>
    ),
  },
  {
    id: "boy-jesus-temple",
    title: "Boy Jesus in the Temple",
    verse: "\"Wist ye not that I must be about my Father's business?\"",
    ref: "Luke 2:49",
    sky: ["#fde68a", "#fcd34d"],
    sun: { x: 100, y: 80 },
    ground: { color: "#a16207", height: 50 },
    focal: (
      <>
        {[140, 460].map((x, i) => (
          <g key={i}>
            <rect x={x - 15} y="100" width="30" height="240" fill="#fef3c7" />
            <rect x={x - 25} y="90" width="50" height="14" fill="#fbbf24" />
          </g>
        ))}
        <rect x="100" y="80" width="400" height="22" fill="#fbbf24" />
        <g transform="translate(300 240)">
          <ellipse cx="0" cy="30" rx="20" ry="30" fill="#fff" />
          <circle cx="0" cy="-5" r="14" fill="#fde68a" />
          <path d="M -14 -5 Q 0 -25 14 -5 Q 14 4 -14 4 Z" fill="#a16207" />
          <circle cx="0" cy="-10" r="20" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.7" />
        </g>
        <Person x={200} y={290} body="#7c2d12" hair="#9ca3af" scale={0.8} />
        <Person x={400} y={290} body="#1c1917" hair="#9ca3af" scale={0.8} />
      </>
    ),
  },
  {
    id: "john-baptist",
    title: "John the Baptist",
    verse: "\"The voice of one crying in the wilderness, Prepare ye the way of the Lord.\"",
    ref: "Mark 1:3",
    sky: ["#fde68a", "#fbbf24"],
    sun: { x: 100, y: 90 },
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <>
        <g transform="translate(300 220)">
          <ellipse cx="0" cy="40" rx="28" ry="50" fill="#7c2d12" />
          <circle cx="0" cy="-15" r="20" fill="#fde68a" />
          <path d="M -22 -15 Q 0 -50 22 -15 Q 22 4 -22 4 Z" fill="#1c1917" />
          <path d="M -10 0 Q 0 30 10 0 Z" fill="#1c1917" />
          <line x1="20" y1="-20" x2="50" y2="-80" stroke="#78350f" strokeWidth="4" />
        </g>
        <Tree x={120} y={290} leaves="#15803d" scale={0.6} />
        <Tree x={480} y={290} leaves="#16a34a" scale={0.7} />
      </>
    ),
  },
  {
    id: "baptism-jesus",
    title: "Baptism of Jesus",
    verse: "\"This is my beloved Son, in whom I am well pleased.\"",
    ref: "Matthew 3:17",
    sky: ["#bae6fd", "#7dd3fc"],
    sun: { x: 480, y: 90 },
    ground: { color: "#3b82f6", top: "#60a5fa", height: 200, type: "water" },
    focal: (
      <>
        <g transform="translate(300 200)">
          <circle cx="0" cy="-90" r="30" fill="#fef9c3" opacity="0.5" />
          <g transform="translate(0 -90)">
            <ellipse cx="0" cy="0" rx="14" ry="6" fill="#fff" />
            <circle cx="10" cy="-2" r="5" fill="#fff" />
          </g>
          <ellipse cx="0" cy="40" rx="20" ry="30" fill="#fff" />
          <circle cx="0" cy="-5" r="14" fill="#fde68a" />
          <path d="M -14 -5 Q 0 -25 14 -5 Q 14 4 -14 4 Z" fill="#a16207" />
        </g>
        <g transform="translate(220 230)">
          <ellipse cx="0" cy="40" rx="22" ry="35" fill="#7c2d12" />
          <circle cx="0" cy="-5" r="14" fill="#fde68a" />
          <path d="M -14 -5 Q 0 -25 14 -5 Q 14 4 -14 4 Z" fill="#1c1917" />
        </g>
      </>
    ),
  },
  {
    id: "wedding-cana",
    title: "Wedding at Cana",
    verse: "\"Whatsoever he saith unto you, do it.\"",
    ref: "John 2:5",
    sky: ["#fef3c7", "#fbbf24"],
    sun: { x: 480, y: 80 },
    ground: { color: "#a16207", height: 60 },
    focal: (
      <>
        <rect x="180" y="240" width="240" height="20" fill="#7c2d12" />
        <rect x="180" y="260" width="240" height="80" fill="#a16207" />
        {[220, 280, 340].map((x, i) => (
          <g key={i} transform={`translate(${x} 220)`}>
            <ellipse cx="0" cy="0" rx="25" ry="14" fill="#dc2626" />
            <ellipse cx="0" cy="20" rx="22" ry="10" fill="#7f1d1d" />
            <rect x="-4" y="-30" width="8" height="32" fill="#a8a29e" />
          </g>
        ))}
        <g transform="translate(440 200)">
          <ellipse cx="0" cy="0" rx="20" ry="30" fill="#a8a29e" />
          <ellipse cx="0" cy="-25" rx="14" ry="6" fill="#a8a29e" />
        </g>
      </>
    ),
  },
  {
    id: "sermon-mount",
    title: "Sermon on the Mount",
    verse: "\"Blessed are the poor in spirit: for theirs is the kingdom of heaven.\"",
    ref: "Matthew 5:3",
    sky: ["#bae6fd", "#86efac"],
    sun: { x: 480, y: 80 },
    hills: { color: "#16a34a", second: "#15803d" },
    ground: { color: "#22c55e", top: "#4ade80", height: 50 },
    focal: (
      <>
        <g transform="translate(300 180)">
          <ellipse cx="0" cy="40" rx="22" ry="40" fill="#fff" />
          <circle cx="0" cy="-10" r="16" fill="#fde68a" />
          <path d="M -16 -10 Q 0 -35 16 -10 Q 16 0 -16 0 Z" fill="#a16207" />
          <circle cx="0" cy="-15" r="22" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.7" />
        </g>
        {[120, 180, 240, 360, 420, 480].map((x, i) => (
          <g key={i} transform={`translate(${x} 290)`}>
            <ellipse cx="0" cy="20" rx="14" ry="22" fill={["#3b82f6", "#dc2626", "#a16207"][i % 3]} />
            <circle cx="0" cy="-2" r="10" fill="#fde68a" />
          </g>
        ))}
      </>
    ),
  },
  {
    id: "calming-storm",
    title: "Jesus Calms the Storm",
    verse: "\"Peace, be still. And the wind ceased.\"",
    ref: "Mark 4:39",
    sky: ["#1e293b", "#475569"],
    focal: (
      <>
        <Cloud x={100} y={80} color="#475569" />
        <Cloud x={500} y={100} color="#334155" scale={1.2} />
        {[[150, 130], [400, 150], [250, 80]].map(([x, y], i) => (
          <polygon key={i} points={`${x},${y} ${x + 8},${y + 30} ${x - 4},${y + 30} ${x},${y + 50}`} fill="#fde68a" />
        ))}
        <path d="M 0 280 Q 100 260 200 280 T 400 280 T 600 280 V 400 H 0 Z" fill="#1e3a8a" />
        <path d="M 0 320 Q 100 300 200 320 T 400 320 T 600 320 V 400 H 0 Z" fill="#1e40af" opacity="0.8" />
        <Boat x={240} y={290} hull="#7c2d12" sail="#fef3c7" />
        <g transform="translate(300 250)">
          <ellipse cx="0" cy="20" rx="14" ry="22" fill="#fff" />
          <circle cx="0" cy="-2" r="10" fill="#fde68a" />
        </g>
      </>
    ),
  },
  {
    id: "walking-water",
    title: "Walking on Water",
    verse: "\"Be of good cheer; it is I; be not afraid.\"",
    ref: "Matthew 14:27",
    sky: ["#1e3a8a", "#1e40af"],
    moon: { x: 480, y: 90 },
    ground: { color: "#1e40af", top: "#3b82f6", height: 200, type: "water" },
    focal: (
      <>
        <g transform="translate(300 220)">
          <ellipse cx="0" cy="40" rx="22" ry="40" fill="#fff" />
          <circle cx="0" cy="-10" r="14" fill="#fde68a" />
          <path d="M -14 -10 Q 0 -32 14 -10 Q 14 0 -14 0 Z" fill="#a16207" />
          <ellipse cx="0" cy="80" rx="40" ry="6" fill="#fff" opacity="0.4" />
        </g>
        <Boat x={420} y={280} />
      </>
    ),
  },
  {
    id: "loaves-fishes",
    title: "Loaves and Fishes",
    verse: "\"They did all eat, and were filled.\"",
    ref: "Matthew 14:20",
    sky: ["#fef3c7", "#fbbf24"],
    sun: { x: 80, y: 90 },
    ground: { color: "#65a30d", top: "#84cc16", height: 60 },
    focal: (
      <g transform="translate(300 240)">
        <ellipse cx="0" cy="0" rx="100" ry="30" fill="#a16207" />
        <ellipse cx="0" cy="-5" rx="100" ry="25" fill="#d97706" />
        {[-70, -35, 0, 35, 70].map((x, i) => (
          <ellipse key={i} cx={x} cy="-15" rx="18" ry="10" fill="#fde68a" />
        ))}
        {[-40, 40].map((x, i) => (
          <g key={i} transform={`translate(${x} -30)`}>
            <ellipse cx="0" cy="0" rx="14" ry="8" fill="#3b82f6" />
            <polygon points="-14,0 -22,-6 -22,6" fill="#3b82f6" />
            <circle cx="8" cy="-2" r="1.5" fill="#fff" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: "good-samaritan",
    title: "The Good Samaritan",
    verse: "\"Go, and do thou likewise.\"",
    ref: "Luke 10:37",
    sky: ["#fde68a", "#fbbf24"],
    sun: { x: 480, y: 80 },
    ground: { color: "#a16207", top: "#ca8a04", height: 70 },
    focal: (
      <>
        <path d="M 0 340 Q 300 320 600 340" stroke="#92400e" strokeWidth="6" fill="none" />
        <g transform="translate(220 280)">
          <ellipse cx="0" cy="20" rx="22" ry="14" fill="#9ca3af" />
          <circle cx="-18" cy="6" r="14" fill="#9ca3af" />
        </g>
        <g transform="translate(310 270)">
          <ellipse cx="0" cy="30" rx="20" ry="30" fill="#dc2626" />
          <circle cx="0" cy="-2" r="14" fill="#fde68a" />
          <path d="M -14 -2 Q 0 -22 14 -2 Q 14 8 -14 8 Z" fill="#1c1917" />
        </g>
        <g transform="translate(380 290)">
          <ellipse cx="0" cy="0" rx="22" ry="10" fill="#7c2d12" />
          <circle cx="-18" cy="-4" r="8" fill="#fde68a" />
        </g>
      </>
    ),
  },
  {
    id: "prodigal-son",
    title: "The Prodigal Son",
    verse: "\"This my son was dead, and is alive again.\"",
    ref: "Luke 15:24",
    sky: ["#fed7aa", "#fb923c"],
    sun: { x: 480, y: 80, color: "#fef3c7" },
    ground: { color: "#a16207", top: "#ca8a04", height: 70 },
    focal: (
      <>
        <g transform="translate(220 250)">
          <ellipse cx="0" cy="50" rx="32" ry="50" fill="#1c1917" />
          <circle cx="0" cy="-10" r="18" fill="#fde68a" />
          <path d="M -18 -10 Q 0 -38 18 -10 Q 18 4 -18 4 Z" fill="#9ca3af" />
          <path d="M -12 0 Q 0 16 12 0 Z" fill="#9ca3af" />
        </g>
        <g transform="translate(360 280)">
          <ellipse cx="0" cy="20" rx="22" ry="40" fill="#7c2d12" />
          <circle cx="0" cy="-25" r="16" fill="#fde68a" />
          <path d="M -16 -25 Q 0 -50 16 -25 Q 16 -10 -16 -10 Z" fill="#1c1917" />
        </g>
        <path d="M 240 240 Q 300 220 360 250" stroke="#fde68a" strokeWidth="3" fill="none" opacity="0.7" />
        <Tent x={460} y={340} color="#92400e" />
      </>
    ),
  },
  {
    id: "lost-sheep",
    title: "The Lost Sheep",
    verse: "\"He layeth it on his shoulders, rejoicing.\"",
    ref: "Luke 15:5",
    sky: ["#bae6fd", "#86efac"],
    sun: { x: 480, y: 80 },
    hills: { color: "#16a34a", second: "#15803d" },
    ground: { color: "#22c55e", top: "#4ade80", height: 50 },
    focal: (
      <g transform="translate(300 240)">
        <ellipse cx="0" cy="40" rx="22" ry="35" fill="#7c2d12" />
        <circle cx="0" cy="-5" r="14" fill="#fde68a" />
        <path d="M -14 -5 Q 0 -25 14 -5 Q 14 4 -14 4 Z" fill="#a16207" />
        <g transform="translate(0 -25)">
          <ellipse cx="0" cy="0" rx="22" ry="12" fill="#fff" />
          <circle cx="-18" cy="-2" r="9" fill="#1c1917" />
          <ellipse cx="-22" cy="0" rx="5" ry="3" fill="#fff" />
        </g>
        <path d="M 22 0 Q 40 -50 28 -90" stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: "lazarus-raised",
    title: "Lazarus Raised",
    verse: "\"Lazarus, come forth.\"",
    ref: "John 11:43",
    sky: ["#fde68a", "#fcd34d"],
    sun: { x: 100, y: 80, rays: true },
    ground: { color: "#a16207", height: 60 },
    focal: (
      <>
        <path d="M 350 360 L 350 200 Q 480 130 600 200 L 600 360 Z" fill="#44403c" />
        <ellipse cx="450" cy="280" rx="60" ry="80" fill="#1c1917" />
        <g transform="translate(440 240)">
          <ellipse cx="0" cy="40" rx="20" ry="40" fill="#fff" />
          <circle cx="0" cy="-10" r="14" fill="#fde68a" />
          <path d="M -14 -10 Q 0 -30 14 -10 Z" fill="#fff" />
        </g>
        <g transform="translate(220 240)">
          <ellipse cx="0" cy="40" rx="22" ry="40" fill="#fff" />
          <circle cx="0" cy="-10" r="16" fill="#fde68a" />
          <path d="M -16 -10 Q 0 -32 16 -10 Q 16 0 -16 0 Z" fill="#a16207" />
          <ellipse cx="22" cy="0" rx="5" ry="22" fill="#fde68a" transform="rotate(35 22 0)" />
        </g>
      </>
    ),
  },
  {
    id: "triumphal-entry",
    title: "Triumphal Entry",
    verse: "\"Hosanna; Blessed is he that cometh in the name of the Lord.\"",
    ref: "Mark 11:9",
    sky: ["#fde68a", "#fcd34d"],
    sun: { x: 100, y: 80 },
    ground: { color: "#a16207", top: "#ca8a04", height: 70 },
    focal: (
      <g>
        <g transform="translate(300 240)">
          <ellipse cx="0" cy="40" rx="50" ry="22" fill="#9ca3af" />
          <circle cx="50" cy="20" r="18" fill="#9ca3af" />
          <line x1="-30" y1="60" x2="-30" y2="100" stroke="#9ca3af" strokeWidth="6" />
          <line x1="-10" y1="60" x2="-10" y2="100" stroke="#9ca3af" strokeWidth="6" />
          <line x1="20" y1="60" x2="20" y2="100" stroke="#9ca3af" strokeWidth="6" />
          <line x1="40" y1="60" x2="40" y2="100" stroke="#9ca3af" strokeWidth="6" />
          <g transform="translate(0 -10)">
            <ellipse cx="0" cy="20" rx="20" ry="30" fill="#fff" />
            <circle cx="0" cy="-5" r="14" fill="#fde68a" />
            <circle cx="0" cy="-12" r="20" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.7" />
          </g>
        </g>
        {[120, 460, 80, 520].map((x, i) => (
          <g key={i} transform={`translate(${x} 320)`}>
            <path d="M 0 0 q -20 -30 -10 -50 q 10 -10 20 0 q 10 20 -10 50 Z" fill="#15803d" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: "last-supper",
    title: "The Last Supper",
    verse: "\"This is my body which is given for you.\"",
    ref: "Luke 22:19",
    sky: ["#3f1d05", "#3f1d05"],
    focal: (
      <>
        <rect x="220" y="50" width="160" height="100" fill="#fde68a" rx="4" />
        <line x1="300" y1="50" x2="300" y2="150" stroke="#3f1d05" strokeWidth="4" />
        <line x1="220" y1="100" x2="380" y2="100" stroke="#3f1d05" strokeWidth="4" />
        <rect x="40" y="280" width="520" height="40" fill="#fde68a" />
        <rect x="40" y="320" width="520" height="20" fill="#a16207" />
        <g transform="translate(290 240)">
          <path d="M -15 0 Q -15 25 0 30 Q 15 25 15 0 Z" fill="#eab308" />
          <rect x="-3" y="30" width="6" height="14" fill="#a16207" />
          <ellipse cx="0" cy="44" rx="12" ry="3" fill="#a16207" />
          <ellipse cx="0" cy="-1" rx="14" ry="3" fill="#7f1d1d" />
        </g>
        <ellipse cx="180" cy="265" rx="22" ry="10" fill="#fcd34d" />
        <ellipse cx="420" cy="265" rx="22" ry="10" fill="#fcd34d" />
        {[80, 140, 200, 260, 340, 400, 460, 520].map((x, i) => (
          <g key={i} transform={`translate(${x} 230)`}>
            <ellipse cx="0" cy="40" rx="22" ry="35" fill={i === 3 ? "#dc2626" : "#1e293b"} />
            <circle cx="0" cy="0" r="14" fill="#fde68a" />
            {i === 3 && <circle cx="0" cy="-12" r="20" fill="#fde68a" opacity="0.4" />}
          </g>
        ))}
      </>
    ),
  },
  {
    id: "gethsemane",
    title: "Garden of Gethsemane",
    verse: "\"Not my will, but thine, be done.\"",
    ref: "Luke 22:42",
    sky: ["#1e1b4b", "#312e81"],
    moon: { x: 100, y: 90 },
    stars: 25,
    ground: { color: "#15803d", top: "#16a34a", height: 80 },
    focal: (
      <>
        <Tree x={120} y={290} leaves="#14532d" scale={0.9} />
        <Tree x={500} y={290} leaves="#15803d" scale={0.85} />
        <g transform="translate(300 270)">
          <ellipse cx="0" cy="30" rx="22" ry="40" fill="#fff" />
          <circle cx="0" cy="-15" r="14" fill="#fde68a" />
          <path d="M -14 -15 Q 0 -38 14 -15 Q 14 -3 -14 -3 Z" fill="#a16207" />
          <ellipse cx="-8" cy="10" rx="5" ry="10" fill="#fde68a" transform="rotate(-25 -8 10)" />
          <ellipse cx="8" cy="10" rx="5" ry="10" fill="#fde68a" transform="rotate(25 8 10)" />
          <circle cx="0" cy="-20" r="20" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.5" />
        </g>
      </>
    ),
  },
  {
    id: "crucifixion",
    title: "The Crucifixion",
    verse: "\"It is finished.\"",
    ref: "John 19:30",
    sky: ["#1c1917", "#7f1d1d"],
    hills: { color: "#451a03", second: "#1c1917" },
    focal: (
      <>
        <Cross x={300} y={340} h={180} />
        <Cross x={180} y={340} h={140} color="#92400e" />
        <Cross x={420} y={340} h={140} color="#92400e" />
        <g transform="translate(300 220)">
          <circle cx="0" cy="0" r="10" fill="#fde68a" opacity="0.7" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.5" />
        </g>
      </>
    ),
  },
  {
    id: "empty-tomb",
    title: "The Empty Tomb",
    verse: "\"He is not here: for he is risen, as he said.\"",
    ref: "Matthew 28:6",
    sky: ["#fed7aa", "#fde68a"],
    sun: { x: 480, y: 80, rays: true, color: "#fef9c3" },
    ground: { color: "#a16207", top: "#ca8a04", height: 70 },
    focal: (
      <>
        <path d="M 200 340 Q 200 200 350 200 Q 500 200 500 340" fill="#44403c" />
        <ellipse cx="350" cy="290" rx="80" ry="60" fill="#1c1917" />
        <circle cx="180" cy="320" r="50" fill="#78716c" />
        <g transform="translate(340 240)">
          <ellipse cx="0" cy="20" rx="14" ry="22" fill="#fff" />
          <circle cx="0" cy="-2" r="10" fill="#fde68a" />
          <circle cx="0" cy="-8" r="18" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.7" />
        </g>
      </>
    ),
  },
  {
    id: "resurrection",
    title: "Resurrection Morning",
    verse: "\"Why seek ye the living among the dead?\"",
    ref: "Luke 24:5",
    sky: ["#fef3c7", "#fbbf24"],
    sun: { x: 300, y: 100, r: 60, rays: true, color: "#fde68a" },
    ground: { color: "#22c55e", top: "#4ade80", height: 60 },
    focal: (
      <>
        <g transform="translate(300 220)">
          <ellipse cx="0" cy="40" rx="28" ry="50" fill="#fff" />
          <circle cx="0" cy="-15" r="20" fill="#fde68a" />
          <path d="M -20 -15 Q 0 -45 20 -15 Q 20 0 -20 0 Z" fill="#a16207" />
          <circle cx="0" cy="-22" r="28" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.7" />
          <ellipse cx="-40" cy="20" rx="20" ry="40" fill="#fff" transform="rotate(-25 -40 20)" />
          <ellipse cx="40" cy="20" rx="20" ry="40" fill="#fff" transform="rotate(25 40 20)" />
        </g>
      </>
    ),
  },
  {
    id: "road-emmaus",
    title: "Road to Emmaus",
    verse: "\"Did not our heart burn within us?\"",
    ref: "Luke 24:32",
    sky: ["#fed7aa", "#fb923c"],
    sun: { x: 100, y: 90 },
    hills: { color: "#7c2d12", second: "#92400e" },
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <>
        <path d="M 100 340 Q 300 320 500 340" stroke="#92400e" strokeWidth="6" fill="none" />
        {[230, 300, 370].map((x, i) => (
          <g key={i} transform={`translate(${x} 270)`}>
            <ellipse cx="0" cy="40" rx="20" ry="35" fill={["#3b82f6", "#fff", "#dc2626"][i]} />
            <circle cx="0" cy="-5" r="14" fill="#fde68a" />
            <path d="M -14 -5 Q 0 -25 14 -5 Q 14 4 -14 4 Z" fill={i === 1 ? "#a16207" : "#1c1917"} />
            {i === 1 && <circle cx="0" cy="-10" r="18" fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.6" />}
          </g>
        ))}
      </>
    ),
  },
  {
    id: "ascension",
    title: "The Ascension",
    verse: "\"He was taken up; and a cloud received him out of their sight.\"",
    ref: "Acts 1:9",
    sky: ["#bae6fd", "#7dd3fc"],
    sun: { x: 100, y: 80 },
    hills: { color: "#16a34a", second: "#15803d" },
    ground: { color: "#22c55e", top: "#4ade80", height: 50 },
    focal: (
      <>
        <Cloud x={300} y={120} scale={1.5} color="#fff" />
        <g transform="translate(300 100)">
          <ellipse cx="0" cy="20" rx="20" ry="30" fill="#fff" />
          <circle cx="0" cy="-10" r="14" fill="#fde68a" />
          <circle cx="0" cy="-15" r="22" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.7" />
        </g>
        {[180, 240, 300, 360, 420].map((x, i) => (
          <g key={i} transform={`translate(${x} 290)`}>
            <ellipse cx="0" cy="20" rx="14" ry="22" fill={["#3b82f6", "#dc2626", "#a16207", "#15803d", "#a855f7"][i]} />
            <circle cx="0" cy="-2" r="10" fill="#fde68a" />
          </g>
        ))}
      </>
    ),
  },
  {
    id: "pentecost",
    title: "Pentecost",
    verse: "\"They were all filled with the Holy Ghost.\"",
    ref: "Acts 2:4",
    sky: ["#fbbf24", "#dc2626"],
    focal: (
      <>
        <rect x="100" y="280" width="400" height="120" fill="#7c2d12" />
        <rect x="80" y="260" width="440" height="30" fill="#a16207" />
        {[150, 230, 310, 390, 470].map((x, i) => (
          <g key={i} transform={`translate(${x} 200)`}>
            <ellipse cx="0" cy="40" rx="20" ry="35" fill={["#3b82f6", "#dc2626", "#15803d", "#a855f7", "#a16207"][i]} />
            <circle cx="0" cy="-5" r="14" fill="#fde68a" />
            <g transform="translate(0 -28)">
              <path d="M -6 0 Q 0 -20 6 0 Q 0 -10 -6 0 Z" fill="#fbbf24" />
              <path d="M -3 -5 Q 0 -16 3 -5 Z" fill="#fef3c7" />
            </g>
          </g>
        ))}
        <g transform="translate(300 90)">
          <ellipse cx="0" cy="0" rx="20" ry="10" fill="#fff" />
          <circle cx="14" cy="-2" r="7" fill="#fff" />
          <path d="M -12 -4 Q -22 -18 -2 -10" fill="#fff" />
          <line x1="0" y1="10" x2="0" y2="100" stroke="#fde68a" strokeWidth="2" opacity="0.5" />
        </g>
      </>
    ),
  },
  {
    id: "paul-damascus",
    title: "Paul on the Damascus Road",
    verse: "\"Saul, Saul, why persecutest thou me?\"",
    ref: "Acts 9:4",
    sky: ["#fde68a", "#f97316"],
    sun: { x: 300, y: 100, r: 70, rays: true, color: "#fef9c3" },
    ground: { color: "#a16207", top: "#ca8a04", height: 70 },
    focal: (
      <>
        <g transform="translate(300 280)">
          <ellipse cx="0" cy="0" rx="40" ry="14" fill="#dc2626" />
          <circle cx="0" cy="0" r="200" fill="#fef9c3" opacity="0.2" />
        </g>
        <g transform="translate(420 250)">
          <ellipse cx="0" cy="40" rx="35" ry="22" fill="#9ca3af" />
          <circle cx="-25" cy="20" r="14" fill="#9ca3af" />
          <line x1="-15" y1="60" x2="-15" y2="100" stroke="#9ca3af" strokeWidth="5" />
          <line x1="15" y1="60" x2="15" y2="100" stroke="#9ca3af" strokeWidth="5" />
        </g>
      </>
    ),
  },
  {
    id: "new-jerusalem",
    title: "The New Jerusalem",
    verse: "\"And I John saw the holy city, new Jerusalem, coming down from God.\"",
    ref: "Revelation 21:2",
    sky: ["#fde68a", "#fbbf24"],
    sun: { x: 300, y: 80, r: 80, color: "#fef3c7", rays: true },
    focal: (
      <>
        <g transform="translate(300 280)">
          <rect x="-180" y="0" width="360" height="100" fill="#fef3c7" />
          {[-160, -120, -80, -40, 0, 40, 80, 120, 160].map((x, i) => (
            <rect key={i} x={x - 5} y={-30} width="10" height="40" fill="#fbbf24" />
          ))}
          {[-140, -60, 20, 100].map((x, i) => (
            <g key={i}>
              <rect x={x - 20} y={-80} width="40" height="80" fill="#fde68a" />
              <polygon points={`${x - 20},-80 ${x},-110 ${x + 20},-80`} fill="#fbbf24" />
              <circle cx={x} cy={-100} r="3" fill="#dc2626" />
            </g>
          ))}
          {[-100, 60].map((x, i) => (
            <rect key={i} x={x - 8} y={20} width="16" height="60" fill="#a16207" />
          ))}
        </g>
        <Cloud x={120} y={140} color="#fef3c7" />
        <Cloud x={480} y={160} color="#fef3c7" />
      </>
    ),
  },
  {
    id: "good-shepherd",
    title: "The Good Shepherd",
    verse: "\"I am the good shepherd: the good shepherd giveth his life for the sheep.\"",
    ref: "John 10:11",
    sky: ["#bae6fd", "#86efac"],
    sun: { x: 480, y: 80 },
    hills: { color: "#16a34a", second: "#15803d" },
    ground: { color: "#22c55e", top: "#4ade80", height: 50 },
    focal: (
      <>
        <g transform="translate(280 220)">
          <ellipse cx="0" cy="40" rx="22" ry="50" fill="#fff" />
          <circle cx="0" cy="-20" r="16" fill="#fde68a" />
          <path d="M -16 -20 Q 0 -45 16 -20 Q 16 -8 -16 -8 Z" fill="#a16207" />
          <circle cx="0" cy="-25" r="22" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.7" />
          <path d="M 22 -10 Q 50 -50 35 -90 Q 28 -100 22 -90" stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
        {[400, 460, 360].map((x, i) => (
          <g key={i} transform={`translate(${x} 290)`}>
            <ellipse cx="0" cy="0" rx="20" ry="12" fill="#fff" />
            <circle cx="-16" cy="-4" r="9" fill="#1c1917" />
          </g>
        ))}
      </>
    ),
  },
  {
    id: "vine-branches",
    title: "I Am the Vine",
    verse: "\"I am the vine, ye are the branches.\"",
    ref: "John 15:5",
    sky: ["#fef3c7", "#fbbf24"],
    sun: { x: 480, y: 80 },
    ground: { color: "#a16207", top: "#ca8a04", height: 60 },
    focal: (
      <g>
        <path d="M 300 360 Q 300 280 200 240 Q 100 200 80 100" stroke="#78350f" strokeWidth="8" fill="none" />
        <path d="M 300 360 Q 300 280 400 240 Q 500 200 520 100" stroke="#78350f" strokeWidth="8" fill="none" />
        <path d="M 300 360 Q 300 240 300 100" stroke="#78350f" strokeWidth="10" fill="none" />
        {[
          [80, 100], [520, 100], [300, 100], [200, 240], [400, 240], [120, 160], [480, 160],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {[[0, 0], [-8, 8], [8, 8], [-4, 16], [4, 16]].map(([dx, dy], j) => (
              <circle key={j} cx={dx} cy={dy} r="6" fill="#7e22ce" />
            ))}
            <path d="M -10 -10 q 10 -8 20 0" stroke="#15803d" strokeWidth="3" fill="none" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: "samaritan-well",
    title: "Woman at the Well",
    verse: "\"Whosoever drinketh of the water that I shall give him shall never thirst.\"",
    ref: "John 4:14",
    sky: ["#fef3c7", "#fbbf24"],
    sun: { x: 100, y: 80 },
    ground: { color: "#a16207", top: "#ca8a04", height: 70 },
    focal: (
      <>
        <g transform="translate(300 240)">
          <rect x="-50" y="0" width="100" height="80" fill="#a8a29e" />
          <ellipse cx="0" cy="0" rx="50" ry="14" fill="#1c1917" />
          <ellipse cx="0" cy="-2" rx="50" ry="12" fill="#1e3a8a" />
          <line x1="-40" y1="-30" x2="40" y2="-30" stroke="#78350f" strokeWidth="4" />
          <rect x="-2" y="-70" width="4" height="40" fill="#78350f" />
        </g>
        <g transform="translate(180 240)">
          <ellipse cx="0" cy="40" rx="22" ry="40" fill="#dc2626" />
          <circle cx="0" cy="-10" r="14" fill="#fde68a" />
          <path d="M -14 -10 Q 0 -30 14 -10 Q 14 0 -14 0 Z" fill="#1c1917" />
        </g>
        <g transform="translate(420 240)">
          <ellipse cx="0" cy="40" rx="22" ry="40" fill="#fff" />
          <circle cx="0" cy="-10" r="14" fill="#fde68a" />
          <path d="M -14 -10 Q 0 -30 14 -10 Q 14 0 -14 0 Z" fill="#a16207" />
        </g>
      </>
    ),
  },
  {
    id: "mustard-seed",
    title: "Mustard Seed",
    verse: "\"If ye have faith as a grain of mustard seed... nothing shall be impossible.\"",
    ref: "Matthew 17:20",
    sky: ["#bae6fd", "#86efac"],
    sun: { x: 480, y: 80 },
    ground: { color: "#16a34a", top: "#22c55e", height: 80 },
    focal: (
      <g>
        <Tree x={300} y={310} leaves="#15803d" scale={2} />
        {[200, 380, 240, 360, 280].map((x, i) => (
          <g key={i} transform={`translate(${x} ${100 + i * 20})`}>
            <ellipse cx="0" cy="0" rx="6" ry="4" fill="#fde68a" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: "pearl-great-price",
    title: "The Pearl of Great Price",
    verse: "\"Found one pearl of great price... and bought it.\"",
    ref: "Matthew 13:46",
    sky: ["#1e1b4b", "#7e22ce"],
    stars: 30,
    focal: (
      <g transform="translate(300 220)">
        <circle cx="0" cy="0" r="120" fill="#a855f7" opacity="0.2" />
        <circle cx="0" cy="0" r="80" fill="#fef9c3" opacity="0.3" />
        <circle cx="0" cy="0" r="60" fill="#fff" />
        <circle cx="-15" cy="-15" r="20" fill="#fef9c3" opacity="0.7" />
        <circle cx="-25" cy="-25" r="8" fill="#fff" />
      </g>
    ),
  },
];

export const bibleScenes: BibleScene[] = SCENE_DEFS.map(buildScene);
