import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function useD3(renderChartFn, dependencies) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      renderChartFn(svg);
    }
    return () => {
      if (ref.current) {
        d3.select(ref.current).selectAll("*").remove();
      }
    };
  }, dependencies);

  return ref;
}
