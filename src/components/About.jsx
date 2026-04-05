import React, { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'HTML5', level: 90, color: '#e34c26' },
  { name: 'CSS3', level: 85, color: '#264de4' },
  { name: 'JavaScript', level: 65, color: '#f7df1e' },
  { name: 'React', level: 55, color: '#61dafb' },
  { name: 'PHP', level: 60, color: '#8892bf' },
  { name: 'MySQL', level: 50, color: '#00758f' },
  { name: 'Bootstrap', level: 30, color: '#7952b3' },
  { name: 'Git', level: 40, color: '#f05032' },
];

const techTags = ['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'MySQL', 'Bootstrap', 'Git', 'Figma', 'VS Code', 'Responsive Design'];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function SkillBar({ skill, delay, animate }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--white)' }}>{skill.name}</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--light)', opacity: 0.7 }}>{skill.level}%</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(49,50,62,0.8)', borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(96,81,155,0.1)' }}>
        <div style={{
          height: '100%', borderRadius: '3px',
          width: animate ? `${skill.level}%` : '0%',
          background: `linear-gradient(90deg, var(--purple), ${skill.color})`,
          transition: `width 1s ${delay}s cubic-bezier(0.4,0,0.2,1)`,
          boxShadow: animate ? `0 0 10px ${skill.color}40` : 'none'
        }} />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="about" ref={ref} style={{
      padding: '120px 0', position: 'relative',
      background: 'linear-gradient(180deg, #1e292c 0%, #222638 50%, #1e292c 100%)'
    }}>
      {/* Decorative line */}
      <div style={{
        position: 'absolute', left: 0, top: '50%',
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(96,81,155,0.15), transparent)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '72px', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.8rem',
            color: 'var(--purple-light)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12
          }}>Get to know me</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1.1
          }}>About Me</h2>
          <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, var(--purple), transparent)', borderRadius: 2, marginTop: 14 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
          {/* Left: Bio */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'all 0.9s 0.1s cubic-bezier(0.4,0,0.2,1)'
          }}>
            <div style={{
              background: 'rgba(49,50,62,0.4)', border: '1px solid rgba(96,81,155,0.2)',
              borderRadius: '16px', padding: '32px', marginBottom: '28px',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--white)', marginBottom: '8px' }}>
                Joemari Cuyacot
              </h3>
              <p style={{ color: 'var(--purple-light)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '20px', letterSpacing: '0.05em' }}>
                BS Computer Science — 4th Year
              </p>
              <p style={{ color: 'rgba(191,192,209,0.75)', lineHeight: 1.8, fontSize: '0.97rem', fontWeight: 300, marginBottom: '16px' }}>
                I'm a driven Computer Science student at <strong style={{ color: 'var(--light)', fontWeight: 500 }}>Arellano University Main Campus</strong>, with a deep passion for creating compelling web interfaces. I believe that great frontend development lives at the intersection of code and design.
              </p>
              <p style={{ color: 'rgba(191,192,209,0.75)', lineHeight: 1.8, fontSize: '0.97rem', fontWeight: 300 }}>
                My journey into frontend development began with a curiosity about how beautiful websites come to life. Today, I channel that curiosity into building responsive, accessible, and visually stunning web experiences that put users first.
              </p>
            </div>

            {/* Info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { label: 'Location', value: 'Manila, Philippines' },
                { label: 'University', value: 'Arellano University' },
                { label: 'Year Level', value: '4th Year' },
                { label: 'Program', value: 'BS Computer Science' },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'rgba(49,50,62,0.4)', border: '1px solid rgba(96,81,155,0.15)',
                  borderRadius: '10px', padding: '14px 16px'
                }}>
                  <p style={{ fontSize: '0.72rem', color: 'var(--purple-light)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px', fontWeight: 600 }}>{item.label}</p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--white)', fontWeight: 500 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Skills */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.9s 0.2s cubic-bezier(0.4,0,0.2,1)'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
              color: 'var(--white)', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: 10
            }}>
              <span style={{ display: 'inline-block', width: 28, height: 2, background: 'var(--purple)', borderRadius: 1 }} />
              Technical Skills
            </h3>
            {skills.map((s, i) => (
              <SkillBar key={s.name} skill={s} delay={i * 0.08} animate={inView} />
            ))}

            {/* Tech tags */}
            <div style={{ marginTop: '36px' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
                color: 'var(--white)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: 10
              }}>
                <span style={{ display: 'inline-block', width: 28, height: 2, background: 'var(--purple)', borderRadius: 1 }} />
                Tools & Technologies
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {techTags.map((tag, i) => (
                  <span key={tag} style={{
                    padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(96,81,155,0.1)',
                    border: '1px solid rgba(96,81,155,0.25)',
                    fontSize: '0.82rem', color: 'var(--light)',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s',
                    cursor: 'default',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'scale(1)' : 'scale(0.8)',
                    transitionDelay: `${0.4 + i * 0.04}s`
                  }}
                    onMouseEnter={e => { e.target.style.background = 'rgba(96,81,155,0.25)'; e.target.style.color = 'var(--white)'; e.target.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.target.style.background = 'rgba(96,81,155,0.1)'; e.target.style.color = 'var(--light)'; e.target.style.transform = 'translateY(0)'; }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
