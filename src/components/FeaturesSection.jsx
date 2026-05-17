import React, { useEffect, useRef, useState } from 'react';
import { Brain, ShieldCheck, Zap, Eye, BarChart3, Globe, Lock, Radio } from 'lucide-react';

/* ── Animated counter hook ────────────────── */
function useCounter(target, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const isFloat = String(target).includes('.');
    const numeric = parseFloat(target);
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(isFloat ? (eased * numeric).toFixed(1) : Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

/* ── Intersection observer hook ────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Stat card ──────────────────────────────── */
const StatCard = ({ value, suffix, label, inView, delay }) => {
  const num = useCounter(value, 2000, inView);
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-700"
      style={{
        background: 'linear-gradient(160deg, rgba(255,176,0,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,176,0,0.15)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: delay,
      }}
    >
      <span className="text-4xl md:text-5xl font-black tabular-nums" style={{ color: '#FFB000', fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.05em' }}>
        {num}{suffix}
      </span>
      <span className="mt-2 text-sm text-gray-500 tracking-wide">{label}</span>
    </div>
  );
};

/* ── Camera network SVG visualization ──────── */
const NetworkViz = ({ inView }) => {
  const nodes = [
    { cx: 250, cy: 140, label: 'HQ Hub',  labelDy: 38,  main: true },
    { cx: 100, cy: 240, label: 'CAM-A1',  labelDy: 22 },
    { cx: 185, cy: 320, label: 'CAM-B3',  labelDy: 22 },
    { cx: 315, cy: 320, label: 'CAM-C2',  labelDy: 22 },
    { cx: 400, cy: 240, label: 'CAM-D5',  labelDy: 22 },
    { cx: 68,  cy: 130, label: 'CAM-E7',  labelDy: -16 }, // label above to avoid crowding
    { cx: 432, cy: 130, label: 'CAM-F4',  labelDy: -16 }, // label above
  ];

  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,2],[4,6],
  ];

  return (
    <div
      className="relative w-full max-w-lg mx-auto"
      style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s 0.3s' }}
    >
      <svg viewBox="0 0 500 410" fill="none" className="w-full">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFB000" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── "AI MESH / LIVE NETWORK" badge — placed at top-center, well above HQ Hub ── */}
        <g>
          <rect x="190" y="14" width="120" height="34" rx="8"
            fill="rgba(255,176,0,0.06)" stroke="rgba(255,176,0,0.25)" strokeWidth="1" />
          <text x="250" y="28" textAnchor="middle"
            fill="#FFD985" fontSize="9" fontFamily="monospace" letterSpacing="2" fontWeight="bold">
            AI MESH
          </text>
          <text x="250" y="42" textAnchor="middle"
            fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="monospace" letterSpacing="2">
            LIVE NETWORK
          </text>
        </g>

        {/* ── Edges ── */}
        {edges.map(([a, b], i) => (
          <line key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="rgba(255,176,0,0.2)" strokeWidth="1" strokeDasharray="6 4"
          >
            <animate attributeName="stroke-opacity" values="0.1;0.5;0.1" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
          </line>
        ))}

        {/* ── Nodes ── */}
        {nodes.map((n, i) => (
          <g key={i}>
            {/* Glow pulse */}
            <circle cx={n.cx} cy={n.cy} r={n.main ? 36 : 22} fill="url(#nodeGlow)">
              <animate attributeName="r" values={n.main ? "30;42;30" : "18;26;18"} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            {/* Circle */}
            <circle cx={n.cx} cy={n.cy} r={n.main ? 20 : 12}
              fill={n.main ? '#FFB000' : 'rgba(255,176,0,0.15)'}
              stroke={n.main ? '#FF7700' : 'rgba(255,176,0,0.5)'}
              strokeWidth={n.main ? 2 : 1.5}
              filter="url(#glow)"
            />
            {/* Inner dot */}
            <circle cx={n.cx} cy={n.cy} r={n.main ? 5 : 3} fill={n.main ? '#060605' : '#FFB000'} />
            {/* Label — offset direction controlled per-node via labelDy */}
            <text
              x={n.cx}
              y={n.cy + n.labelDy}
              textAnchor="middle"
              fill="rgba(255,255,255,0.4)"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="1"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* ── Traveling data packets ── */}
        <circle r="3" fill="#FFB000" filter="url(#glow)">
          <animateMotion dur="3s" repeatCount="indefinite"
            path={`M${nodes[0].cx},${nodes[0].cy} L${nodes[1].cx},${nodes[1].cy} L${nodes[2].cx},${nodes[2].cy} L${nodes[0].cx},${nodes[0].cy}`} />
        </circle>
        <circle r="3" fill="#FF7700" filter="url(#glow)">
          <animateMotion dur="4s" repeatCount="indefinite"
            path={`M${nodes[0].cx},${nodes[0].cy} L${nodes[4].cx},${nodes[4].cy} L${nodes[6].cx},${nodes[6].cy} L${nodes[0].cx},${nodes[0].cy}`} />
        </circle>
      </svg>
    </div>
  );
};

/* ── Feature card ─────────────────────────── */
const FeatureCard = ({ icon: Icon, title, desc, delay, inView }) => (
  <div
    className="group p-6 rounded-2xl cursor-default transition-all duration-700"
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transitionDelay: delay,
    }}
  >
    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
      style={{ background: 'rgba(255,176,0,0.1)', border: '1px solid rgba(255,176,0,0.2)' }}>
      <Icon size={20} className="text-[#FFB000]" />
    </div>
    <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#FFD985] transition-colors duration-300">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

/* ── Main component ───────────────────────── */
const FeaturesSection = () => {
  const [statsRef, statsInView] = useInView(0.3);
  const [vizRef, vizInView] = useInView(0.2);
  const [cardsRef, cardsInView] = useInView(0.1);

  const stats = [
    { value: 99.7, suffix: '%', label: 'Detection Accuracy' },
    { value: 0.3,  suffix: 's', label: 'Avg. Response Time' },
    { value: 200,  suffix: '+', label: 'Camera Integrations' },
    { value: 50,   suffix: 'M+', label: 'Threats Neutralized' },
  ];

  const features = [
    { icon: Brain,      title: 'Neural Behavior Analysis', desc: 'Deep learning models trained on millions of hours of surveillance footage to identify anomalous behavior patterns instantly.' },
    { icon: Zap,        title: 'Real-Time Alerting',       desc: 'Sub-second threat notifications delivered to your team across mobile, desktop, and integrated response systems.' },
    { icon: Eye,        title: 'Multi-Camera Tracking',    desc: 'Track a single subject seamlessly across hundreds of camera feeds with persistent identity matching.' },
    { icon: BarChart3,  title: 'Analytics Dashboard',      desc: 'Rich operational insights: heat maps, crowd density, dwell time, and threat trend reports at a glance.' },
    { icon: Lock,       title: 'End-to-End Encryption',    desc: 'Military-grade AES-256 encryption ensures your footage and data remain private and tamper-proof at all times.' },
    { icon: Globe,      title: 'Cloud & On-Premise',       desc: 'Deploy in your data center, on the edge, or fully in the cloud — Veyrox adapts to your infrastructure.' },
  ];

  return (
    <section id="why" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#FFB000]/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section label */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{ border: '1px solid rgba(255,176,0,0.25)', background: 'rgba(255,176,0,0.06)' }}>
            <Radio size={12} className="text-[#FFB000]" />
            <span className="text-xs text-[#FFD985] font-medium tracking-widest uppercase">Why Veyrox</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '0.04em', background: 'linear-gradient(175deg, #fff 0%, #888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Intelligence That<br />Never Sleeps
          </h2>
          <p className="mt-5 text-gray-400 text-base leading-relaxed max-w-xl">
            Veyrox's AI engine operates 24/7 across your entire camera network — catching what humans miss, every single second.
          </p>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 md:mb-24">
          {stats.map((s, i) => <StatCard key={i} {...s} inView={statsInView} delay={`${i * 0.1}s`} />)}
        </div>

        {/* Network viz + features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div ref={vizRef}>
            <NetworkViz inView={vizInView} />
          </div>
          <div>
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
              A unified AI mesh across<br />every camera you own
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Veyrox connects all your cameras into a single intelligent network. Each node communicates in real-time, sharing threat intelligence and building a live map of your entire site.
            </p>
            <div className="flex flex-col gap-3">
              {['Instant cross-camera subject tracking', 'Centralized threat intelligence sharing', 'Zero-config camera onboarding', 'Auto-failover and redundancy'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,176,0,0.15)', border: '1px solid rgba(255,176,0,0.3)' }}>
                    <ShieldCheck size={11} className="text-[#FFB000]" />
                  </div>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} inView={cardsInView} delay={`${i * 0.08}s`} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;