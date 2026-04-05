import React, { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero.jpg';

const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'CS Student'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,81,155,${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96,81,155,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh', position: 'relative', display: 'flex',
      alignItems: 'center', overflow: 'hidden',
      background: 'linear-gradient(135deg, #1e292c 0%, #222638 50%, #1e292c 100%)'
    }}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', right: '10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,81,155,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,81,155,0.12) 0%, transparent 70%)',
        filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '60px', zIndex: 1, position: 'relative', width: '100%',
        flexWrap: 'wrap'
      }}>
        {/* Text Content */}
        <div style={{
          flex: '1 1 480px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)'
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(96,81,155,0.15)', border: '1px solid rgba(96,81,155,0.3)',
            borderRadius: 100, padding: '6px 16px', marginBottom: '24px'
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#60519b', display: 'block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Available for Internship
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1.05,
            color: 'var(--white)', letterSpacing: '-0.03em', marginBottom: '16px'
          }}>
            Hey, I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #60519b, #8b7bc8, #bfc0d1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Joms</span>
          </h1>

          <div style={{ height: '52px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              color: 'var(--purple-light)',
              letterSpacing: '-0.01em'
            }}>
              {displayed}
              <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--purple)' }}>|</span>
            </span>
          </div>

          <p style={{
            fontSize: '1.05rem', color: 'rgba(191,192,209,0.75)', lineHeight: 1.75,
            maxWidth: '500px', marginBottom: '40px', fontWeight: 300
          }}>
            A passionate 4th-year Computer Science student crafting beautiful, interactive web experiences. 
            Building the future of the web, one pixel at a time.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 32px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #60519b, #7a6bb5)',
                color: 'var(--white)', fontFamily: 'var(--font-display)',
                fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 24px rgba(96,81,155,0.4)',
                transition: 'all 0.3s', cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 32px rgba(96,81,155,0.55)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 24px rgba(96,81,155,0.4)';
              }}
            >
              View Projects
            </button>
            <a
              href="/personal-portfolio/resume.docx" target="_blank" rel="noopener noreferrer"
              download="Joemari-Cuyacot-Resume.docx"
              style={{
                padding: '14px 32px', borderRadius: '8px',
                background: 'transparent',
                color: 'var(--white)', fontFamily: 'var(--font-display)',
                fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em',
                border: '1px solid rgba(96,81,155,0.5)',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.3s', cursor: 'pointer', textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(96,81,155,0.15)';
                e.currentTarget.style.borderColor = 'rgba(96,81,155,0.8)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(96,81,155,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>

          {/* Social chips */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
            {[
              { label: 'Gmail', icon: '✉', href: 'mailto:joemaricuyacot8@gmail.com' },
              { label: 'GitHub', icon: '⌥', href: 'https://github.com/Jomzjoms' },
              { label: 'Facebook', icon: 'F', href: 'https://www.facebook.com/joemari.pisan/' },
              { label: 'Instagram', icon: '📷', href: 'https://www.instagram.com/z_mojz' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{
                  padding: '7px 14px', borderRadius: '100px',
                  background: 'rgba(49,50,62,0.8)', border: '1px solid rgba(96,81,155,0.2)',
                  fontSize: '0.82rem', color: 'var(--light)', fontFamily: 'var(--font-body)',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.3s', textDecoration: 'none'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(96,81,155,0.6)'; e.currentTarget.style.color = 'var(--white)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(96,81,155,0.2)'; e.currentTarget.style.color = 'var(--light)'; }}
              >
                <span>{s.icon}</span> {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div style={{
          flex: '0 0 auto',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          transition: 'all 1.1s 0.2s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', justifyContent: 'center'
        }}>
          <div style={{ position: 'relative' }}>
            {/* Rotating border ring */}
            <div style={{
              position: 'absolute', inset: '-1vw',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #60519b, transparent, #60519b)',
              animation: 'spin 8s linear infinite',
              zIndex: 0
            }} />
            {/* Static ring */}
            <div style={{
              position: 'absolute', inset: '-2.5vw',
              borderRadius: '50%',
              border: '1px dashed rgba(96,81,155,0.3)',
              zIndex: 0
            }} />
            {/* Profile image */}
            
            <img 
              src={heroImg}
              alt="Profile"
              style={{
                width: 'clamp(220px, 35vw, 420px)',
                height: 'clamp(220px, 35vw, 420px)',
                borderRadius: '50%',
                position: 'relative', zIndex: 1, overflow: 'hidden',
                border: '3px solid rgba(30,41,44,1)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1,
        opacity: visible ? 0.6 : 0, transition: 'opacity 1s 1s'
      }}>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--light)' }}>Scroll</span>
        <div style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom, var(--purple), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite'
        }} />
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(96,81,155,0.5); } 50% { box-shadow: 0 0 0 6px rgba(96,81,155,0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scrollPulse { 0%,100% { opacity: 0.6; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.1); } }
        @media (max-width: 768px) {
          #home > div { justify-content: center; flex-direction: column; padding: 0 20px; }
          #home > div > div:first-child { text-align: center; width: 100%; }
          #home > div > div:first-child > div:nth-child(4) { justify-content: center; }
          #home > div > div:first-child > div:nth-child(5) { display: flex; gap: 12px; flex-wrap: nowrap; justify-content: center; }
          #home > div > div:first-child > div:nth-child(5) > button,
          #home > div > div:first-child > div:nth-child(5) > a { flex: 1; min-width: 0; padding: 12px 20px !important; font-size: 0.85rem !important; }
          #home > div > div:last-child { order: -1; margin-bottom: 10px; margin-top: 40px; }
        }
      `}</style>
    </section>
  );
}