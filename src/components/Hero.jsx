import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, ArrowDown, Activity, Eye, Wifi, Lock } from 'lucide-react';

/* ─────────────────────────────────────────────
   Tiny animated helpers
───────────────────────────────────────────── */

// Blinking status dot
const StatusDot = ({ color = '#22c55e', delay = 0 }) => (
  <span
    className="inline-block w-2 h-2 rounded-full flex-shrink-0"
    style={{
      background: color,
      boxShadow: `0 0 6px ${color}`,
      animation: `blink 2s ${delay}s ease-in-out infinite`,
    }}
  />
);

// A single fake camera feed cell
const CameraFeed = ({ id, label, active = false, alert = false, delay = 0 }) => {
  const [scanPos, setScanPos] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(p => (p >= 100 ? 0 : p + 0.6));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative rounded-lg overflow-hidden border flex flex-col"
      style={{
        background: 'rgba(10,10,9,0.9)',
        borderColor: alert ? 'rgba(255,119,0,0.6)' : active ? 'rgba(255,176,0,0.3)' : 'rgba(255,255,255,0.06)',
        boxShadow: alert ? '0 0 12px rgba(255,119,0,0.2)' : 'none',
        animationDelay: `${delay}s`,
      }}
    >
      {/* Grid-dot background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,176,0,0.15) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{
          top: `${scanPos}%`,
          background: 'linear-gradient(90deg, transparent, rgba(255,176,0,0.7), transparent)',
          boxShadow: '0 0 8px 2px rgba(255,176,0,0.3)',
        }}
      />

      {/* Detection bounding box (shown on alert feeds) */}
      {alert && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            top: '25%', left: '30%', width: '38%', height: '48%',
            border: '1.5px solid rgba(255,119,0,0.9)',
            boxShadow: '0 0 8px rgba(255,119,0,0.4)',
          }}
        >
          {/* Bracket corners */}
          {[
            { top: -3, left: -3, borderRight: 'none', borderBottom: 'none' },
            { top: -3, right: -3, borderLeft: 'none', borderBottom: 'none' },
            { bottom: -3, left: -3, borderRight: 'none', borderTop: 'none' },
            { bottom: -3, right: -3, borderLeft: 'none', borderTop: 'none' },
          ].map((style, i) => (
            <div key={i} className="absolute w-2 h-2" style={{ border: '2px solid #FF7700', ...style }} />
          ))}
          <div
            className="absolute -top-5 left-0 text-[9px] font-mono tracking-wider px-1 rounded"
            style={{ background: 'rgba(255,119,0,0.9)', color: '#fff' }}
          >
            TARGET
          </div>
        </div>
      )}

      {/* Feed silhouette — pure CSS person shape */}
      {active && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
          <svg width="40" height="70" viewBox="0 0 40 70" fill="none" opacity="0.18">
            <ellipse cx="20" cy="12" rx="8" ry="9" fill="#FFB000" />
            <rect x="12" y="22" width="16" height="22" rx="3" fill="#FFB000" />
            <rect x="4" y="24" width="8" height="18" rx="3" fill="#FFB000" />
            <rect x="28" y="24" width="8" height="18" rx="3" fill="#FFB000" />
            <rect x="12" y="44" width="7" height="22" rx="3" fill="#FFB000" />
            <rect x="21" y="44" width="7" height="22" rx="3" fill="#FFB000" />
          </svg>
        </div>
      )}

      {/* Header bar */}
      <div className="relative z-20 flex items-center justify-between px-2 py-1.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-1.5">
          <StatusDot color={alert ? '#FF7700' : active ? '#22c55e' : '#555'} delay={delay} />
          <span className="text-[9px] font-mono text-gray-400 tracking-widest">{label}</span>
        </div>
        <span className="text-[8px] font-mono text-gray-600">LIVE</span>
      </div>

      {/* Feed body — fills remaining space */}
      <div className="flex-1 relative min-h-[50px]" />

      {/* Footer */}
      <div className="relative z-20 flex items-center justify-between px-2 py-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <span className="text-[8px] font-mono text-gray-600">
          {alert ? '⚠ ALERT' : active ? 'TRACKING' : 'IDLE'}
        </span>
        <span className="text-[8px] font-mono text-gray-600">{id}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main surveillance dashboard visual
