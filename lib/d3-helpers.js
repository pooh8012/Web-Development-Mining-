import * as d3 from "d3";

export const createResponsiveSvg = (container, aspectRatio = 16 / 9) => {
  const width = container.clientWidth;
  const height = width / aspectRatio;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  return { svg, width, height };
};

export const createZoom = (svg, extent = [0.5, 8]) => {
  const zoom = d3
    .zoom()
    .scaleExtent(extent)
    .on("zoom", (event) => {
      svg.selectAll("g").attr("transform", event.transform);
    });

  svg.call(zoom);
  return zoom;
};

export const createTooltip = () => {
  return d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("padding", "10px")
    .style("background", "rgba(0, 0, 0, 0.8)")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("pointer-events", "none")
    .style("font-size", "12px");
};

export const animateNumber = (selection, targetValue, duration = 1000) => {
  selection
    .transition()
    .duration(duration)
    .tween("text", function () {
      const i = d3.interpolateNumber(0, targetValue);
      return function (t) {
        this.textContent = Math.round(i(t));
      };
    });
};
