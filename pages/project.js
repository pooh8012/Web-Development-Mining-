// // pages/project.js
// import Head from 'next/head';
// import { motion } from 'framer-motion';
// import NeonButton from '@/components/UI/NeonButton';

// export default function ProjectPage() {
//   return (
//     <>
//       <Head>
//         <title>Project | Data Mining & Mining</title>
//         <meta
//           name="description"
//           content="Explore mining and data mining connections."
//         />
//       </Head>

//       <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
//         <main className="flex-1">
//           <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-20 md:pt-0">
//             <div className="relative z-10 text-center w-full max-w-6xl mx-auto">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <h1 className="font-display font-bold mb-3 sm:mb-6 leading-tight">
//                   <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl animate-glitch neon-text">
//                     Web Development Mining
//                   </span>
//                   <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-1 sm:mt-3 gradient-text">
//                     and Data mining + AI
//                   </span>
//                 </h1>

//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3, duration: 0.8 }}
//                   className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-8 md:mb-12 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed"
//                 >
//                   Interactive Research Platform for Mining ↔ Data Mining
//                   Connections
//                 </motion.p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6, duration: 0.8 }}
//                   className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2"
//                 >
//                   <NeonButton
//                     href="/visualizations"
//                     size="lg"
//                     className="w-full sm:w-auto px-6 sm:px-9 py-3 sm:py-4"
//                   >
//                     Explore Visualizations
//                   </NeonButton>
//                   <NeonButton
//                     href="/games"
//                     variant="outline"
//                     size="lg"
//                     className="w-full sm:w-auto px-6 sm:px-9 py-3 sm:py-4"
//                   >
//                     Explore Games
//                   </NeonButton>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// }
import { useState, useEffect, useRef } from 'react';

/* ─── Animated grid background ─── */
function GridBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage: `
          linear-gradient(rgba(168, 85, 247, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.04) 1px, transparent 1px)
        `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
          maskImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 70%)',
        }}
      />
    </div>
  );
}

