import * as d3 from "d3";
import store from "../store";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 70 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

class TSLineD3 {
  constructor(element, data) {
    const vis = this;
    vis.xAttr = "timeStamp";
    vis.yAttr = "runningScore";

    vis.x = d3.scaleTime().range([0, WIDTH]);
    // vis.x = d3.scaleLinear().range([0, WIDTH]);
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

    vis.valueLine = d3
      .line()
      // .x((d, i) => vis.x(i))
      .x(d => vis.x(d[vis.xAttr]))
      .y(d => vis.y(d[vis.yAttr]))
      // .curve(d3.curveCatmullRom.alpha(0.5));
      .curve(d3.curveMonotoneX);

    vis.update(data);
  }

  update(data) {
    const vis = this;
    vis.data = [...data].map(obj => Object.assign({}, obj));

    vis.data.forEach(d => {
      d[vis.xAttr] = new Date(Date.parse(d[vis.xAttr]));
    });

    console.log("D3 UPDATING!", vis.data.length, vis.xAttr, vis.yAttr);

    // ADJUST SCALING
    vis.x.domain(d3.extent(vis.data, d => d[vis.xAttr]));
    vis.y.domain([
      d3.min(vis.data, d => Number(d[vis.yAttr]) * 0.95),
      d3.max(vis.data, d => Number(d[vis.yAttr]) * 1.05)
    ]);

    // AXIS FIGURES TRANSITION
    const xAxisCall = d3
      .axisBottom(vis.x)
      .ticks(7)
      .tickFormat(d3.timeFormat("%m %d"))
      .attr("transform", "rotate(-65)");
    const yAxisCall = d3.axisLeft(vis.y).tickFormat(d3.format(".0f"));

    vis.xAxisGroup.transition(1000).call(xAxisCall);
    vis.yAxisGroup.transition(1000).call(yAxisCall);

    // LINE CHART
    vis.lineChart = vis.g
      .append("path")
      .data([vis.data])
      .attr("class", "runningScoreLine")
      .attr("d", vis.valueLine);

    // JOIN;
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
      // .attr("cx", d => vis.x(d[xAttr]))
      .attr("cx", (d, i) => vis.x(i))
      .attr("cy", d => vis.y(d[vis.yAttr]));

    // ENTER
    circles
      .enter()
      .append("circle")
      .classed("scatterCircle", true)
      .attr("cy", vis.y(0))
      // .attr("cx", d => vis.x(d[xAttr]))
      .attr("cx", (d, i) => vis.x(i))
      .attr("r", 9)
      .on("click", d => console.log("Clicking -", d))
      .transition(1000)
      .attr("cy", d => vis.y(d[vis.yAttr]));
  }
}

// ----------------------------------------------------------------------------------

// class TSLineD3 {
//   constructor(element, data) {
//     const vis = this;

//     // INITIAL SVG CREATION
//     vis.g = d3
//       .select(element)
//       .append("svg")
//       .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
//       .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
//       .classed("TSLineSvg", true)
//       .append("g")
//       .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

//     // AXIS SCALE
//     vis.x = d3.scaleLinear().range([0, WIDTH]);
//     vis.y = d3.scaleLinear().range([HEIGHT, 0]);

//     // X AXIS LABEL
//     vis.xAxisLabel = vis.g
//       .append("text")
//       .attr("x", WIDTH / 2)
//       .attr("y", HEIGHT + 40)
//       .attr("font-size", 20)
//       .attr("fill", "white")
//       .attr("font-weight", "bold")
//       .attr("text-anchor", "middle")
//       .text("Time");

//     // Y AXIS LABEL
//     vis.yAxisLabel = vis.g
//       .append("text")
//       .attr("x", -(HEIGHT / 2))
//       .attr("y", -50)
//       .attr("transform", "rotate(-90)")
//       .attr("font-size", 20)
//       .attr("fill", "white")
//       .attr("font-weight", "bold")
//       .attr("text-anchor", "middle")
//       .text("Running Score");

//     vis.xAxisGroup = vis.g
//       .append("g")
//       .attr("transform", `translate(0, ${HEIGHT})`);
//     vis.yAxisGroup = vis.g.append("g");

//     vis.update(data);
//   }

//   update(data) {
//     const vis = this,
//       xAttr = "timeStamp",
//       yAttr = "runningScore";
//     vis.data = data;
//     console.log("D3 UPDATING!", vis.data, xAttr, yAttr);

//     // ADJUST SCALING
//     // vis.x.domain([
//     //   d3.min(vis.data, d => Number(d[xAttr]) * 0.9),
//     //   d3.max(vis.data, d => Number(d[xAttr]) * 1.05)
//     // ]);
//     // vis.x.domain(d3.extent(vis.data, d => d[xAttr]));
//     vis.y.domain([
//       d3.min(vis.data, d => Number(d[yAttr]) * 0.95),
//       d3.max(vis.data, d => Number(d[yAttr]) * 1.05)
//     ]);

