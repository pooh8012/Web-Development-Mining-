// components/ZoomableUSMap.jsx
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature, mesh } from "topojson-client";

export default function ZoomableUSMap() {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const width = 975;
    const height = 610;

    // load the TopoJSON
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then((us) => {
        // guard
        if (!us.objects?.states) {
          console.error("TopoJSON missing states:", us);
          return;
        }

        // clear old content
        d3.select(container.current).selectAll("*").remove();

        // create the SVG inside the container
        const svg = d3
          .create("svg")
          .attr("viewBox", [0, 0, width, height])
          .attr("width", width)
          .attr("height", height)
          .attr("style", "max-width: 100%; height: auto;")
          .on("click", reset);

        const pathGen = d3.geoPath();
        const g = svg.append("g");

        // draw each state
        const states = g
          .append("g")
          // try a lighter fill so you can actually see it
          .attr("fill", "#888")
          .attr("cursor", "pointer")
          .selectAll("path")
          .data(feature(us, us.objects.states).features)
          .join("path")
          .on("click", clicked)
          .attr("d", pathGen);

        states.append("title").text((d) => d.properties.name);

        // state boundaries
        g.append("path")
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-linejoin", "round")
          .attr("d", pathGen(mesh(us, us.objects.states, (a, b) => a !== b)));

        // zoom behavior
        const zoom = d3
          .zoom()
          .scaleExtent([1, 8])
          .on("zoom", ({ transform }) => {
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
          });

        svg.call(zoom);

        // handlers
        function reset() {
          states.transition().style("fill", "#888");
          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity,
              d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
            );
        }

        function clicked(event, d) {
          const [[x0, y0], [x1, y1]] = pathGen.bounds(d);
          event.stopPropagation();
          states.transition().style("fill", "#888");
          d3.select(this).transition().style("fill", "red");
          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(
                  Math.min(
                    8,
                    0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
                  )
                )
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
              d3.pointer(event, svg.node())
            );
        }
      })
      .catch((err) => console.error("Failed to load map:", err));
  }, []);

  return (
    <div
      ref={container}
      className="w-full h-[610px] max-w-4xl mx-auto my-8 drop-shadow-xl bg-primary"
    />
  );
}
