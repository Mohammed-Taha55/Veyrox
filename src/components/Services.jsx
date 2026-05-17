import React, { useEffect, useRef, useState } from 'react';
import { Camera, Brain, Shield, Bell, Map, Cloud, ArrowRight } from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const services = [
  {
    icon: Camera,
    tag: '01',
    title: 'Smart Camera Management',
    desc: 'Centrally manage thousands of cameras across multiple sites. Auto-discovery, health monitoring, and firmware updates handled automatically.',
    features: ['Auto-discovery & onboarding', 'Health monitoring', 'Remote PTZ control'],
    color: '#FFB000',
  },
  {
    icon: Brain,
    tag: '02',
    title: 'AI Threat Detection',
    desc: 'Computer vision models trained on real-world threat scenarios detect violence, unauthorized access, loitering, and more in real time.',
    features: ['Violence detection', 'Perimeter breach alerts', 'Crowd anomaly analysis'],
    color: '#FF7700',
    highlight: true,
  },
  {
    icon: Shield,
    tag: '03',
    title: 'Access Control Integration',
    desc: 'Tie camera intelligence directly into your access control system. Automatically lock doors, trigger alarms, or alert guards on detection.',
    features: ['Biometric verification', 'Door lock automation', 'Badge + face fusion'],
    color: '#FFB000',
  },
  {
    icon: Bell,
    tag: '04',
    title: 'Intelligent Alerting',
    desc: 'Context-aware alerts sent to the right person at the right time — no more alert fatigue from false positives.',
    features: ['Smart noise filtering', 'Escalation workflows', 'Multi-channel delivery'],
    color: '#FF7700',
  },
  {
    icon: Map,
    tag: '05',
    title: 'Live Site Mapping',
    desc: 'Interactive floor plans with real-time overlay of camera feeds, tracked subjects, and live threat indicators across your entire campus.',
    features: ['3D site visualization', 'Live subject trails', 'Threat heat maps'],
    color: '#FFB000',
  },
  {
    icon: Cloud,
    tag: '06',
    title: 'Forensic Search & Archive',
    desc: 'Search weeks of footage in seconds using natural language. "Show me everyone who entered Lobby B between 9–11am yesterday."',
    features: ['Natural language search', 'Smart clip export', 'Tamper-proof archive'],
    color: '#FF7700',
  },
];

const ServiceCard = ({ icon: Icon, tag, title, desc, features, color, highlight, delay, inView }) => (
  <div
    className="group relative flex flex-col p-6 md:p-7 rounded-2xl cursor-default transition-all duration-700 overflow-hidden"
    style={{
      background: highlight
        ? 'linear-gradient(150deg, rgba(255,119,0,0.1) 0%, rgba(255,176,0,0.05) 100%)'
        : 'rgba(255,255,255,0.02)',
      border: highlight
        ? '1px solid rgba(255,119,0,0.35)'
        : '1px solid rgba(255,255,255,0.06)',
      boxShadow: highlight ? '0 0 40px rgba(255,119,0,0.08)' : 'none',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(50px)',
      transitionDelay: delay,
    }}
  >
    {/* Hover glow */}
    <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
      style={{ background: `radial-gradient(circle at 30% 30%, ${color}08 0%, transparent 65%)` }} />

    {/* Tag */}
    <span className="text-[10px] font-mono tracking-widest mb-4 block" style={{ color: `${color}70` }}>{tag}</span>

    {/* Icon */}
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
      style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
      <Icon size={22} style={{ color }} />
    </div>

    {/* Content */}
    <h3 className="text-white font-semibold text-lg mb-3 leading-snug group-hover:text-[#FFD985] transition-colors duration-300">
      {title}
    </h3>
    <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{desc}</p>

    {/* Feature list */}
    <ul className="flex flex-col gap-1.5 mb-6">
      {features.map((f) => (
        <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
          {f}
        </li>
      ))}
    </ul>

    {/* Learn more */}
    <button className="flex items-center gap-2 text-xs font-medium transition-all duration-300 group-hover:gap-3"
      style={{ color }}>
      Learn more <ArrowRight size={13} />
    </button>
  </div>
);

const Services = () => {
  const [headRef, headInView] = useInView(0.3);
  const [gridRef, gridInView] = useInView(0.05);

  return (
    <section id="product" className="relative py-24 md:py-32 overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,176,0,0.2), transparent)' }} />

      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(255,119,0,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-20"
          style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'none' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ border: '1px solid rgba(255,176,0,0.25)', background: 'rgba(255,176,0,0.06)' }}>
              <Camera size={12} className="text-[#FFB000]" />
              <span className="text-xs text-[#FFD985] font-medium tracking-widest uppercase">Our Services</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '0.04em', background: 'linear-gradient(175deg, #fff 0%, #888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Everything you need.<br />Nothing you don't.
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm lg:text-right">
            A complete security stack — from cameras to intelligence — delivered as a unified, always-on platform.
          </p>
        </div>

        {/* Service cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} inView={gridInView} delay={`${i * 0.07}s`} />
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 md:p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,176,0,0.08) 0%, rgba(255,119,0,0.05) 100%)',
            border: '1px solid rgba(255,176,0,0.15)',
          }}
        >
          <div>
            <p className="text-white font-semibold text-lg">Need a custom enterprise solution?</p>
            <p className="text-gray-400 text-sm mt-1">Talk to our team — we'll design a deployment that fits your exact needs.</p>
          </div>
          <button className="flex-shrink-0 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FFB000, #FF7700)', color: '#060605', boxShadow: '0 0 30px rgba(255,176,0,0.3)' }}>
            Talk to Sales →
          </button>
        </div>

      </div>
    </section>
  );
};

export default Services;
