import React, { useState } from 'react';
import { Mail, ArrowRight, Shield, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  Product: ['Smart Detection', 'Access Control', 'Live Mapping', 'Forensic Search', 'Analytics', 'Integrations'],
  Company:  ['About Veyrox', 'Careers', 'Press Kit', 'Partners', 'Blog', 'Contact'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'Compliance', 'GDPR'],
  Support:  ['Documentation', 'API Reference', 'Status Page', 'Community', 'Help Center', 'Release Notes'],
};

const SocialIcon = ({ href, label, children }) => (
  <a href={href} aria-label={label}
    className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:text-white hover:bg-white/8"
    style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
    {children}
  </a>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(''); }
  };

  return (
    <footer id="footer" className="relative overflow-hidden">
      {/* Top separator line */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,176,0,0.25), transparent)' }} />

      {/* Big CTA banner */}
      <div className="relative py-20 md:py-24 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,119,0,0.12) 0%, transparent 65%)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,176,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5 }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ border: '1px solid rgba(255,176,0,0.25)', background: 'rgba(255,176,0,0.06)' }}>
            <Shield size={12} className="text-[#FFB000]" />
            <span className="text-xs text-[#FFD985] font-medium tracking-widest uppercase">Get Protected Today</span>
          </div>

          <h2 className="mb-5 max-w-2xl"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '0.04em', background: 'linear-gradient(175deg, #fff 0%, #aaa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Your Cameras Are Watching.<br />Is Your AI?
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-10">
            Join thousands of security teams who trust Veyrox to protect what matters most.
            Start your 14-day free trial — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFB000, #FF7700)', color: '#060605', boxShadow: '0 0 40px rgba(255,176,0,0.3)' }}>
              Start Free Trial
            </button>
            <button className="px-8 py-3.5 rounded-full font-medium text-sm tracking-wide text-gray-300 transition-all duration-300 hover:text-white flex items-center gap-2"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
              Schedule a Demo <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="relative border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">

            {/* Brand column (2 cols) */}
            <div className="sm:col-span-2 lg:col-span-2">
              {/* Logo */}
              <a href="#" className="inline-flex items-center gap-2.5 mb-5">
                <div className="relative flex items-center justify-center w-8 h-8">
                  <div className="absolute w-3.5 h-3.5 bg-[#FFB000] rotate-45 -translate-x-1.5 -translate-y-1.5" />
                  <div className="absolute w-3.5 h-3.5 bg-[#FF7700] rotate-45 translate-x-0.5 translate-y-0.5" />
                </div>
                <span className="text-lg font-bold tracking-[0.2em] uppercase">Veyrox</span>
              </a>

              <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[260px]">
                AI-powered camera security for enterprises. Real-time detection, zero blind spots.
              </p>

              {/* Contact info */}
              <div className="flex flex-col gap-3 mb-7">
                {[
                  { icon: MapPin, text: '48 Security Ave, San Francisco, CA' },
                  { icon: Phone,  text: '+1 (888) 123-4567' },
                  { icon: Mail,   text: 'hello@veyrox.ai' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-2.5 text-xs text-gray-600">
                    <Icon size={13} className="text-[#FFB000] mt-0.5 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2">
                <SocialIcon href="#" label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </SocialIcon>
                <SocialIcon href="#" label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </SocialIcon>
                <SocialIcon href="#" label="X / Twitter">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </SocialIcon>
                <SocialIcon href="#" label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </SocialIcon>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">{heading}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-[#FFD985] transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-14 pt-10 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-white font-semibold text-sm mb-1">Stay ahead of threats.</p>
              <p className="text-gray-500 text-xs">Get security insights and product updates in your inbox.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-1 md:max-w-md">
              {submitted ? (
                <div className="flex-1 flex items-center gap-2 text-green-400 text-sm">
                  <Shield size={16} /> You're subscribed — stay safe out there!
                </div>
              ) : (
                <>
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 rounded-full text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,176,0,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <button type="submit"
                    className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #FFB000, #FF7700)', color: '#060605' }}>
                    Subscribe <ArrowRight size={13} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-700">© 2025 Veyrox Inc. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff9900]" style={{ boxShadow: '0 0 6px #22c55e' }} />
            <p className="text-xs text-gray-700">Designed by Taha</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
