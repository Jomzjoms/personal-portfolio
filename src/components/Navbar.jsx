import React, { useState, useEffect } from 'react';

const navLinks = ['Home', 'About', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (link) => {
    setActive(link);
    setMenuOpen(false);
    const id = link.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '14px 48px' : '22px 48px',
      background: scrolled ? 'rgba(30,41,44,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(96,81,155,0.18)' : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    }}>
      {/* Logo */}
      <div
        onClick={() => handleNav('Home')}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem',
          color: 'var(--white)', cursor: 'pointer', letterSpacing: '-0.02em',
          display: 'flex', alignItems: 'center', gap: '6px'
        }}
      >
        <span style={{
          display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
          background: 'var(--purple)', marginBottom: 2,
          boxShadow: '0 0 12px var(--purple)'
        }} />
        Zmojz
      </div>

      {/* Desktop Nav */}
      <ul style={{ display: 'flex', gap: '36px', listStyle: 'none', alignItems: 'center' }}
        className="desktop-nav">
        {navLinks.map(link => (
          <li key={link}>
            <button
              onClick={() => handleNav(link)}
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.9rem',
                color: active === link ? 'var(--white)' : 'var(--light)',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                position: 'relative', padding: '4px 0',
                transition: 'color 0.3s',
                background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              {link}
              <span style={{
                position: 'absolute', bottom: -2, left: 0,
                width: active === link ? '100%' : '0%',
                height: '2px', background: 'var(--purple)',
                borderRadius: 2, transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: active === link ? '0 0 8px var(--purple)' : 'none'
              }} />
            </button>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(o => !o)}
        className="hamburger"
        style={{
          display: 'none', flexDirection: 'column', gap: '5px',
          width: 28, height: 20, justifyContent: 'center', background: 'none', border: 'none'
        }}
        aria-label="Toggle menu"
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', height: '2px', background: 'var(--light)', borderRadius: 2,
            width: i === 1 ? '70%' : '100%',
            transition: 'all 0.3s',
            transformOrigin: 'center',
            transform: menuOpen
              ? (i === 0 ? 'rotate(45deg) translate(4px, 4px)' : i === 2 ? 'rotate(-45deg) translate(4px, -4px)' : 'scaleX(0)')
              : 'none'
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(30,41,44,0.97)', backdropFilter: 'blur(20px)',
          zIndex: 999, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '40px'
        }}>
          {navLinks.map((link, i) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.2rem',
                color: active === link ? 'var(--white)' : 'rgba(191,192,209,0.6)',
                letterSpacing: '-0.02em', background: 'none', border: 'none',
                cursor: 'pointer', animation: `fadeInUp 0.4s ${i * 0.08}s both`
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
