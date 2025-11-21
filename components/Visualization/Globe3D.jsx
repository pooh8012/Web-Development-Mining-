import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export default function Globe3D() {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const containerRef = useRef(null);
  const rotationRef = useRef([0, -20, 0]);
  const autoRotateRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = Math.min(width, 600);
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = dimensions;
    const sensitivity = 75;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Setup SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // === DEFINE GRADIENTS ===
    const defs = svg.append('defs');

    // Globe gradient
    const globeGradient = defs
      .append('radialGradient')
      .attr('id', 'globe-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    globeGradient
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#0a1929')
      .style('stop-opacity', 0.6);
    globeGradient
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#050714')
      .style('stop-opacity', 1);

    // Glow effect
    const glowGradient = defs
      .append('radialGradient')
      .attr('id', 'globe-glow')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    glowGradient
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#00d4ff')
      .style('stop-opacity', 0.8);
    glowGradient
      .append('stop')
      .attr('offset', '50%')
      .style('stop-color', '#00d4ff')
      .style('stop-opacity', 0.3);
    glowGradient
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', '#00d4ff')
      .style('stop-opacity', 0);

    // === GLOBE SETUP ===
    const projection = d3
      .geoOrthographic()
      .scale(Math.min(width, height) / 2.2)
      .translate([width / 2, height / 2])
      .rotate(rotationRef.current);

    const path = d3.geoPath().projection(projection);
    const globe = svg.append('g');

    // Glow layer
    globe
      .append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale() * 1.2)
      .style('fill', 'url(#globe-glow)')
      .style('opacity', 0.5);

    // Ocean layer
    globe
      .append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale())
      .style('fill', 'url(#globe-gradient)')
      .style('filter', 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))');

    // Gridlines
    const graticule = d3.geoGraticule();
    globe
      .append('path')
      .datum(graticule)
      .attr('d', path)
      .style('fill', 'none')
      .style('stroke', '#00d4ff')
      .style('stroke-width', 0.3)
      .style('opacity', 0.3);

    // === WORLD MAP + COMPANY DATA ===
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(async (world) => {
        const countries = topojson.feature(world, world.objects.countries);
        const countriesGroup = globe.append('g');

        countriesGroup
          .selectAll('path')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('d', path)
          .style('fill', '#0a1929')
          .style('stroke', '#00d4ff')
          .style('stroke-width', 0.4)
          .style('opacity', 0.8);

        // === LOAD COMPANY DATA ===
        const loadCompanyData = async () => {
          const mining = await d3.csv('/data/MiningCompanies_OCT2025.csv');
          const dataMining = await d3.csv(
            '/data/DataMining_Companies_OCT2025.csv'
          );
          const ai = await d3.csv('/data/AICompanies_OCT2025.csv');

          const allCompanies = [
            ...mining.map((d) => ({ ...d, type: 'Mining' })),
            ...dataMining.map((d) => ({ ...d, type: 'DataMining' })),
            ...ai.map((d) => ({ ...d, type: 'AI' })),
          ];

          return allCompanies
            .filter((d) => d.Latitude && d.Longitude)
            .map((d) => ({
              name: d['Company Name'] || d.Name || 'Unnamed Company',
              coords: [parseFloat(d.Longitude), parseFloat(d.Latitude)],
              country: d.Country || '',
              type: d.type,
              confidence: d.Confidence || '',
            }));
        };

        const pointsGroup = globe.append('g');
        const companyData = await loadCompanyData();

        const colorByType = {
          Mining: '#ff6b6b',
          DataMining: '#00d4ff',
          AI: '#b26bff',
        };

        function updatePoints() {
          const visiblePoints = companyData.filter((d) => {
            const coords = projection(d.coords);
            return coords && projection.invert(coords);
          });

          const points = pointsGroup
            .selectAll('circle')
            .data(visiblePoints, (d) => d.name);

          points.exit().remove();

          const colorByType = {
            Mining: '#ff6b6b',
            DataMining: '#00d4ff',
            AI: '#b26bff',
          };

          // Enter + update
          points
            .enter()
            .append('circle')
            .merge(points)
            .attr('cx', (d) => projection(d.coords)[0])
            .attr('cy', (d) => projection(d.coords)[1])
            .attr('r', 5.5) // increased from 3
            .style('fill', (d) => colorByType[d.type] || '#00d4ff')
            .style('opacity', 1)
            .style(
              'filter',
              (d) => `drop-shadow(0 0 8px ${colorByType[d.type] || '#00d4ff'})`
            )
            .transition()
            .duration(1000)
            .ease(d3.easeSinInOut)
            .attr('r', 6)
            .transition()
            .duration(1000)
            .ease(d3.easeSinInOut)
            .attr('r', 5.5)
            .on('end', function () {
              d3.select(this).transition().duration(1000).ease(d3.easeSinInOut);
            });

          // Hover interaction
          pointsGroup
            .selectAll('circle')
            .on('mouseover', function (event, d) {
              d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 9)
                .style('opacity', 1)
                .style(
                  'filter',
                  `drop-shadow(0 0 12px ${colorByType[d.type] || '#00d4ff'})`
                );
              setSelectedCountry({
                name: d.name,
                type: d.type,
                country: d.country,
                confidence: d.confidence,
              });
            })
            .on('mouseout', function () {
              d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 5.5)
                .style('opacity', 1)
                .style(
                  'filter',
                  (d) =>
                    `drop-shadow(0 0 8px ${colorByType[d.type] || '#00d4ff'})`
                );
              setSelectedCountry(null);
            });
        }

        // Rotation interaction
        let currentRotation = rotationRef.current;
        const drag = d3
          .drag()
          .on('start', function (event) {
            currentRotation = projection.rotate();
            if (autoRotateRef.current) {
              autoRotateRef.current.stop();
              autoRotateRef.current = null;
            }
          })
          .on('drag', function (event) {
            const k = sensitivity / projection.scale();
            projection.rotate([
              currentRotation[0] + event.x * k,
              currentRotation[1] - event.y * k,
            ]);
            rotationRef.current = projection.rotate();
            updatePaths();
          });

        svg.call(drag);

        autoRotateRef.current = d3.timer(function () {
          const rotate = projection.rotate();
          projection.rotate([rotate[0] + 0.2, rotate[1], rotate[2]]);
          rotationRef.current = projection.rotate();
          updatePaths();
        });

        function updatePaths() {
          countriesGroup.selectAll('path').attr('d', path);
          globe.select('path').attr('d', path);
          updatePoints();
        }

        updatePoints();
      })
      .catch((error) => {
        console.error('Error loading world data:', error);
        svg
          .append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor', 'middle')
          .attr('fill', '#94a3b8')
          .text('Loading globe data...');
      });

    // Cleanup
    return () => {
      if (autoRotateRef.current) {
        autoRotateRef.current.stop();
      }
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full" />

      {/* Tooltip Info */}
      {selectedCountry && (
        <div className="absolute top-4 left-4 glass-panel p-4 pointer-events-none">
          <h4 className="text-lg font-semibold text-accent-neon">
            {selectedCountry.name}
          </h4>
          {selectedCountry.country && (
            <p className="text-sm text-gray-300">
              🌍 {selectedCountry.country}
            </p>
          )}
          <p className="text-sm text-gray-400">
            🏭 Type: {selectedCountry.type}
          </p>
          {selectedCountry.confidence && (
            <p className="text-sm text-gray-400">
              🔹 Confidence: {selectedCountry.confidence}%
            </p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass-panel p-4 pointer-events-none text-sm">
        <h5 className="font-semibold mb-2 text-white">Company Type</h5>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff6b6b]" />{' '}
          <span>Mining</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00d4ff]" />{' '}
          <span>Data Mining</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#b26bff]" /> <span>AI</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 text-xs text-gray-400 pointer-events-none">
        <p>Drag to rotate • Hover for details</p>
      </div>
    </div>
  );
}
