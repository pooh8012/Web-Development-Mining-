import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import useD3 from "../../hooks/useD3";

export default function USMap() {
  const ref = useD3((svg) => {
    const width = 800;
    const height = 500;

    // Clear any existing content
    svg.selectAll("*").remove();

    // Create projection
    const projection = d3
      .geoAlbersUsa()
      .scale(1000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Create zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        svg.selectAll("g").attr("transform", event.transform);
      });

    svg.call(zoom);

    // Create main group
    const g = svg.append("g");

    // Load and render US map
    d3.json("/data/us-states.json")
      .then((us) => {
        // Draw states
        g.selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "state")
          .attr("fill", "#0a1929")
          .attr("stroke", "#00d4ff")
          .attr("stroke-width", 0.5)
          .on("mouseover", function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", "#00d4ff")
              .attr("fill-opacity", 0.3);
          })
          .on("mouseout", function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", "#0a1929")
              .attr("fill-opacity", 1);
          })
          .on("click", function (event, d) {
            // Handle state click
            console.log("Clicked state:", d.properties.name);
          });

        // Add state labels
        g.selectAll("text")
          .data(topojson.feature(us, us.objects.states).features)
          .enter()
          .append("text")
          .attr("x", (d) => path.centroid(d)[0])
          .attr("y", (d) => path.centroid(d)[1])
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .attr("fill", "#94a3b8")
          .attr("pointer-events", "none")
          .text((d) => d.properties.abbr);
      })
      .catch((error) => {
        console.error("Error loading map data:", error);
        // Fallback visualization if data fails to load
        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("text-anchor", "middle")
          .attr("fill", "#94a3b8")
          .text("Map data loading...");
      });
  }, []);

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
