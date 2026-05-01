// pages/projects/collage.js
import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Words that appear/disappear on interaction
const FLOATING_WORDS = [
  'extraction', 'data', 'mining', 'labor', 'capital', 'resource',
  'digital', 'analog', 'exploitation', 'value', 'raw', 'refined',
  'infrastructure', 'network', 'trace', 'archive', 'algorithm',
  'earth', 'silicon', 'cloud', 'depth', 'surface', 'commodity',
];

export default function CollagePage() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [idleTime, setIdleTime] = useState(0);
  const [words, setWords] = useState([]);
  const idleTimerRef = useRef(null);
  const wordIdRef = useRef(0);

  // Images — use the illustrations + mining_data_m
  const images = [
    { src: '/images/Illustration1.png', alt: 'Mining collage 1' },
    { src: '/images/Illustration2.png', alt: 'Data mining collage 2' },
    { src: '/images/Mining_data_m.png', alt: 'Mining Data Mining' },
  ];

  // Track mouse movement
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setIdleTime(0);

    // Spawn a floating word occasionally
    if (Math.random() > 0.92) {
      const word = FLOATING_WORDS[Math.floor(Math.random() * FLOATING_WORDS.length)];
      const id = wordIdRef.current++;
      setWords((prev) => [
        ...prev.slice(-15), // Keep max 15 words
        {
          id,
          text: word,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          born: Date.now(),
        },
      ]);
    }
  }, []);

  // Idle timer — blur increases with idle time
  useEffect(() => {
    idleTimerRef.current = setInterval(() => {
      setIdleTime((t) => Math.min(t + 1, 30));
    }, 500);
    return () => clearInterval(idleTimerRef.current);
  }, []);

  // Clean up old words
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setWords((prev) => prev.filter((w) => now - w.born < 4000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const blurAmount = Math.min(idleTime * 0.5, 12);

  return (
    <>
      <Head>
        <title>Collage: Mining Data-Mining | D_Mining Lab</title>
      </Head>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 bg-black overflow-hidden cursor-crosshair"
        style={{ zIndex: 50 }}
      >
        {/* Back button */}
        <Link
          href="/projects"
          className="fixed top-6 left-6 z-[60] text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
        >
          ← Projects
        </Link>

        {/* Title overlay */}
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[55] pointer-events-none select-none text-center"
          style={{
            opacity: Math.max(0.05, 0.4 - idleTime * 0.015),
            transition: 'opacity 0.8s ease',
          }}
        >
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              textShadow: '0 0 60px rgba(0,0,0,0.8)',
              mixBlendMode: 'difference',
            }}
          >
            Mining<br />Data-Mining
          </h1>
        </div>

        {/* Images grid - full screen */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0">
          {images.map((img, i) => {
            // Calculate distance from mouse to image center
            const imgCenterX = (i % 2 === 0 ? 0.25 : 0.75);
            const imgCenterY = (i < 2 ? 0.35 : 0.75);
            const dist = Math.sqrt(
              Math.pow(mousePos.x - imgCenterX, 2) + Math.pow(mousePos.y - imgCenterY, 2)
            );
            const hoverBlur = Math.max(0, dist * 8 - 1);
            const totalBlur = blurAmount + hoverBlur;
            const scale = 1 + Math.max(0, 0.08 - dist * 0.1);
            const brightness = 0.5 + Math.max(0, 0.5 - dist * 0.8);

            return (
              <div
                key={i}
                className={`relative overflow-hidden ${i === 2 ? 'col-span-2' : ''}`}
                style={{
                  filter: `blur(${totalBlur}px) brightness(${brightness})`,
                  transform: `scale(${scale})`,
                  transition: 'filter 0.4s ease, transform 0.6s ease',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Floating words */}
        {words.map((w) => {
          const age = Date.now() - w.born;
          const life = Math.max(0, 1 - age / 4000);
          return (
            <span
              key={w.id}
              className="fixed pointer-events-none select-none"
              style={{
                left: w.x,
                top: w.y - age * 0.03, // float upward
                opacity: life * 0.7,
                fontSize: `${12 + Math.random() * 14}px`,
                fontFamily: "'Space Grotesk', monospace",
                color: `rgba(${Math.random() > 0.5 ? '0,212,255' : '184,41,221'},${life})`,
                fontWeight: Math.random() > 0.5 ? 700 : 400,
                textShadow: '0 0 12px rgba(0,0,0,0.8)',
                transform: `translateX(${Math.sin(age * 0.003) * 20}px)`,
                transition: 'opacity 0.5s ease',
                zIndex: 56,
                letterSpacing: '0.05em',
              }}
            >
              {w.text}
            </span>
          );
        })}

        {/* Vignette overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[54]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Instructions */}
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] text-white/30 text-xs text-center pointer-events-none"
          style={{
            opacity: idleTime < 5 ? 0.6 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          Move your mouse to explore · Images blur over time · Interaction reveals words
        </div>
      </div>
    </>
  );
}
