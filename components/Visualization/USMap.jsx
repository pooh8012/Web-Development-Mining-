import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import useD3 from "../../hooks/useD3";

export default function USMap() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = Math.min(width * 0.625, 600); // 16:10 aspect ratio, max 600px
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const ref = useD3(
    (svg) => {
      const { width, height } = dimensions;

      // Clear any existing content
      svg.selectAll("*").remove();

      // Create projection - adjust scale based on screen size
      const scale = width < 640 ? 600 : width < 1024 ? 800 : 1000;
      const projection = d3
        .geoAlbersUsa()
        .scale(scale)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      // Create zoom behavior with responsive scale extent
      const maxZoom = width < 640 ? 4 : 8;
      const zoom = d3
        .zoom()
        .scaleExtent([1, maxZoom])
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
              console.log("Clicked state:", d.properties.name);
            });

          // Add state labels (hide on small screens)
          if (width > 640) {
            g.selectAll("text")
              .data(topojson.feature(us, us.objects.states).features)
              .enter()
              .append("text")
              .attr("x", (d) => path.centroid(d)[0])
              .attr("y", (d) => path.centroid(d)[1])
              .attr("text-anchor", "middle")
              .attr("font-size", width < 768 ? "8px" : "10px")
              .attr("fill", "#94a3b8")
              .attr("pointer-events", "none")
              .text((d) => d.properties.abbr);
          }
        })
        .catch((error) => {
          console.error("Error loading map data:", error);
          // Fallback visualization
          svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .attr("fill", "#94a3b8")
            .attr("font-size", width < 640 ? "14px" : "16px")
            .text("Map data loading...");
        });
    },
    [dimensions]
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
