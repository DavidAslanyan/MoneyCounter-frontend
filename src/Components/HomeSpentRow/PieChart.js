import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


const PieChart = ({data}) => {
  const svgRef = useRef();
  useEffect(() => {
    const colors = ["#AA0000","#fd5c63","#DE3163", "#E9967A", "#97233F", "red", "pink"]

    const svg = d3.select(svgRef.current);
    d3.scaleOrdinal(["red"]);
    const pie = d3.pie().value(d => d.percent);
    const arcs = pie(data);
    svg.attr("viewBox", [-100, -100, 200, 200])
    svg
      .selectAll('path')
      .data(arcs)
      .join('path')
        .attr('d', d3.arc()
           .innerRadius(50) 
           .outerRadius(100)
        )
        .attr('fill', (d,i) => colors[i])
        .on("mouseover", function(d) {
          d3.select(this)
            .style("cursor", "pointer")
            .style("opacity", 0.5);
          svg
            .append("text")
            .attr("id", "tooltip")
            .attr("x", -50)
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .text(`Title:${d.data.title} Percent:${d.data.percent}%`)
        })
        .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "default")
            .style("opacity", 1);
          d3.select("#tooltip").remove();
        })
        .append("title")
        .text((d) => d.data.title+":"+d.data.percent+"%");
  }, [data]);

  return (
    <svg className='home__pieChartSpent' ref={svgRef}>
    </svg>
  );
};

export default PieChart;