/* ─── Floating icon orb ─── */
function FloatingOrb({ emoji, x, y, size, delay, color }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${parseInt(size) * 0.45}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${color}18, ${color}08)`,
        border: `1px solid ${color}20`,
        animation: `orb-float ${5 + delay}s ease-in-out infinite alternate`,
        animationDelay: `${delay * -1}s`,
        backdropFilter: 'blur(4px)',
      }}
    >
      {emoji}
    </div>
  );
}

/* ─── Glowing card placeholder ─── */
function ProjectSlot({ icon, label, color, index }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0) scale(1)'
          : 'translateY(30px) scale(0.95)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
        cursor: 'default',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          padding: '1.5px',
          background: hovered
            ? `linear-gradient(135deg, ${color}55, transparent 60%, ${color}30)`
            : `linear-gradient(135deg, ${color}20, transparent 60%, ${color}10)`,
          transition: 'all 0.4s ease',
        }}
      >
        <div
          style={{
            borderRadius: '19px',
            padding: '32px 24px',
            background:
              'linear-gradient(160deg, rgba(18, 10, 35, 0.95), rgba(10, 5, 22, 0.98))',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {/* Hover glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none',
            }}
          />

          {/* Icon */}
          <div
            style={{
              fontSize: '40px',
              filter: hovered ? `drop-shadow(0 0 16px ${color}66)` : 'none',
              transform: hovered ? 'scale(1.15) translateY(-4px)' : 'scale(1)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {icon}
          </div>

          {/* Label */}
          <div
            style={{
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: "'Orbitron', sans-serif",
              color: hovered ? '#f0e6ff' : 'rgba(200,190,220,0.6)',
              transition: 'color 0.3s ease',
              position: 'relative',
              zIndex: 1,
              letterSpacing: '0.02em',
            }}
          >
            {label}
          </div>

          {/* Dashed line separator */}
          <div
            style={{
              width: '40px',
              height: '1px',
              borderTop: `1px dashed ${color}33`,
              position: 'relative',
              zIndex: 1,
            }}
          />

          {/* Coming soon tag */}
          <div
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: color,
              opacity: 0.6,
              fontFamily: "'Rajdhani', sans-serif",
              position: 'relative',
              zIndex: 1,
            }}
          >
            Coming Soon
          </div>

          {/* Shimmer line at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '10%',
              right: '10%',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
              opacity: hovered ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ProjectPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [dots, setDots] = useState('');

  // Animated dots for "building"
  useEffect(() => {
    const id = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 600);
    return () => clearInterval(id);
  }, []);

  const handleNotify = () => {
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const projectSlots = [
    { icon: '🔬', label: 'AI Research Tools', color: '#a855f7' },
    { icon: '📊', label: 'Data Visualizations', color: '#06b6d4' },
    { icon: '⛏️', label: 'Mining Simulations', color: '#f97316' },
    { icon: '🎮', label: 'Interactive Games', color: '#ec4899' },
    { icon: '🧠', label: 'ML Experiments', color: '#10b981' },
    { icon: '🗺️', label: '3D Mapping', color: '#eab308' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(160deg, #0a0214 0%, #120018 40%, #1a0020 100%)',
        color: '#fff',
        fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');

        @keyframes orb-float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulse-border {
          0%, 100% { border-color: rgba(168, 85, 247, 0.15); }
          50% { border-color: rgba(168, 85, 247, 0.35); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #06b6d4, #a855f7, #ec4899);
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .neon-text {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::selection { background: rgba(168, 85, 247, 0.3); }
      `}</style>

      {/* Grid background */}
      <GridBackground />

      {/* Glow blobs */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #a855f712 0%, transparent 70%)',
          top: '-5%',
          left: '-15%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #06b6d40d 0%, transparent 70%)',
          bottom: '0%',
          right: '-10%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ec489908 0%, transparent 70%)',
          top: '50%',
          left: '30%',
          pointerEvents: 'none',
        }}
      />

      {/* Scan line */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.1), transparent)',
          animation: 'scan-line 8s linear infinite',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb
        emoji="⚡"
        x="8%"
        y="15%"
        size="48px"
        delay={0}
        color="#a855f7"
      />
      <FloatingOrb
        emoji="💎"
        x="85%"
        y="20%"
        size="42px"
        delay={1.5}
        color="#06b6d4"
      />
      <FloatingOrb
        emoji="🔗"
        x="90%"
        y="55%"
        size="38px"
        delay={3}
        color="#ec4899"
      />
      <FloatingOrb
        emoji="⚙️"
        x="5%"
        y="65%"
        size="44px"
        delay={2}
        color="#f97316"
      />

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <section
        style={{
          padding: '60px 24px 100px',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '56px',
            paddingTop: '40px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#a855f7',
              fontFamily: "'Orbitron', sans-serif",
              padding: '8px 22px',
              borderRadius: '24px',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              background: 'rgba(168, 85, 247, 0.05)',
              marginBottom: '32px',
              animation: 'pulse-border 3s ease-in-out infinite',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#a855f7',
                boxShadow: '0 0 8px #a855f7',
                display: 'inline-block',
              }}
            />
            Under Development
          </div>

          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif",
              marginBottom: '20px',
              lineHeight: 1.1,
            }}
          >
            <span
              className="neon-text"
              style={{ display: 'block', marginBottom: '8px' }}
            >
              Upcoming
            </span>
            <span className="gradient-text">Projects</span>
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: 'rgba(200,190,220,0.45)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            We're building something exciting at the intersection of mining,
            data science, and AI. Here's a glimpse of what's coming.
          </p>
        </div>

        {/* ── Status bar ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '20px',
                fontWeight: 900,
                color: '#a855f7',
              }}
            >
              6
            </span>
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(200,190,220,0.4)',
                fontWeight: 500,
              }}
            >
              Projects in Pipeline
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
                animation: 'pulse-border 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(200,190,220,0.4)',
                fontWeight: 500,
                fontFamily: 'monospace',
              }}
            >
              Building{dots}
            </span>
          </div>
        </div>

        {/* ── Project Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
            marginBottom: '64px',
            flex: 1,
          }}
        >
          {projectSlots.map((slot, i) => (
            <ProjectSlot key={i} {...slot} index={i} />
          ))}
        </div>

        {/* ── Notify CTA ── */}
        <div
          style={{
            textAlign: 'center',
            padding: '44px 28px',
            borderRadius: '24px',
            background:
              'linear-gradient(160deg, rgba(20, 12, 38, 0.6), rgba(12, 6, 24, 0.8))',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Shimmer effect */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              overflow: 'hidden',
              borderRadius: '24px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(168,85,247,0.03), transparent)',
                animation: 'shimmer 4s ease-in-out infinite',
              }}
            />
          </div>

          {!subscribed ? (
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>🔔</div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  fontFamily: "'Orbitron', sans-serif",
                  marginBottom: '10px',
                  color: '#f0e6ff',
                }}
              >
                Get Notified
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(200,190,220,0.4)',
                  marginBottom: '28px',
                  maxWidth: '360px',
                  margin: '0 auto 28px',
                }}
              >
                Be the first to know when we launch new projects.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  maxWidth: '440px',
                  margin: '0 auto',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNotify()}
                  placeholder="your@email.com"
                  style={{
                    flex: '1 1 220px',
                    padding: '14px 20px',
                    borderRadius: '14px',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: "'Rajdhani', sans-serif",
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)')
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'rgba(168, 85, 247, 0.2)')
                  }
                />
                <button
                  onClick={handleNotify}
                  style={{
                    padding: '14px 32px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 24px rgba(168, 85, 247, 0.3)',
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow =
                      '0 6px 32px rgba(168, 85, 247, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow =
                      '0 4px 24px rgba(168, 85, 247, 0.3)';
                  }}
                >
                  Notify Me
                </button>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '40px', marginBottom: '14px' }}>✨</div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  fontFamily: "'Orbitron', sans-serif",
                  marginBottom: '10px',
                }}
              >
                <span className="gradient-text">You're In!</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(200,190,220,0.45)' }}>
                We'll let you know as soon as something drops.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
