import * as d3 from "d3";
import { emotions, d3Height, d3Width } from "../utils/utilities";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 165 };
const WIDTH = d3Width + 70 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = d3Height - MARGIN.TOP - MARGIN.BOTTOM;

class SentiStackD3 {
  constructor(element, data) {
    const vis = this;
    vis.xAttr = "timeStamp";
    vis.keys = emotions;

    // LABEL CREATION AND SCALING
    vis.x = d3.scaleTime().range([0, WIDTH]);
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    // INITIAL SVG CREATION
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .classed("SentiStackSvg", true)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // X AXIS LABEL
    vis.xAxisLabel = vis.g
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 60)
      .attr("font-size", 20)
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("Time");

    // Y AXIS LABEL
    vis.yAxisLabel = vis.g
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -40)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("Senti Stack");

    vis.xAxisGroup = vis.g
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append("g");

    // COLOR PALETTE
    vis.color = d3
      .scaleOrdinal()
      .domain(vis.keys)
      .range(d3.schemeSet1);

    vis.ownColor = [
      "deepskyblue", // HAPPY
      "lightgreen", // SURPRISED
      "lightgoldenrodyellow", // NEUTRAL
      "mediumpurple", // DISGUSTED
      "sienna", // FEARFUL
      "tomato", // ANGRY
      "orchid" // SAD
    ];

    // AREA CREATION
    vis.area = d3
      .area()
      .x(d => vis.x(d.data[vis.xAttr]))
      .y0(d => vis.y(d[0]))
      .y1(d => vis.y(d[1]));

    // HIGHLIGHT FUNCTIONALITY
    vis.highlight = function(d) {
      d3.selectAll(".sentiArea").style("opacity", 0.1);
      d3.select("." + d).style("opacity", 1);
    };

    vis.noHighlight = function(d) {
      d3.selectAll(".sentiArea").style("opacity", 1);
    };

    // ADD BRUSHING
    vis.brush = d3
      .brushX()
      .extent([
        [0, 0],
        [WIDTH, HEIGHT]
      ])
      // .on("end", d => vis.update(d));
      .on("end", vis.update);

    // LEGEND CREATION
    const size = 10;

    vis.legendRect = vis.g
      .selectAll("myrect")
      .data(vis.keys)
      .enter()
      .append("rect")
      .attr("x", WIDTH + 10)
      .attr("y", (d, i) => 20 + i * (size + 30))
      .attr("width", size)
      .attr("height", size)
      .style("fill", (d, i) => vis.ownColor[i])
      .on("mouseover", vis.highlight)
      .on("mouseleave", vis.noHighlight);

    vis.legendText = vis.g
      .selectAll("mylabels")
      .data(vis.keys)
      .enter()
      .append("text")
      .attr("x", WIDTH + 10 + size * 1.5)
      .attr("y", (d, i) => 20 + i * (size + 30) + size / 2)
      .style("fill", (d, i) => vis.ownColor[i])
      .text(d => d)
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      .style("font-size", 18)
      .on("mouseover", vis.highlight)
      .on("mouseleave", vis.noHighlight);

    vis.update(data);
  }

  update(data) {
    const vis = this;
    vis.data = [...data].map(obj => Object.assign({}, obj));

    vis.data.forEach(d => {
      d[vis.xAttr] = new Date(Date.parse(d[vis.xAttr]));
      const totalSum = vis.keys.reduce((acm, key) => (acm += d[key]), 0);
      vis.keys.forEach(key => (d[key] = d[key] / totalSum));
    });

    vis.stackedData = d3.stack().keys(vis.keys)(vis.data);

    // ADJUST SCALING
    vis.x.domain(d3.extent(vis.data, d => d[vis.xAttr]));
    vis.y.domain([0, 1]);

    // AXIS FIGURES TRANSITION
    const xAxisCall = d3
      .axisBottom(vis.x)
      .ticks(6)
      .tickFormat(d3.timeFormat("%b %d"));
    const yAxisCall = d3.axisLeft(vis.y).tickFormat(d3.format(".1f"));

    vis.xAxisGroup
      .transition(1000)
      .call(xAxisCall)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("font-size", 12);
    vis.yAxisGroup
      .transition(1000)
      .call(yAxisCall)
      .selectAll("text")
      .attr("font-size", 12);

    // STACK AREA CHART JOIN
    const stackChart = vis.g.selectAll(".sentiStack").data(vis.stackedData);

    // ENTER
    stackChart
      .enter()
      .append("path")
      .classed("sentiStack", true)
      .merge(stackChart)
      .transition()
      .ease(d3.easeLinear)
      .duration(1000)
      .attr("class", d => `sentiArea ${d.key}`)
      // .style("fill", d => vis.color(d.key))
      .style("fill", (d, i) => vis.ownColor[i])
      .attr("stroke", "lightgray")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1)
      .attr("d", d => vis.area(d));

    stackChart.transition(1000);

    // EXIT
    stackChart.exit().remove();

    stackChart
      .append("g")
      .attr("class", "brush")
      .call(vis.brush);
  }
}

export default SentiStackD3;
