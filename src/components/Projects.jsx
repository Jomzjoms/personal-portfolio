import React from 'react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'J&D Apparel E-commerce Website',
      description: 'My first year project for Web Development subject. A fully responsive e-commerce website built with HTML, CSS, and a little bit of JavaScript.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://jomzjoms.github.io/JnD-apparel/',
      github: 'https://github.com/Jomzjoms/JnD-apparel'
    },
    {
      id: 2,
      title: 'Valentines Day Virtual Message Card',
      description: 'A virtual message card created for Valentine\'s Day. Built using HTML, and CSS it features interactive elements and animations to create a heartfelt experience.',
      technologies: ['HTML', 'CSS'],
      link: 'https://jomzjoms.github.io/Valentines-Day/',
      github: 'https://github.com/Jomzjoms/Valentines-Day'
    },
  ];

  return (
    <section id="projects" style={{ padding: '80px 20px', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          marginBottom: '60px',
          color: 'var(--white)',
          textAlign: 'center'
        }}>
          Featured <span style={{ color: 'var(--purple)' }}>Projects</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {projects.map(project => (
            <div
              key={project.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(96, 81, 155, 0.3)',
                borderRadius: '12px',
                padding: '30px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(96, 81, 155, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(96, 81, 155, 0.6)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(96, 81, 155, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: '12px'
              }}>
                {project.title}
              </h3>

              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '20px',
                lineHeight: 1.6
              }}>
                {project.description}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '20px'
              }}>
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(96, 81, 155, 0.2)',
                      color: 'var(--purple)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                marginTop: '20px'
              }}>
                <a
                  href={project.link}
                  style={{
                    color: 'var(--purple)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  View Live →
                </a>
                <a
                  href={project.github}
                  style={{
                    color: 'var(--purple)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
