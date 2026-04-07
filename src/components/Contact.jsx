import React, { useRef, useState } from 'react';

function useInView(ref) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'joemaricuyacot8@gmail.com',
    href: 'mailto:joemaricuyacot8@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12 19.79 19.79 0 0 1 1.4 3.5 2 2 0 0 1 3.37 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6 6l.71-.71a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '09953595450',
    href: 'tel:09953595450',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Pasig City, Metro Manila, Philippines',
    href: null,
  }
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('joemaricuyacot8@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} style={{
      padding: '120px 0 0',
      background: 'linear-gradient(180deg, #1e292c 0%, #171921 100%)',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse, rgba(96,81,155,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '72px',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s'
        }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.8rem',
            color: 'var(--purple-light)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12
          }}>Let's work together</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20
          }}>Get In Touch</h2>
          <p style={{ color: 'rgba(191,192,209,0.6)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8, fontSize: '1rem' }}>
            I'm currently seeking internship opportunities in frontend development. 
            If you'd like to connect or collaborate, I'd love to hear from you!
          </p>
        </div>

        {/* Contact cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px', marginBottom: '80px',
          opacity: inView ? 1 : 0, transition: 'all 0.8s 0.1s'
        }}>
          {contactInfo.map((item, i) => (
            <div
              key={item.label}
              onClick={item.label === 'Email' ? copyEmail : undefined}
              style={{
                background: 'rgba(49,50,62,0.4)',
                border: '1px solid rgba(96,81,155,0.2)',
                borderRadius: '16px', padding: '28px',
                backdropFilter: 'blur(10px)',
                cursor: item.href || item.label === 'Email' ? 'pointer' : 'default',
                transition: 'all 0.35s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${0.15 + i * 0.1}s`
              }}
              onMouseEnter={e => {
                if (item.href || item.label === 'Email') {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(96,81,155,0.5)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(96,81,155,0.15)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(96,81,155,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '12px',
                background: 'rgba(96,81,155,0.2)', border: '1px solid rgba(96,81,155,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--purple-light)', marginBottom: '16px'
              }}>
                {item.icon}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--purple-light)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '6px' }}>
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: 500, wordBreak: 'break-all' }}>
                  {item.value}
                </a>
              ) : (
                <p style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: 500 }}>{item.value}</p>
              )}
              {item.label === 'Email' && (
                <p style={{ fontSize: '0.72rem', color: copied ? '#6fcf97' : 'rgba(191,192,209,0.35)', marginTop: 6, transition: 'color 0.3s' }}>
                  {copied ? '✓ Copied to clipboard!' : 'Click to copy'}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center', marginBottom: '80px',
          opacity: inView ? 1 : 0, transition: 'all 0.8s 0.4s'
        }}>
          <a
            href="mailto:joemaricuyacot8@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 40px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #60519b, #7a6bb5)',
              color: 'var(--white)', fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em',
              boxShadow: '0 4px 24px rgba(96,81,155,0.4)',
              transition: 'all 0.3s', border: '1px solid rgba(255,255,255,0.1)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(96,81,155,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(96,81,155,0.4)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            Send me a message
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(96,81,155,0.12)',
        padding: '32px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px',
        maxWidth: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
            background: 'var(--purple)', boxShadow: '0 0 8px var(--purple)'
          }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--white)', fontSize: '1rem' }}>Joms</span>
        </div>
        <p style={{ color: 'rgba(191,192,209,0.35)', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
          © {new Date().getFullYear()} Joemari Cuyacot · Designed & Built with Passion
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['About', 'Projects', 'Contact'].map(link => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(191,192,209,0.4)',
                background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--light)'}
              onMouseLeave={e => e.target.style.color = 'rgba(191,192,209,0.4)'}
            >
              {link}
            </button>
          ))}
        </div>
      </footer>
    </section>
  );
}
