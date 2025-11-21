// import { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import useD3 from '../../hooks/useD3';

// export default function NetworkGraph({ confidenceThreshold = 50 }) {
//   const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const { width } = containerRef.current.getBoundingClientRect();
//         const height = Math.min(width * 0.625, 600);
//         setDimensions({ width, height });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const ref = useD3(
//     (svg) => {
//       const { width, height } = dimensions;

//       // Clear previous content
//       svg.selectAll('*').remove();

//       // Generate sample data
//       const nodeCount = width < 640 ? 15 : 30;
//       const nodes = [];
//       const links = [];

//       // Create nodes
//       for (let i = 0; i < nodeCount; i++) {
//         nodes.push({
//           id: i,
//           name:
//             i < nodeCount / 2
//               ? `Mining Co ${i + 1}`
//               : `Data Co ${i - Math.floor(nodeCount / 2) + 1}`,
//           group: i < nodeCount / 2 ? 1 : 2,
//           value: Math.random() * (width < 640 ? 15 : 20) + 10,
//         });
//       }

//       // Create links
//       const linkCount = width < 640 ? 25 : 50;
//       for (let i = 0; i < linkCount; i++) {
//         const source = Math.floor(Math.random() * nodeCount);
//         const target = Math.floor(Math.random() * nodeCount);
//         if (source !== target) {
//           links.push({
//             source: source,
//             target: target,
//             value: Math.random() * 100,
//             confidence: Math.random() * 100,
//           });
//         }
//       }

//       // Filter links based on confidence
//       const filteredLinks = links.filter(
//         (l) => l.confidence >= confidenceThreshold
//       );

//       // Create force simulation with responsive forces
//       const chargeStrength = width < 640 ? -200 : -300;
//       const linkDistance = width < 640 ? 60 : 100;

//       const simulation = d3
//         .forceSimulation(nodes)
//         .force(
//           'link',
//           d3
//             .forceLink(filteredLinks)
//             .id((d) => d.id)
//             .distance(linkDistance)
//         )
//         .force('charge', d3.forceManyBody().strength(chargeStrength))
//         .force('center', d3.forceCenter(width / 2, height / 2))
//         .force(
//           'collision',
//           d3.forceCollide().radius((d) => d.value + 5)
//         );

//       // Create container
//       const g = svg.append('g');

//       // Add zoom behavior
//       const zoom = d3
//         .zoom()
//         .scaleExtent([0.5, 4])
//         .on('zoom', (event) => {
//           g.attr('transform', event.transform);
//         });

//       svg.call(zoom);

//       // Create links
//       const link = g
//         .append('g')
//         .selectAll('line')
//         .data(filteredLinks)
//         .enter()
//         .append('line')
//         .attr('stroke', '#00d4ff')
//         .attr('stroke-opacity', (d) => (d.confidence / 100) * 0.6)
//         .attr('stroke-width', (d) => Math.sqrt(d.value) * 0.5);

//       // Create nodes
//       const node = g
//         .append('g')
//         .selectAll('circle')
//         .data(nodes)
//         .enter()
//         .append('circle')
//         .attr('r', (d) => d.value)
//         .attr('fill', (d) => (d.group === 1 ? '#00d4ff' : '#b829dd'))
//         .attr('fill-opacity', 0.8)
//         .attr('stroke', (d) => (d.group === 1 ? '#00d4ff' : '#b829dd'))
//         .attr('stroke-width', 2)
//         .style('cursor', 'pointer')
//         .call(
//           d3
//             .drag()
//             .on('start', dragstarted)
//             .on('drag', dragged)
//             .on('end', dragended)
//         );

//       // Add labels (hide on small screens)
//       if (width > 640) {
//         const labels = g
//           .append('g')
//           .selectAll('text')
//           .data(nodes)
//           .enter()
//           .append('text')
//           .text((d) => d.name)
//           .attr('font-size', '10px')
//           .attr('fill', '#94a3b8')
//           .attr('text-anchor', 'middle')
//           .attr('dy', -15);
//       }

//       // Add hover effects
//       node
//         .on('mouseover', function (event, d) {
//           d3.select(this)
//             .transition()
//             .duration(200)
//             .attr('r', d.value * 1.2)
//             .attr('fill-opacity', 1);
//         })
//         .on('mouseout', function (event, d) {
//           d3.select(this)
//             .transition()
//             .duration(200)
//             .attr('r', d.value)
//             .attr('fill-opacity', 0.8);
//         });

//       // Update positions on tick
//       simulation.on('tick', () => {
//         link
//           .attr('x1', (d) => d.source.x)
//           .attr('y1', (d) => d.source.y)
//           .attr('x2', (d) => d.target.x)
//           .attr('y2', (d) => d.target.y);

//         node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

//         if (width > 640) {
//           g.selectAll('text')
//             .attr('x', (d) => d.x)
//             .attr('y', (d) => d.y);
//         }
//       });

//       // Drag functions
//       function dragstarted(event, d) {
//         if (!event.active) simulation.alphaTarget(0.3).restart();
//         d.fx = d.x;
//         d.fy = d.y;
//       }

//       function dragged(event, d) {
//         d.fx = event.x;
//         d.fy = event.y;
//       }

