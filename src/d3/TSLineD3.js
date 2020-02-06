import * as d3 from "d3";
import store from "../store";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 70 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

class TSLineD3 {
  constructor(element, data) {
    const vis = this;

    // INITIAL SVG CREATION
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .classed("TSLineSvg", true)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // SCALE
    vis.x = d3.scaleLinear().range([0, WIDTH]);
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    // X AXIS LABEL
    vis.xAxisLabel = vis.g
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("Time");

    // Y AXIS LABEL
    vis.yAxisLabel = vis.g
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("Running Score");

    vis.xAxisGroup = vis.g
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append("g");

    vis.update(data);
  }

  update(data) {
    const vis = this,
      xAttr = "timeStamp",
      yAttr = "runningScore";
    vis.data = data;

    console.log("D3 UPDATING!", vis.data, xAttr, yAttr);

    // ADJUST SCALING
    vis.x.domain([
      d3.min(vis.data, d => Number(d[xAttr]) * 0.9),
      d3.max(vis.data, d => Number(d[xAttr]) * 1.05)
    ]);
    vis.y.domain([
      d3.min(vis.data, d => Number(d[yAttr]) * 0.95),
      d3.max(vis.data, d => Number(d[yAttr]) * 1.05)
    ]);

    // AXIS FIGURES TRANSITION
    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);

    vis.xAxisGroup.transition(1000).call(xAxisCall);
    vis.yAxisGroup.transition(1000).call(yAxisCall);

    // LINE CHART
    vis.lineChart = vis.g
      .append("path")
      .datum(vis.data)
      // .datum(vis.data, d => {
      //   console.log("HMM -", d);
      //   d.runningScore;
      // })
      .attr("class", "runningScoreLine")
      .attr(
        "d",
        d3
          .line(vis.data)
          .x(d => d[xAttr])
          .y(d => d[yAttr])
          .curve(d3.curveMonotoneX)
      );

    // JOIN
    const circles = vis.g.selectAll("circle").data(vis.data, d => d.name);

    // EXIT
    circles
      .exit()
      .transition(1000)
      .attr("cy", vis.y(0))
      .remove();

    // UPDATE
    circles
      .transition(1000)
      .attr("cx", d => vis.x(d[xAttr]))
      .attr("cy", d => vis.y(d[yAttr]));

    // ENTER
    circles
      .enter()
      .append("circle")
      .classed("scatterCircle", true)
      .attr("cy", vis.y(0))
      .attr("cx", d => vis.x(d[xAttr]))
      .attr("r", 9)
      // .on("click", d => store.dispatch(setActiveName(d.name)))
      .on("click", d => console.log("Hello Click!"))
      .transition(1000)
      .attr("cy", d => vis.y(d[yAttr]));
  }
}

export default TSLineD3;