───────────────────────────────────────────── */
const SurveillanceDashboard = () => {
  const [time, setTime] = useState('');
  const [threatCount] = useState(2);
  const [fps] = useState(30);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', { hour12: false }) +
        '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2)
      );
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Top status bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <StatusDot color="#22c55e" />
            <span className="text-[10px] font-mono text-gray-400 tracking-widest">VEYROX·AI v4.2</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <span className="text-[10px] font-mono text-gray-500">8 CAMERAS ONLINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#FFB000] tabular-nums">{time}</span>
          <div className="flex items-center gap-1">
            <Wifi size={9} className="text-green-500" />
            <span className="text-[9px] font-mono text-gray-600">{fps}fps</span>
          </div>
        </div>
      </div>

      {/* Camera grid — 2×2 + 2×1 layout */}
      <div className="p-3 grid grid-cols-3 grid-rows-2 gap-2" style={{ minHeight: '280px' }}>
        {/* Large main feed — col 1-2, row 1-2 */}
        <div className="col-span-2 row-span-2">
          <CameraFeed id="CAM-01" label="SECTOR·A" active alert delay={0} />
        </div>
        {/* Side feeds */}
        <div className="col-span-1 row-span-1">
          <CameraFeed id="CAM-03" label="LOBBY·NORTH" active delay={0.4} />
        </div>
        <div className="col-span-1 row-span-1">
          <CameraFeed id="CAM-07" label="PARKING·B2" delay={0.8} />
        </div>
      </div>

      {/* Bottom analytics bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.25)' }}
      >
        {[
          { label: 'THREATS', value: threatCount, icon: <AlertTriangle size={10} className="text-[#FF7700]" />, color: '#FF7700' },
          { label: 'TRACKED', value: 14, icon: <Eye size={10} className="text-[#FFB000]" />, color: '#FFB000' },
          { label: 'AI SCORE', value: '98.4%', icon: <Activity size={10} className="text-green-400" />, color: '#22c55e' },
          { label: 'SECURED', value: '12 ZONES', icon: <Lock size={10} className="text-blue-400" />, color: '#60a5fa' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 rounded-md" style={{ background: `${color}18` }}>
              {icon}
            </div>
            <div>
              <p className="text-[8px] font-mono text-gray-600 tracking-widest">{label}</p>
              <p className="text-[11px] font-mono font-bold tabular-nums" style={{ color }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
const Hero = () => (
  <main id="hero" className="relative z-10 overflow-hidden">
    <style>{`
      @keyframes blink {
        0%,100% { opacity:1; }
        50%      { opacity:0.3; }
      }
      @keyframes floatUp {
        0%,100% { transform:translateY(0); }
        50%      { transform:translateY(-8px); }
      }
      @keyframes pulseRing {
        0%,100% { box-shadow:0 0 0 0 rgba(255,176,0,0.4); }
        50%      { box-shadow:0 0 0 8px rgba(255,176,0,0); }
      }
      @keyframes slideInLeft {
        from { opacity:0; transform:translateX(-30px); }
        to   { opacity:1; transform:translateX(0); }
      }
      @keyframes slideInRight {
        from { opacity:0; transform:translateX(30px); }
        to   { opacity:1; transform:translateX(0); }
      }
      @keyframes fadeInUp {
        from { opacity:0; transform:translateY(20px); }
        to   { opacity:1; transform:translateY(0); }
      }
      .anim-left  { animation: slideInLeft  0.7s ease both; }
      .anim-right { animation: slideInRight 0.7s 0.2s ease both; }
      .anim-up    { animation: fadeInUp     0.6s ease both; }
      .float-anim { animation: floatUp 5s ease-in-out infinite; }
      .pulse-ring { animation: pulseRing 2.5s ease-in-out infinite; }
    `}</style>

    {/* Dot-grid overlay */}
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,176,0,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />

    {/* Ambient glow blobs */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
      style={{ background: 'radial-gradient(circle, rgba(255,119,0,0.12) 0%, transparent 70%)' }} />
    <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] rounded-full pointer-events-none -z-10"
      style={{ background: 'radial-gradient(circle, rgba(255,176,0,0.07) 0%, transparent 70%)' }} />

    {/* ────────────────────────────────────── */}
    {/*  Content wrapper                       */}
    {/* ────────────────────────────────────── */}
    <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">

      {/* ── Desktop / tablet (lg+): Two-column ── */}
      <div className="
        flex flex-col items-center text-center
        lg:flex-row lg:items-center lg:text-left lg:gap-12
        min-h-[calc(100vh-72px)] py-12 sm:py-16 lg:py-0
      ">

        {/* ── LEFT: Text ── */}
        <div className="anim-left flex-shrink-0 w-full lg:w-[45%] flex flex-col items-center lg:items-start">

          {/* Trusted badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 sm:mb-8"
            style={{
              border: '1px solid rgba(255,176,0,0.3)',
              background: 'rgba(255,176,0,0.06)',
              backdropFilter: 'blur(8px)',
            }}>
            <Shield size={13} className="text-[#FFB000]" fill="#FFB000" />
            <span className="text-xs sm:text-sm text-[#FFD985] font-medium tracking-wide">
              Trusted by Security Teams Worldwide
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading mb-6 sm:mb-8">
            AI Powered<br />Camera<br />Security
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8 sm:mb-10 max-w-[480px]">
            Real-time behavioral analysis, anomaly detection, and automated threat response —
            all powered by next-generation computer vision AI.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 sm:gap-8 mb-8 sm:mb-10">
            {[
              { value: '99.7%', label: 'Accuracy' },
              { value: '<0.3s', label: 'Response' },
              { value: '200+', label: 'Cameras' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl font-bold text-[#FFB000] tabular-nums">{value}</span>
                <span className="text-xs text-gray-500 mt-0.5 tracking-wide">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-10 lg:mb-0">
            <button
              className="px-7 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                border: '1px solid rgba(255,176,0,0.5)',
                color: '#FFD985',
                background: 'rgba(255,176,0,0.12)',
                boxShadow: '0 0 24px rgba(255,176,0,0.15)',
              }}>
              Start Monitoring
            </button>
            <button
              className="px-7 py-3 rounded-full text-sm font-medium tracking-wide text-gray-300 transition-all duration-300 hover:text-white hover:border-gray-400"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
              Live Demo →
            </button>
          </div>
        </div>

        {/* ── RIGHT: Dashboard visual ── */}
        <div className="anim-right float-anim w-full lg:flex-1 mt-10 lg:mt-0">
          <SurveillanceDashboard />

          {/* Alert badge below dashboard */}
          <div className="mt-4 anim-up" style={{ animationDelay: '0.5s' }}>
            <div className="inline-flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: 'rgba(6,6,5,0.7)',
                border: '1px solid rgba(255,119,0,0.3)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 0 20px rgba(255,119,0,0.1)',
              }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #FF7700, #FFB000)', boxShadow: '0 0 16px rgba(255,119,0,0.4)' }}>
                <AlertTriangle size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm tracking-wide">SECTOR C-12 — ALERT</p>
                <p className="text-xs text-gray-400 mt-0.5">Suspicious activity detected · Notifying response team</p>
              </div>
              <StatusDot color="#FF7700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default Hero;