//       function dragended(event, d) {
//         if (!event.active) simulation.alphaTarget(0);
//         d.fx = null;
//         d.fy = null;
//       }
//     },
//     [confidenceThreshold, dimensions]
//   );

//   return (
//     <div ref={containerRef} className="w-full h-full">
//       <svg
//         ref={ref}
//         viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
//         className="w-full h-full"
//         preserveAspectRatio="xMidYMid meet"
//       />
//     </div>
//   );
// }

// components/Visualization/NetworkGraph.jsx
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import useD3 from '../../hooks/useD3';

// Import BOTH datasets (relative to this file)
import fullData from '../../Network_Test_1/full-data-updated.json';
import testData from '../../Network_Test_1/ednodirigido-test.json';

// ----- PREPARE MERGED RAW DATA (outside component for perf) -----

// Merge nodes
const RAW_NODES = [...fullData.nodes, ...testData.nodes];

// Deduplicate nodes by id
const NODE_MAP = RAW_NODES.reduce((acc, n) => {
  if (!acc[n.id]) acc[n.id] = n;
  return acc;
}, {});
const MERGED_NODES = Object.values(NODE_MAP);

// Merge edges / links (support both `edges` & `links`)
const fullEdges = fullData.edges || fullData.links || [];
const testEdges = testData.edges || testData.links || [];
const RAW_EDGES = [...fullEdges, ...testEdges];

// Deduplicate edges (prefer id, else source-target key)
const EDGE_MAP = RAW_EDGES.reduce((acc, e) => {
  const key = e.id ?? `${e.source}-${e.target}`;
  if (!acc[key]) acc[key] = e;
  return acc;
}, {});
const MERGED_EDGES = Object.values(EDGE_MAP);

// Get max node "size" to scale radius nicely
const MAX_NODE_SIZE = MERGED_NODES.reduce((max, n) => {
  const s = parseFloat(n.size) || 10;
  return s > max ? s : max;
}, 10);

// Color palette by node type
const TYPE_COLORS = {
  Persona: '#00d4ff',
  Obra: '#b829dd',
  Pais: '#facc15',
  Institucion: '#22c55e',
  editoriales: '#f97316',
  revistas: '#e11d48',
  tipo_de_representacion: '#38bdf8',
};
const DEFAULT_COLOR = '#a855f7';

export default function NetworkGraph({ confidenceThreshold = 50 }) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef(null);

  // Responsive sizing
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

      // Clear previous render
      svg.selectAll('*').remove();

      // ---- MAP NODES ----
      const nodes = MERGED_NODES.map((n) => {
        const numericSize = parseFloat(n.size) || 10;

        const baseRadius = width < 640 ? 4 : 6;
        const scaleRadius = width < 640 ? 8 : 14;
        const radius =
          baseRadius + (numericSize / (MAX_NODE_SIZE || 75)) * scaleRadius;

        return {
          id: n.id,
          name: n.label,
          type: n.type,
          x: parseFloat(n.x) || width / 2,
          y: parseFloat(n.y) || height / 2,
          value: radius,
        };
      });

      // ---- MAP EDGES / LINKS ----
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

      // Filter by confidence
      const filteredLinks = linksAll.filter(
        (l) => l.confidence >= confidenceThreshold
      );

      // ---- FORCE SIMULATION ----
      const chargeStrength = width < 640 ? -120 : -220;
      const linkDistance = width < 640 ? 40 : 80;

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(filteredLinks)
            .id((d) => d.id)
            .distance(linkDistance)
        )
        .force('charge', d3.forceManyBody().strength(chargeStrength))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force(
          'collision',
          d3.forceCollide().radius((d) => d.value + 4)
        );

      const g = svg.append('g');

      // Zoom
      const zoom = d3
        .zoom()
        .scaleExtent([0.4, 4])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);

      // Links
      const link = g
        .append('g')
        .attr('stroke-linecap', 'round')
        .selectAll('line')
        .data(filteredLinks)
        .enter()
        .append('line')
        .attr('stroke', '#00d4ff')
        .attr('stroke-opacity', (d) => (d.confidence / 100) * 0.6 + 0.2)
        .attr('stroke-width', 0.6);

      // Nodes
      const node = g
        .append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', (d) => d.value)
        .attr('fill', (d) => TYPE_COLORS[d.type] || DEFAULT_COLOR)
        .attr('fill-opacity', 0.85)
        .attr('stroke', '#020617')
        .attr('stroke-width', 1.2)
        .style('cursor', 'pointer')
        .call(
          d3
            .drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
        );

      // Labels (only on wider screens)
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
          .attr('fill', '#94a3b8')
          .attr('text-anchor', 'middle')
          .attr('dy', (d) => -(d.value + 4));
      }

      // Hover animation
      node
        .on('mouseover', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.value * 1.25)
            .attr('fill-opacity', 1);
        })
        .on('mouseout', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.value)
            .attr('fill-opacity', 0.85);
        });

      // Tick updates
      simulation.on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

        if (labels) {
          labels.attr('x', (d) => d.x).attr('y', (d) => d.y - d.value - 4);
        }
      });

      // Drag handlers
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    },
    [confidenceThreshold, dimensions]
  );

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
}
