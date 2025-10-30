// components/Visualization/GlobeAnimated.jsx
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export default function GlobeAnimated() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const timerRef = useRef(null);

  // Responsive sizing
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      // keep inside parent with a little breathing room
      const hSafe = Math.max(260, Math.min(height || 520, 520));
      setDims({ w: width, h: hSafe });
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const { w, h } = dims;

    const root = d3.select(svgRef.current);
    root.selectAll('*').remove();

    // Compute a radius that ALWAYS fits fully inside w x h
    const radius = Math.min(w, h) * 0.46; // <— conservative so it never clips
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([w / 2, h / 2])
      .rotate([0, -20, 0]);

    const path = d3.geoPath(projection);

    const svg = root.attr('width', w).attr('height', h);
    const g = svg.append('g');

    // ---------- defs: water + glow + rim ----------
    const defs = svg.append('defs');

    const gradWater = defs
      .append('radialGradient')
      .attr('id', 'ga-water')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    gradWater
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#071529')
      .style('stop-opacity', 0.65);
    gradWater
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#050714')
      .style('stop-opacity', 1);

    const gradGlow = defs
      .append('radialGradient')
      .attr('id', 'ga-glow')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    gradGlow
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#00e5ff')
      .style('stop-opacity', 0.7);
    gradGlow
      .append('stop')
      .attr('offset', '60%')
      .style('stop-color', '#00e5ff')
      .style('stop-opacity', 0.2);
    gradGlow
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#00e5ff')
      .style('stop-opacity', 0);

    const gradRim = defs
      .append('radialGradient')
      .attr('id', 'ga-rim')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '55%'); // slightly outside sphere for a halo
    gradRim
      .append('stop')
      .attr('offset', '90%')
      .style('stop-color', 'rgba(0,229,255,0)');
    gradRim
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', 'rgba(0,229,255,0.75)');

    // ---------- background glow + water ----------
    g.append('circle')
      .attr('cx', w / 2)
      .attr('cy', h / 2)
      .attr('r', radius * 1.12)
      .style('fill', 'url(#ga-glow)')
      .style('opacity', 0.55);

    // water
    g.append('circle')
      .attr('cx', w / 2)
      .attr('cy', h / 2)
      .attr('r', radius)
      .style('fill', 'url(#ga-water)')
      .style('filter', 'drop-shadow(0 0 18px rgba(0,229,255,0.35))');

    // subtle rim highlight (neon edge)
    g.append('circle')
      .attr('cx', w / 2)
      .attr('cy', h / 2)
      .attr('r', radius * 1.02)
      .style('fill', 'url(#ga-rim)')
      .style('opacity', 0.8);

    // ---------- graticule ----------
    const graticule = d3.geoGraticule10();
    const gratPath = g
      .append('path')
      .datum(graticule)
      .attr('class', 'grat')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#00e5ff')
      .attr('stroke-width', 0.35)
      .attr('opacity', 0.25);

    // ---------- land coloring ----------
    const color = d3
      .scaleSequential()
      .domain([0, 1])
      .interpolator((t) => d3.interpolateRgb('#142742', '#ff2ea6')(t));

    const intensityOf = (id) => {
      const n = +id || 0;
      const t = (Math.sin(n * 12.9898) * 43758.5453) % 1;
      return Math.abs(t);
    };

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((world) => {
        const geo = topojson.feature(world, world.objects.countries);
        const land = g.append('g');

        land
          .selectAll('path')
          .data(geo.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', (d) => color(intensityOf(d.id)))
          .attr('stroke', '#0ea5e9')
          .attr('stroke-width', 0.45)
          .attr('opacity', 0.95);

        // ---------- auto-rotate ----------
        const speed = 0.15; // deg per frame
        timerRef.current = d3.timer(() => {
          const r = projection.rotate();
          projection.rotate([r[0] + speed, r[1], r[2]]);
          land.selectAll('path').attr('d', path);
          gratPath.attr('d', path(graticule));
        });
      })
      .catch(() => {
        svg
          .append('text')
          .attr('x', w / 2)
          .attr('y', h / 2)
          .attr('text-anchor', 'middle')
          .attr('fill', '#94a3b8')
          .text('Globe data unavailable');
      });

    return () => {
      if (timerRef.current) timerRef.current.stop();
    };
  }, [dims]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
