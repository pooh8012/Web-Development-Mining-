// components/Visualization/NetworkGraphExperiment2.jsx
// Network graph for EXPERIMENT 2 — Mining & Data Mining companies co-occurrence
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import useD3 from '../../hooks/useD3';

import experiment2 from '../../Network_Test_1/Experiment2.json';

const RAW_NODES = experiment2.nodes;
const RAW_EDGES = experiment2.edges || experiment2.links || [];

// Extract meaningful labels from URLs and long strings
function shortLabel(node) {
  const label = node.label || '';
  const fullLabel = node.attributes?.fullLabel || label;

  // If it's a country name or short label, use as-is
  if (label.length < 40 && !label.startsWith('http')) return label;

  // If it's a person name
  if (fullLabel.length < 60 && !fullLabel.startsWith('http')) return fullLabel;

  // Try to extract meaningful text from URL
  try {
    const url = new URL(
      fullLabel.startsWith('http') ? fullLabel : `https://${fullLabel}`
    );
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const last = pathParts[pathParts.length - 1]
        .replace(/[-_]/g, ' ')
        .replace(/\.(jpg|png|gif|jpeg|svg|webp|html).*$/i, '')
        .slice(0, 50);
      return last || url.hostname.replace('www.', '');
    }
    return url.hostname.replace('www.', '');
  } catch {
    return label.slice(0, 50);
  }
}

// Categorize nodes
function categorizeNode(node) {
  const label = (node.attributes?.fullLabel || node.label || '').toLowerCase();
  // Country nodes (short labels, no URLs)
  if (
    !label.startsWith('http') &&
    !label.startsWith('mailto') &&
    label.length < 30
  ) {
    return 'country';
  }
  if (label.includes('apple.com')) return 'tech';
  if (label.includes('angloamerican') || label.includes('mining'))
    return 'mining';
  if (label.includes('mailto')) return 'communication';
  if (
    label.includes('linkedin') ||
    label.includes('facebook') ||
    label.includes('twitter')
  )
    return 'social';
  return 'other';
}

const CATEGORY_COLORS = {
  country: '#FDE68A',
  mining: '#ff6b6b',
  tech: '#60a5fa',
  communication: '#a78bfa',
  social: '#34d399',
  other: '#94a3b8',
};

