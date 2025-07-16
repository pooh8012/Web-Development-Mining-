// components/Visualizations/NetworkGraph.jsx
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useD3 from "../../hooks/useD3";

export default function NetworkGraph() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(50);

  const ref = useD3(
    (svg) => {
      const width = 800;
      const height = 500;

      // Clear previous content
      svg.selectAll("*").remove();

      // Generate sample data
      const nodes = [];
      const links = [];

      // Create nodes
      for (let i = 0; i < 30; i++) {
        nodes.push({
          id: i,
          name: i < 15 ? `Mining Co ${i + 1}` : `Data Co ${i - 14}`,
          group: i < 15 ? 1 : 2,
          value: Math.random() * 20 + 10,
        });
      }

      // Create links
      for (let i = 0; i < 50; i++) {
        const source = Math.floor(Math.random() * 30);
        const target = Math.floor(Math.random() * 30);
        if (source !== target) {
          links.push({
            source: source,
            target: target,
            value: Math.random() * 100,
            confidence: Math.random() * 100,
          });
        }
      }

      // Filter links based on confidence
      const filteredLinks = links.filter(
        (l) => l.confidence >= confidenceThreshold
      );

      // Create force simulation
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(filteredLinks)
            .id((d) => d.id)
            .distance(100)
        )
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "collision",
          d3.forceCollide().radius((d) => d.value + 5)
        );

      // Create container
      const g = svg.append("g");

      // Add zoom behavior
      const zoom = d3
        .zoom()
        .scaleExtent([0.5, 4])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });

      svg.call(zoom);

      // Create links
      const link = g
        .append("g")
        .selectAll("line")
        .data(filteredLinks)
        .enter()
        .append("line")
        .attr("stroke", "#00d4ff")
        .attr("stroke-opacity", (d) => (d.confidence / 100) * 0.6)
        .attr("stroke-width", (d) => Math.sqrt(d.value) * 0.5);

      // Create nodes
      const node = g
        .append("g")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", (d) => d.value)
        .attr("fill", (d) => (d.group === 1 ? "#00d4ff" : "#b829dd"))
        .attr("fill-opacity", 0.8)
        .attr("stroke", (d) => (d.group === 1 ? "#00d4ff" : "#b829dd"))
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      // Add labels
      const labels = g
        .append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text((d) => d.name)
        .attr("font-size", "10px")
        .attr("fill", "#94a3b8")
        .attr("text-anchor", "middle")
        .attr("dy", -15);

      // Add hover effects
      node
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", d.value * 1.2)
            .attr("fill-opacity", 1);
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", d.value)
            .attr("fill-opacity", 0.8);
        });

      // Update positions on tick
      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
      });

      // Drag functions
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
    [confidenceThreshold]
  );

  return (
    <div className="w-full h-full">
      <svg
        ref={ref}
        viewBox="0 0 800 500"
        className="w-full h-full"
        style={{ maxHeight: "600px" }}
      />
    </div>
  );
}