//     // AXIS FIGURES TRANSITION
//     const xAxisCall = d3.axisBottom(vis.x);
//     const yAxisCall = d3.axisLeft(vis.y);

//     vis.xAxisGroup.transition(1000).call(xAxisCall);
//     vis.yAxisGroup.transition(1000).call(yAxisCall);

//     // JOIN
//     const circles = vis.g.selectAll("circle").data(vis.data, d => d.name);

//     // EXIT
//     circles
//       .exit()
//       .transition(1000)
//       .attr("cy", vis.y(0))
//       .remove();

//     // UPDATE
//     circles
//       .transition(1000)
//       // .attr("cx", d => vis.x(d[xAttr]))
//       .attr("cx", (d, i) => vis.x(i))
//       .attr("cy", d => vis.y(d[yAttr]));

//     // ENTER
//     circles
//       .enter()
//       .append("circle")
//       .classed("scatterCircle", true)
//       .attr("cy", vis.y(0))
//       // .attr("cx", d => vis.x(d[xAttr]))
//       .attr("cx", (d, i) => vis.x(i))
//       .attr("r", 9)
//       // .on("click", d => store.dispatch(setActiveName(d.name)))
//       .on("click", d => console.log("Clicking -", d))
//       .transition(1000)
//       .attr("cy", d => vis.y(d[yAttr]));
//   }
// }

// ----------------------------------------------------------------------------------

// class TSLineD3 {
//   constructor(element, data) {
//     const vis = this;

//     vis.g = d3
//       .select(element)
//       .append("svg")
//       .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
//       .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
//       .classed("scatterPlotSvg", true)
//       .classed("svgChart", true)
//       .append("g")
//       .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

//     // SCALE
//     vis.x = d3.scaleLinear().range([0, WIDTH]);
//     vis.y = d3.scaleLinear().range([HEIGHT, 0]);

//     // X AXIS LABEL
//     vis.xAxisLabel = vis.g
//       .append("text")
//       .attr("x", WIDTH / 2)
//       .attr("y", HEIGHT + 40)
//       .attr("font-size", 20)
//       .attr("fill", "white")
//       .attr("font-weight", "bold")
//       .attr("text-anchor", "middle")
//       .text("Time");

//     // Y AXIS LABEL
//     vis.yAxisLabel = vis.g
//       .append("text")
//       .attr("x", -(HEIGHT / 2))
//       .attr("y", -50)
//       .attr("transform", "rotate(-90)")
//       .attr("font-size", 20)
//       .attr("fill", "white")
//       .attr("font-weight", "bold")
//       .attr("text-anchor", "middle")
//       .text("Running Score");

//     vis.xAxisGroup = vis.g
//       .append("g")
//       .attr("transform", `translate(0, ${HEIGHT})`);
//     vis.yAxisGroup = vis.g.append("g");

//     vis.update(data);
//   }

//   update(data) {
//     const vis = this,
//       keys = Object.keys(data[0]),
//       noNameKeys = keys.filter(x => x !== "name"),
//       [xAttr, yAttr] = noNameKeys;
//     vis.data = data;

//     // ADJUST SCALING
//     vis.x.domain([
//       d3.min(vis.data, d => Number(d[xAttr]) * 0.9),
//       d3.max(vis.data, d => Number(d[xAttr]) * 1.05)
//     ]);
//     vis.y.domain([
//       d3.min(vis.data, d => Number(d[yAttr]) * 0.95),
//       d3.max(vis.data, d => Number(d[yAttr]) * 1.05)
//     ]);

//     // AXIS LABEL TRANSITION
//     vis.xAxisLabel
//       .transition(1000)
//       .text(xAttr.slice(0, 1).toUpperCase() + xAttr.slice(1));
//     vis.yAxisLabel
//       .transition(1000)
//       .text(yAttr.slice(0, 1).toUpperCase() + yAttr.slice(1));

//     // AXIS FIGURES TRANSITION
//     const xAxisCall = d3.axisBottom(vis.x);
//     const yAxisCall = d3.axisLeft(vis.y);

//     vis.xAxisGroup.transition(1000).call(xAxisCall);
//     vis.yAxisGroup.transition(1000).call(yAxisCall);

//     // JOIN
//     const circles = vis.g.selectAll("circle").data(vis.data, d => d.name);

//     // EXIT
//     circles
//       .exit()
//       .transition(1000)
//       .attr("cy", vis.y(0))
//       .remove();

//     // UPDATE
//     circles
//       .transition(1000)
//       .attr("cx", d => vis.x(d[xAttr]))
//       .attr("cy", d => vis.y(d[yAttr]));

//     // ENTER
//     circles
//       .enter()
//       .append("circle")
//       .classed("scatterCircle", true)
//       .attr("cy", vis.y(0))
//       .attr("cx", d => vis.x(d[xAttr]))
//       .attr("r", 9)
//       .on("click", d => store.dispatch(setActiveName(d.name)))
//       .transition(1000)
//       .attr("cy", d => vis.y(d[yAttr]));
//   }
// }

export default TSLineD3;
