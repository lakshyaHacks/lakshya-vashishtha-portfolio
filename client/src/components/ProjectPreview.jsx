// Miniature, purely decorative interfaces (aria-hidden). Each project gets a different treatment.

function Chrome({ children, title }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-bg">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <i className="h-2 w-2 rounded-full bg-line" /><i className="h-2 w-2 rounded-full bg-line" /><i className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-3 text-[10px] text-muted">{title}</span>
      </div>
      {children}
    </div>
  );
}

const Bar = ({ w = '100%', accent }) => (
  <div className={`h-1.5 rounded-full ${accent ? 'bg-accent/70' : 'bg-line'}`} style={{ width: w }} />
);

function EditorPreview() {
  return (
    <Chrome title="problem / editor">
      <div className="grid flex-1 grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-2.5 border-r border-line p-4">
          <div className="h-2.5 w-2/3 rounded-full bg-ink/70" />
          <Bar /><Bar w="92%" /><Bar w="70%" />
          <div className="pt-2"><Bar w="45%" accent /></div>
          <Bar w="85%" /><Bar w="60%" />
        </div>
        <div className="flex flex-col p-4 font-mono text-[11px] leading-relaxed">
          <p><span className="text-accent">function</span> solve(nums, target) {'{'}</p>
          <p className="pl-4"><span className="text-accent">const</span> seen = <span className="text-accent">new</span> Map();</p>
          <p className="pl-4"><span className="text-accent">for</span> (<span className="text-accent">let</span> i = 0; i &lt; nums.length; i++) {'{'}</p>
          <p className="pl-8 text-muted">// ...</p>
          <p className="pl-4">{'}'}</p>
          <p>{'}'}</p>
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="rounded border border-line px-2 py-0.5 text-[10px] text-muted">JavaScript</span>
            <span className="rounded bg-accent px-3 py-1 text-[10px] font-semibold text-onaccent">Run</span>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function FoodPreview() {
  const tiles = ['from-accent/40', 'from-line', 'from-line', 'from-accent/25'];
  return (
    <div className="mx-auto flex h-full w-[78%] max-w-[260px] flex-col rounded-[1.6rem] border border-line bg-bg p-3">
      <div className="mb-3 h-7 rounded-full border border-line bg-surface" />
      <div className="mb-3 flex gap-2">
        {[44, 52, 38].map((w) => <div key={w} className="h-5 rounded-full bg-line" style={{ width: w }} />)}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {tiles.map((t, i) => (
          <div key={i} className="flex flex-col rounded-lg border border-line bg-surface p-1.5">
            <div className={`flex-1 rounded-md bg-gradient-to-br ${t} to-transparent`} />
            <div className="mt-1.5 space-y-1"><Bar w="80%" /><Bar w="50%" /></div>
          </div>
        ))}
      </div>
      <div className="mt-3 h-7 rounded-full bg-accent/80" />
    </div>
  );
}

function RoutePreview() {
  // Fixed points so the picture is stable between renders.
  const pts = [[40, 120], [70, 50], [130, 30], [190, 70], [250, 40], [300, 100], [270, 160], [200, 150], [150, 180], [90, 165]];
  const route = pts.map((p) => p.join(',')).join(' ');
  const crossed = [pts[0], pts[3], pts[2], pts[5], pts[4], pts[7], pts[6], pts[9], pts[8], pts[1]].map((p) => p.join(',')).join(' ');
  return (
    <div className="grid h-full place-items-center rounded-md border border-line bg-bg">
      <svg viewBox="0 0 340 210" className="h-full w-full p-4">
        <polygon points={crossed} fill="none" className="stroke-muted" strokeWidth="1" strokeDasharray="4 5" opacity=".5" />
        <polygon points={route} fill="none" className="stroke-accent" strokeWidth="2" strokeLinejoin="round" />
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" className="fill-bg stroke-accent" strokeWidth="2" />)}
      </svg>
    </div>
  );
}

export default function ProjectPreview({ type }) {
  const map = { editor: EditorPreview, food: FoodPreview, route: RoutePreview };
  const Cmp = map[type] || EditorPreview;
  return (
    <div aria-hidden="true" className="h-full min-h-[240px] w-full">
      <Cmp />
    </div>
  );
}
