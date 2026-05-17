import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

const App = () => {
  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        background: '#060605',
        fontFamily: "'Inter', sans-serif",
        // Global selection highlight
        WebkitUserSelect: 'text',
      }}
    >
      <style>{`
        ::selection { background: rgba(255,176,0,0.25); color: #FFD985; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Subtle global top-right ambient */}
      <div className="fixed top-0 right-0 w-[700px] h-[700px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle at top right, rgba(255,119,0,0.07) 0%, transparent 65%)' }} />
      {/* Bottom-left ambient */}
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(255,176,0,0.05) 0%, transparent 65%)' }} />

      <Navbar />
      <Hero />
      <FeaturesSection />
      <Services />
      <Pricing />
      <Footer />
    </div>
  );
};

export default App;