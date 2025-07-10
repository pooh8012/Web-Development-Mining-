// pages/visualizations.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature, mesh } from "topojson-client";

export default function Visualizations() {
  const containerRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const width = 975;
    const height = 610;

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then((us) => {
        const statesData = feature(us, us.objects.states).features;

        const root = d3.select(containerRef.current);
        root.selectAll("*").remove();

        // Create SVG
        const svg = root
          .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`)
          .style("width", "100%")
          .style("height", "100%");

        // Projection and path
        const projection = d3
          .geoAlbersUsa()
          .fitSize([width, height], feature(us, us.objects.states));
        const pathGen = d3.geoPath(projection);

        // Container for map
        const g = svg.append("g");

        const ACCENT = "#3B82F6"; // un-selected color
        const HIGHLIGHT = "red";

        // Draw states
        const states = g
          .append("g")
          .attr("fill", ACCENT)
          .selectAll("path")
          .data(statesData)
          .join("path")
          .attr("d", pathGen)
          .attr("stroke", "#F8FAFC")
          .attr("stroke-width", 0.5)
          .attr("cursor", "pointer")
          .classed("selected", false) // track selection
          .on("click", (event, d) => {
            const p = d3.select(event.currentTarget);
            const isSelected = p.classed("selected");
            // toggle class + fill
            p.classed("selected", !isSelected).attr(
              "fill",
              isSelected ? ACCENT : HIGHLIGHT
            );

            d3.select(infoRef.current).text(`Clicked: ${d.properties.name}`);
          });

        // Draw borders
        g.append("path")
          .attr("fill", "none")
          .attr("stroke", "#F8FAFC")
          .attr("stroke-linejoin", "round")
          .attr("d", pathGen(mesh(us, us.objects.states, (a, b) => a !== b)));

        // Zoom behavior
        const zoom = d3
          .zoom()
          .scaleExtent([1, 8])
          .on("zoom", ({ transform }) => {
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
          });
        svg.call(zoom);
      })
      .catch((err) => console.error("❌ failed to load map data", err));
  }, []);

  return (
    <main className="p-8 bg-primary text-light min-h-screen">
      <h1 className="text-4xl text-accent mb-4">Interactive U.S. Map</h1>
      <div
        ref={containerRef}
        className="w-full h-full max-w-4xl mx-auto drop-shadow-xl bg-primary"
      />
      <div
        ref={infoRef}
        className="mt-4 p-4 max-w-4xl mx-auto bg-accent text-light rounded-lg text-center"
      >
        Click a state to see its name
      </div>
    </main>
  );
}
