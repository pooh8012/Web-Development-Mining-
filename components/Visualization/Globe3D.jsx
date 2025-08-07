// components/Visualizations/Globe3D.jsx
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

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
        const height = Math.min(width, 600); // Keep it square-ish, max 600px
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = dimensions;
    const sensitivity = 75;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Setup
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add gradient definitions
    const defs = svg.append("defs");

    // Globe gradient
    const globeGradient = defs
      .append("radialGradient")
      .attr("id", "globe-gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");

    globeGradient
      .append("stop")
      .attr("offset", "0%")
      .style("stop-color", "#0a1929")
      .style("stop-opacity", 0.6);

    globeGradient
      .append("stop")
      .attr("offset", "100%")
      .style("stop-color", "#050714")
      .style("stop-opacity", 1);

    // Glow effect
    const glowGradient = defs
      .append("radialGradient")
      .attr("id", "globe-glow")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");

    glowGradient
      .append("stop")
      .attr("offset", "0%")
      .style("stop-color", "#00d4ff")
      .style("stop-opacity", 0.8);

    glowGradient
      .append("stop")
      .attr("offset", "50%")
      .style("stop-color", "#00d4ff")
      .style("stop-opacity", 0.3);

    glowGradient
      .append("stop")
      .attr("offset", "100%")
      .style("stop-color", "#00d4ff")
      .style("stop-opacity", 0);

    const projection = d3
      .geoOrthographic()
      .scale(Math.min(width, height) / 2.2)
      .translate([width / 2, height / 2])
      .rotate(rotationRef.current);

    const path = d3.geoPath().projection(projection);
    const globe = svg.append("g");

    // Add glow effect behind globe
    globe
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale() * 1.2)
      .style("fill", "url(#globe-glow)")
      .style("opacity", 0.5);

    // Add water (sphere)
    globe
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale())
      .style("fill", "url(#globe-gradient)")
      .style("filter", "drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))");

    // Add graticule (grid lines)
    const graticule = d3.geoGraticule();
    globe
      .append("path")
      .datum(graticule)
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", "#00d4ff")
      .style("stroke-width", 0.3)
      .style("opacity", 0.3);

    // Load world data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((world) => {
        const countries = topojson.feature(world, world.objects.countries);

        // Mining activity data (sample - replace with real data)
        const miningData = {
          840: { name: "USA", intensity: 0.9 }, // USA
          156: { name: "China", intensity: 1.0 }, // China
          "036": { name: "Australia", intensity: 0.8 }, // Australia
          124: { name: "Canada", intensity: 0.7 }, // Canada
          "076": { name: "Brazil", intensity: 0.6 }, // Brazil
          643: { name: "Russia", intensity: 0.7 }, // Russia
          710: { name: "South Africa", intensity: 0.8 }, // South Africa
          152: { name: "Chile", intensity: 0.9 }, // Chile
          604: { name: "Peru", intensity: 0.7 }, // Peru
          360: { name: "Indonesia", intensity: 0.6 }, // Indonesia
        };

        // Draw countries
        const countriesGroup = globe.append("g");

        countriesGroup
          .selectAll("path")
          .data(countries.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("fill", (d) => {
            const mining = miningData[d.id];
            if (mining) {
              // Color based on mining intensity
              const intensity = mining.intensity;
              return d3.interpolateRgb("#0a1929", "#ff006e")(intensity);
            }
            return "#0a1929";
          })
          .style("stroke", "#00d4ff")
          .style("stroke-width", 0.5)
          .style("cursor", "pointer")
          .on("mouseover", function (event, d) {
            const mining = miningData[d.id];
            if (mining) {
              d3.select(this)
                .transition()
                .duration(200)
                .style("fill", "#00d4ff")
                .style("stroke-width", 2);

              setSelectedCountry({
                name: mining.name,
                intensity: mining.intensity,
              });
            }
          })
          .on("mouseout", function (event, d) {
            const mining = miningData[d.id];
            d3.select(this)
              .transition()
              .duration(200)
              .style(
                "fill",
                mining
                  ? d3.interpolateRgb("#0a1929", "#ff006e")(mining.intensity)
                  : "#0a1929"
              )
              .style("stroke-width", 0.5);

            setSelectedCountry(null);
          })
          .on("click", function (event, d) {
            const mining = miningData[d.id];
            if (mining) {
              console.log("Clicked country:", mining.name);
              // Add your click handler here
            }
          });

        // Add mining hotspots (points)
        const miningPoints = [
          { coords: [-122.4194, 37.7749], name: "Silicon Valley Data Mining" },
          { coords: [116.4074, 39.9042], name: "Beijing Tech Hub" },
          { coords: [151.2093, -33.8688], name: "Sydney Mining Operations" },
          { coords: [-114.0719, 51.0447], name: "Alberta Oil Sands" },
          { coords: [-70.6693, -33.4489], name: "Chilean Copper Mines" },
        ];

        const pointsGroup = globe.append("g");

        function updatePoints() {
          const visiblePoints = miningPoints.filter((d) => {
            const coords = projection(d.coords);
            return coords && projection.invert(coords);
          });

          const points = pointsGroup
            .selectAll("circle")
            .data(visiblePoints, (d) => d.name);

          points.exit().remove();

          points
            .enter()
            .append("circle")
            .merge(points)
            .attr("cx", (d) => projection(d.coords)[0])
            .attr("cy", (d) => projection(d.coords)[1])
            .attr("r", 3)
            .style("fill", "#00d4ff")
            .style("opacity", 0.8)
            .style("filter", "drop-shadow(0 0 5px #00d4ff)");

          pointsGroup
            .selectAll("circle")
            .on("mouseover", function (event, d) {
              d3.select(this).transition().duration(200).attr("r", 5);
            })
            .on("mouseout", function (event, d) {
              d3.select(this).transition().duration(200).attr("r", 3);
            });
        }

        // Rotation
        let currentRotation = rotationRef.current;
        const drag = d3
          .drag()
          .on("start", function (event) {
            currentRotation = projection.rotate();
            if (autoRotateRef.current) {
              autoRotateRef.current.stop();
              autoRotateRef.current = null;
            }
          })
          .on("drag", function (event) {
            const k = sensitivity / projection.scale();
            projection.rotate([
              currentRotation[0] + event.x * k,
              currentRotation[1] - event.y * k,
            ]);
            rotationRef.current = projection.rotate();
            updatePaths();
          });

        svg.call(drag);

        // Auto-rotation
        autoRotateRef.current = d3.timer(function (elapsed) {
          const rotate = projection.rotate();
          projection.rotate([rotate[0] + 0.2, rotate[1], rotate[2]]);
          rotationRef.current = projection.rotate();
          updatePaths();
        });

        // Stop auto-rotation on user interaction
        svg.on("mousedown", () => {
          if (autoRotateRef.current) {
            autoRotateRef.current.stop();
            autoRotateRef.current = null;
          }
        });
        svg.on("touchstart", () => {
          if (autoRotateRef.current) {
            autoRotateRef.current.stop();
            autoRotateRef.current = null;
          }
        });

        function updatePaths() {
          countriesGroup.selectAll("path").attr("d", path);
          globe.select("path").attr("d", path);
          updatePoints();
        }

        // Initial update
        updatePoints();
      })
      .catch((error) => {
        console.error("Error loading world data:", error);
        // Fallback message
        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("text-anchor", "middle")
          .attr("fill", "#94a3b8")
          .text("Loading globe data...");
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

      {/* Country info overlay */}
      {selectedCountry && (
        <div className="absolute top-4 left-4 glass-panel p-4 pointer-events-none">
          <h4 className="text-lg font-semibold text-accent-neon">
            {selectedCountry.name}
          </h4>
          <p className="text-sm text-gray-300">
            Mining Intensity: {(selectedCountry.intensity * 100).toFixed(0)}%
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass-panel p-4 pointer-events-none">
        <h5 className="text-sm font-semibold mb-2">Mining Activity</h5>
        <div className="flex items-center gap-2 text-xs">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#0a1929" }}
          ></div>
          <span>Low</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#ff006e" }}
          ></div>
          <span>High</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 text-xs text-gray-400 pointer-events-none">
        <p>Drag to rotate • Click countries for details</p>
      </div>
    </div>
  );
}
