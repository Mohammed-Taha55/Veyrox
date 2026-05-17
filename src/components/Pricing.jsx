import React, { useEffect, useRef, useState } from 'react';
import { Check, Zap, Building2, Sparkles } from 'lucide-react';

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

const plans = [
  {
    icon: Zap,
    name: 'Starter',
    tagline: 'For small teams getting started',
    price: { monthly: 49, annual: 39 },
    color: '#888',
    features: [
      'Up to 10 cameras',
      'Basic AI detection',
      '7-day footage archive',
      'Email alerts',
      '2 user accounts',
      'Standard support',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'outline',
  },
  {
    icon: Sparkles,
    name: 'Professional',
    tagline: 'For growing security operations',
    price: { monthly: 149, annual: 119 },
    color: '#FFB000',
    popular: true,
    features: [
      'Up to 100 cameras',
      'Full AI threat suite',
      '30-day footage archive',
      'Real-time multi-channel alerts',
      'Unlimited users',
      'Access control integration',
      'Analytics dashboard',
      'Priority 24/7 support',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'filled',
  },
  {
    icon: Building2,
    name: 'Enterprise',
    tagline: 'For large-scale deployments',
    price: { monthly: null },
    color: '#FF7700',
    features: [
      'Unlimited cameras',
      'Custom AI model training',
      'Unlimited archive retention',
      'On-premise deployment option',
      'Dedicated account manager',
      'SLA guarantees',
      'API & webhook access',
      'White-label options',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
  },
];

const PlanCard = ({ plan, annual, delay, inView }) => {
  const { icon: Icon, name, tagline, price, color, popular, features, cta, ctaStyle } = plan;
  const displayPrice = price.monthly === null
    ? 'Custom'
    : `$${annual ? price.annual : price.monthly}`;

  return (
    <div
      className="relative flex flex-col p-6 md:p-8 rounded-2xl transition-all duration-700"
      style={{
        background: popular
          ? 'linear-gradient(160deg, rgba(255,176,0,0.1) 0%, rgba(255,119,0,0.05) 100%)'
          : 'rgba(255,255,255,0.02)',
        border: popular ? '1px solid rgba(255,176,0,0.4)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: popular ? '0 0 60px rgba(255,176,0,0.1)' : 'none',
        opacity: inView ? 1 : 0,
        transform: inView
          ? popular ? 'scale(1.03)' : 'translateY(0)'
          : 'translateY(50px)',
        transitionDelay: delay,
      }}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-widest whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg, #FFB000, #FF7700)', color: '#060605' }}>
          MOST POPULAR
        </div>
      )}

      {/* Icon + name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <div>
          <h3 className="text-white font-bold text-base">{name}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{tagline}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* Price */}
      <div className="mb-6">
        {price.monthly === null ? (
          <p className="text-4xl font-black text-white" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.05em' }}>Custom</p>
        ) : (
          <div className="flex items-end gap-1">
            <span className="text-4xl font-black tabular-nums" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color, letterSpacing: '0.05em' }}>{displayPrice}</span>
            <span className="text-gray-500 text-sm mb-1.5">/ mo</span>
          </div>
        )}
        {annual && price.annual && (
          <p className="text-xs text-green-400 mt-1">Save ${(price.monthly - price.annual) * 12}/yr with annual billing</p>
        )}
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${color}20` }}>
              <Check size={9} style={{ color }} />
            </div>
            <span className="text-gray-300">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className="w-full py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02]"
        style={ctaStyle === 'filled'
          ? { background: `linear-gradient(135deg, ${color}, #FF7700)`, color: '#060605', boxShadow: `0 0 30px ${color}30` }
          : { border: `1px solid ${color}40`, color, background: `${color}08` }
        }
      >
        {cta}
      </button>
    </div>
  );
};

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const [headRef, headInView] = useInView(0.3);
  const [cardsRef, cardsInView] = useInView(0.05);

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,176,0,0.2), transparent)' }} />

      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, rgba(255,176,0,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, rgba(255,119,0,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headRef} className="flex flex-col items-center text-center mb-12 md:mb-16"
          style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'none' : 'translateY(30px)', transition: 'all 0.7s' }}>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{ border: '1px solid rgba(255,176,0,0.25)', background: 'rgba(255,176,0,0.06)' }}>
            <Sparkles size={12} className="text-[#FFB000]" />
            <span className="text-xs text-[#FFD985] font-medium tracking-widest uppercase">Pricing</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '0.04em', background: 'linear-gradient(175deg, #fff 0%, #888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Simple, Transparent<br />Pricing
          </h2>
          <p className="mt-5 text-gray-400 text-sm leading-relaxed max-w-md">
            No hidden fees. No long-term lock-in. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center gap-3 mt-8 p-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={!annual ? { background: 'rgba(255,176,0,0.15)', color: '#FFD985', border: '1px solid rgba(255,176,0,0.3)' } : { color: '#666' }}
            >Monthly</button>
            <button
              onClick={() => setAnnual(true)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
              style={annual ? { background: 'rgba(255,176,0,0.15)', color: '#FFD985', border: '1px solid rgba(255,176,0,0.3)' } : { color: '#666' }}
            >
              Annual
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>–20%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
          {plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} annual={annual} inView={cardsInView} delay={`${i * 0.1}s`} />
          ))}
        </div>

        {/* Trust footnote */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          {['No credit card required', '14-day free trial', 'SOC 2 Type II certified', 'Cancel anytime'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check size={13} className="text-[#FFB000]" />
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
