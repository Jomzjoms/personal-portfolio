import React, { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

function LoadingScreen({ done }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#1e292c',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, flexDirection: 'column', gap: 20,
      opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'all',
      transition: 'opacity 0.8s 0.3s'
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem',
        color: 'var(--white)', letterSpacing: '-0.03em'
      }}>
        <span style={{ color: 'var(--purple)' }}>J</span>oms
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--purple)',
            animation: `loadDot 1.2s ${i * 0.2}s ease-in-out infinite`
          }} />
        ))}
      </div>
      <style>{`
        @keyframes loadDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Custom cursor
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const over = () => setBig(true);
    const out = () => setBig(false);
    window.addEventListener('mousemove', move);
    document.querySelectorAll('button, a, [style*="cursor: pointer"]').forEach(el => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div style={{
        position: 'fixed', left: pos.x - 4, top: pos.y - 4,
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--purple)', pointerEvents: 'none', zIndex: 99999,
        transition: 'transform 0.1s',
        transform: big ? 'scale(2)' : 'scale(1)'
      }} />
      <div style={{
        position: 'fixed', left: pos.x - 18, top: pos.y - 18,
        width: 36, height: 36, borderRadius: '50%',
        border: '1px solid rgba(96,81,155,0.5)',
        pointerEvents: 'none', zIndex: 99998,
        transition: 'left 0.12s, top 0.12s, transform 0.3s, opacity 0.3s',
        transform: big ? 'scale(1.6)' : 'scale(1)',
        opacity: big ? 0.6 : 0.3
      }} />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen done={loaded} />
      {!isMobile && <Cursor />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