export default function NetworkGraphExperiment2() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 550 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = Math.min(width * 0.7, 650);
        setDimensions({ width, height });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const ref = useD3(
    (svg) => {
      const { width, height } = dimensions;
      svg.selectAll('*').remove();

      // Only include nodes that participate in edges
      const edgeNodeIds = new Set();
      RAW_EDGES.forEach((e) => {
        edgeNodeIds.add(String(e.source));
        edgeNodeIds.add(String(e.target));
      });

      const activeNodes = RAW_NODES.filter((n) =>
        edgeNodeIds.has(String(n.id))
      );

      // Degree calculation
      const degreeCount = {};
      RAW_EDGES.forEach((e) => {
        const s = String(e.source);
        const t = String(e.target);
        degreeCount[s] = (degreeCount[s] || 0) + 1;
        degreeCount[t] = (degreeCount[t] || 0) + 1;
      });

      const maxDegree = Math.max(...Object.values(degreeCount), 1);

      const nodes = activeNodes.map((n) => {
        const category = categorizeNode(n);
        const degree = degreeCount[String(n.id)] || 0;
        const baseR = width < 640 ? 5 : 7;
        const radius = baseR + (degree / maxDegree) * (width < 640 ? 14 : 22);

        return {
          id: n.id,
          name: shortLabel(n),
          fullLabel: n.attributes?.fullLabel || n.label,
          category,
          degree,
          frequency: n.attributes?.frequency || 0,
          value: radius,
        };
      });

      const links = RAW_EDGES.map((e) => ({
        id: e.id ?? `${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        weight: e.weight || 1,
      }));

      const maxWeight = Math.max(...links.map((l) => l.weight), 1);

      // Simulation
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            .id((d) => d.id)
            .distance((d) => {
              const w = d.weight || 1;
              return 60 + (1 - w / maxWeight) * 80;
            })
        )
        .force('charge', d3.forceManyBody().strength(-180))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force(
          'collision',
          d3.forceCollide().radius((d) => d.value + 6)
        )
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05));

      const g = svg.append('g');
      svg.call(
        d3
          .zoom()
          .scaleExtent([0.3, 5])
          .on('zoom', (event) => g.attr('transform', event.transform))
      );

      // Links
      const link = g
        .append('g')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', '#60a5fa')
        .attr('stroke-opacity', (d) => 0.15 + (d.weight / maxWeight) * 0.5)
        .attr('stroke-width', (d) => 0.5 + (d.weight / maxWeight) * 3);

      // Nodes
      const node = g
        .append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', (d) => d.value)
        .attr('fill', (d) => CATEGORY_COLORS[d.category] || '#94a3b8')
        .attr('fill-opacity', 0.9)
        .attr('stroke', (d) => (d.degree > 5 ? '#fff' : '#374151'))
        .attr('stroke-width', (d) => (d.degree > 5 ? 2 : 1))
        .style('filter', (d) =>
          d.degree > 5
            ? `drop-shadow(0 0 6px ${CATEGORY_COLORS[d.category]}80)`
            : 'none'
        )
        .style('cursor', 'pointer')
        .call(
          d3
            .drag()
            .on('start', (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on('drag', (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on('end', (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
        );

      // Tooltip
      const tooltip = d3
        .select(containerRef.current)
        .append('div')
        .attr('class', 'network-tooltip-exp2')
        .style('position', 'absolute')
        .style('background', 'rgba(0,0,0,0.9)')
        .style('color', '#fff')
        .style('padding', '10px 14px')
        .style('border-radius', '10px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .style('border', '1px solid rgba(96,165,250,0.3)')
        .style('max-width', '300px')
        .style('word-break', 'break-word')
        .style('z-index', 10);

      node
        .on('mouseover', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.value * 1.3)
            .attr('fill-opacity', 1);

          // Highlight connected edges
          link
            .attr('stroke-opacity', (l) => {
              const sid = typeof l.source === 'object' ? l.source.id : l.source;
              const tid = typeof l.target === 'object' ? l.target.id : l.target;
              return sid === d.id || tid === d.id ? 0.8 : 0.05;
            })
            .attr('stroke-width', (l) => {
              const sid = typeof l.source === 'object' ? l.source.id : l.source;
              const tid = typeof l.target === 'object' ? l.target.id : l.target;
              return sid === d.id || tid === d.id ? 2.5 : 0.4;
            });

          tooltip.transition().duration(200).style('opacity', 1);
          tooltip
            .html(
              `<strong>${d.name}</strong><br/>` +
                `<span style="color:${CATEGORY_COLORS[d.category]}">● ${
                  d.category
                }</span>` +
                (d.frequency ? `<br/>Frequency: ${d.frequency}` : '') +
                `<br/>Connections: ${d.degree}`
            )
            .style('left', event.offsetX + 14 + 'px')
            .style('top', event.offsetY - 12 + 'px');
        })
        .on('mouseout', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.value)
            .attr('fill-opacity', 0.9);
          link
            .attr('stroke-opacity', (l) => 0.15 + (l.weight / maxWeight) * 0.5)
            .attr('stroke-width', (l) => 0.5 + (l.weight / maxWeight) * 3);
          tooltip.transition().duration(200).style('opacity', 0);
        });

      // Labels for high-degree nodes
      if (width > 640) {
        g.append('g')
          .selectAll('text')
          .data(nodes.filter((n) => n.degree >= 3))
          .enter()
          .append('text')
          .text((d) =>
            d.name.length > 20 ? d.name.slice(0, 18) + '…' : d.name
          )
          .attr('font-size', '9px')
          .attr('fill', '#94a3b8')
          .attr('text-anchor', 'middle')
          .attr('dy', (d) => -(d.value + 5))
          .each(function () {
            simulation.on('tick.labels', () => {
              d3.select(this.parentNode)
                .selectAll('text')
                .attr('x', (d) => d.x)
                .attr('y', (d) => d.y - d.value - 5);
            });
          });
      }

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      });

      return () => tooltip.remove();
    },
    [dimensions]
  );

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      />
      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 text-[11px] text-gray-400 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <span key={cat} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: color }}
            />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
