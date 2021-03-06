import * as d3 from "d3";
import { d3Height, d3Width } from "../utils/utilities";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 70 };
const WIDTH = d3Width - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = d3Height - MARGIN.TOP - MARGIN.BOTTOM;

class TSLineD3 {
  constructor(element, data) {
    const vis = this;
    vis.xAttr = "timeStamp";
    vis.yAttr = "trueScore";

    // LABEL SCALING
    vis.x = d3.scaleTime().range([0, WIDTH]);
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    // INITIAL SVG CREATION
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .classed("TSLineSvg", true)
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
      .text("True Score");

    vis.xAxisGroup = vis.g
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append("g");

    vis.valueLine = d3
      .line()
      .x(d => vis.x(d[vis.xAttr]))
      .y(d => vis.y(d[vis.yAttr]))
      .curve(d3.curveCatmullRom.alpha(0.5));

    vis.update(data);
  }

  update(data) {
    const vis = this;
    vis.data = [...data].map(obj => Object.assign({}, obj));

    // const point = data[data.length - 1];
    // console.log("HMM -", point.timeStamp, point);

    vis.data.forEach(d => {
      d[vis.xAttr] = new Date(Date.parse(d[vis.xAttr]));
    });

    // ADJUST SCALING
    vis.x.domain(d3.extent(vis.data, d => d[vis.xAttr]));
    vis.y.domain([0, 10]);

    // AXIS FIGURES TRANSITION
    const xAxisCall = d3
      .axisBottom(vis.x)
      .ticks(6)
      .tickFormat(d3.timeFormat("%b %d"));
    const yAxisCall = d3.axisLeft(vis.y).tickFormat(d3.format(".0f"));

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

    // LINE CHART JOIN
    const lineChart = vis.g.selectAll(".trueScoreLine").data([vis.data]);

    // ENTER
    lineChart
      .enter()
      .append("path")
      .classed("trueScoreLine", true)
      .merge(lineChart)
      .attr("d", vis.valueLine);

    // CIRCLE JOIN
    const circles = vis.g.selectAll("circle").data(vis.data, d => d.name);

    // EXIT
    circles.exit().remove();

    // UPDATE
    circles
      .transition(1000)
      .attr("cx", d => vis.x(d[vis.xAttr]))
      .attr("cy", d => vis.y(d[vis.yAttr]));

    // ENTER
    circles
      .enter()
      .append("circle")
      .classed("trueScoreLineCircle", true)
      .attr("cx", d => vis.x(d[vis.xAttr]))
      .attr("cy", d => vis.y(d[vis.yAttr]))
      .attr("r", 4)
      .on("click", d => console.log("Clicking -", d));
  }
}

export default TSLineD3;
