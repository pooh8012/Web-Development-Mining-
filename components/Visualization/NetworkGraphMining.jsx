// components/Visualization/NetworkGraphMining.jsx
// Network graph for MINING COMPANIES ONLY (MiningApril26 + MiningApril27)
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import useD3 from '../../hooks/useD3';

import fullData from '../../Network_Test_1/MiningApril26.json';
import testData from '../../Network_Test_1/MiningApril27.json';

// Merge only mining datasets
const RAW_NODES = [...fullData.nodes, ...testData.nodes];
const NODE_MAP = RAW_NODES.reduce((acc, n) => {
  if (!acc[n.id]) acc[n.id] = n;
  return acc;
}, {});
const MERGED_NODES = Object.values(NODE_MAP);

const fullEdges = fullData.edges || fullData.links || [];
const testEdges = testData.edges || testData.links || [];
const RAW_EDGES = [...fullEdges, ...testEdges];
const EDGE_MAP = RAW_EDGES.reduce((acc, e) => {
  const key = e.id ?? `${e.source}-${e.target}`;
  if (!acc[key]) acc[key] = e;
  return acc;
}, {});
const MERGED_EDGES = Object.values(EDGE_MAP);

const MAX_NODE_SIZE = MERGED_NODES.reduce((max, n) => {
  const s = parseFloat(n.size) || 10;
  return s > max ? s : max;
}, 10);

const TYPE_COLORS = {
  Persona: '#6EE7B7',
  Obra: '#FECACA',
  Pais: '#FDE68A',
  Institucion: '#93C5FD',
  editoriales: '#FBCFE8',
  revistas: '#C7D2FE',
  tipo_de_representacion: '#A5F3FC',
};
const DEFAULT_COLOR = '#E5E7EB';
const HUB_COLOR = '#ff6b6b';
const HUB_STROKE = '#ffecec';

export default function NetworkGraphMining({ confidenceThreshold = 50 }) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = Math.min(width * 0.625, 600);
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

      // Degree calculation
      const degreeCount = {};
      MERGED_EDGES.forEach((e) => {
        degreeCount[e.source] = (degreeCount[e.source] || 0) + 1;
        degreeCount[e.target] = (degreeCount[e.target] || 0) + 1;
      });

      const nodesWithDegree = MERGED_NODES.map((n) => ({
        ...n,
        degree: degreeCount[n.id] || 0,
      }));

      const TOP_HUBS = nodesWithDegree
        .sort((a, b) => b.degree - a.degree)
        .slice(0, 5)
        .map((n) => n.id);

      const nodes = nodesWithDegree.map((n) => {
        const numericSize = parseFloat(n.size) || 10;
        const baseRadius = width < 640 ? 4 : 6;
        const scaleRadius = width < 640 ? 8 : 14;
        const radius =
          baseRadius + (numericSize / (MAX_NODE_SIZE || 75)) * scaleRadius;
        const isHub = TOP_HUBS.includes(n.id);

        return {
          id: n.id,
          name: n.label,
          type: n.type,
          x: parseFloat(n.x) || width / 2,
          y: parseFloat(n.y) || height / 2,
          value: isHub ? radius * 1.4 : radius,
          isHub,
        };
      });

      const linksAll = MERGED_EDGES.map((e) => {
        const keyNum = parseInt(e.id, 10);
        const confidence = Number.isFinite(keyNum)
          ? Math.abs(keyNum) % 100
          : Math.floor(Math.random() * 100);
        return {
          id: e.id ?? `${e.source}-${e.target}`,
          source: e.source,
          target: e.target,
          value: e.weight || 1,
          confidence,
        };
      });

      const filteredLinks = linksAll.filter(
        (l) => l.confidence >= confidenceThreshold
      );

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(filteredLinks)
            .id((d) => d.id)
            .distance(width < 640 ? 40 : 80)
        )
        .force('charge', d3.forceManyBody().strength(width < 640 ? -120 : -220))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force(
          'collision',
          d3.forceCollide().radius((d) => d.value + 4)
        );

      const g = svg.append('g');
      svg.call(
        d3
          .zoom()
          .scaleExtent([0.4, 4])
          .on('zoom', (event) => g.attr('transform', event.transform))
      );

      const link = g
        .append('g')
        .attr('stroke-linecap', 'round')
        .selectAll('line')
        .data(filteredLinks)
        .enter()
        .append('line')
        .attr('stroke', '#cbd5e1')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 0.6);

      const node = g
        .append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', (d) => d.value)
        .attr('fill', (d) =>
          d.isHub ? HUB_COLOR : TYPE_COLORS[d.type] || DEFAULT_COLOR
        )
        .attr('fill-opacity', (d) => (d.isHub ? 0.95 : 0.9))
        .attr('stroke', (d) => (d.isHub ? HUB_STROKE : '#475569'))
        .attr('stroke-width', (d) => (d.isHub ? 2 : 1.2))
        .style('filter', (d) =>
          d.isHub ? 'drop-shadow(0px 0px 4px rgba(255,107,107,0.6))' : 'none'
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
        .attr('class', 'network-tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0,0,0,0.85)')
        .style('color', '#fff')
        .style('padding', '8px 12px')
        .style('border-radius', '8px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .style('border', '1px solid rgba(255,255,255,0.15)')
        .style('z-index', 10);

      node
        .on('mouseover', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.value * 1.3)
            .attr('fill-opacity', 1);
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip
            .html(`<strong>${d.name || 'Node ' + d.id}</strong>`)
            .style('left', event.offsetX + 12 + 'px')
            .style('top', event.offsetY - 10 + 'px');
        })
        .on('mouseout', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.value)
            .attr('fill-opacity', d.isHub ? 0.95 : 0.9);
          tooltip.transition().duration(200).style('opacity', 0);
        });

      let labels = null;
      if (width > 640) {
        labels = g
          .append('g')
          .selectAll('text')
          .data(nodes)
          .enter()
          .append('text')
          .text((d) => d.name)
          .attr('font-size', '10px')
          .attr('fill', '#64748b')
          .attr('text-anchor', 'middle')
          .attr('dy', (d) => -(d.value + 4));
      }

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        if (labels)
          labels.attr('x', (d) => d.x).attr('y', (d) => d.y - d.value - 4);
      });

      return () => tooltip.remove();
    },
    [confidenceThreshold, dimensions]
  );

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
}
