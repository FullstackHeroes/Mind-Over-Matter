import * as d3 from "d3";
import _ from "lodash";

class TSLineD3a {
  constructor(element, data) {
    // CREATE X AND Y SCALES
    const xScale = d3
      .scaleTime()
      .domain([dateUtils.getStartOfMonth(new Date()), new Date()])
      .range([0, d3Config.maxChartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3Config.defaultMaxYValue])
      .range([d3Config.maxChartHeight, 0]);

    // SCALE DATA POINTS BASED ON RANGE / DOMAIN
    const scaleXData = point => {
      return xScale(new Date(point.timestamp));
    };

    const scaleYData = point => {
      return yScale(point.value);
    };

    // CREATE X AND Y AXES
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat(format(d3Config.numberFormat));

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(timeFormat(d3Config.dateFormat));

    // BUILD ELEMENTS WITHIN OUR MAIN SVG
    const buildAxes = () => {
      d3.select(".line-chart")
        .append("g")
        .attr("class", "line-chart-yaxis");

      d3.select(".line-chart")
        .append("g")
        .attr("class", "line-chart-xaxis");
    };

    const buildLine = () => {
      d3.select(".line-chart")
        .append("path")
        .attr("class", "line-chart-line");
    };

    // DRAW ELEMENTS OF CHART
    const drawAxes = () => {
      d3.select(".line-chart-xaxis").call(xAxis);

      d3.select(".line-chart-yaxis").call(yAxis);
    };

    const drawLine = data => {
      const line = d3
        .line()
        .x(scaleXData)
        .y(scaleYData)
        .curve(curveMonotoneX);

      d3.select(".line-chart-line").attr("d", line(data));
    };

    // INVOKE FUNCTIONS
    const renderChanges = data => {
      drawAxes();
      drawLine(data);
    };

    // CALL NECESSARY FUNCTIONS
    d3Utils.initializeChart = data => {
      buildAxes();
      buildLine();
      renderChanges(data);
    };
  }

  update(data) {
    // ADJUST Y SCALE
    const adjustYScale = data => {
      const maxPoint = _.maxBy(data, point => point.value);
      const maxY = _.max([maxPoint.value, d3Config.defaultMaxYValue]);
      yScale.domain([0, maxY]);
    };

    // ADJUST X SCALE
    const adjustXScale = (data, timeFrame) => {
      const date = new Date();
      let startDate;

      switch (timeFrame) {
        case "monthToDate":
          startDate = dateUtils.getStartOfMonth(date);
          break;
        case "oneYear":
          startDate = dateUtils.subtract(date, 12, "month");
          break;
        default:
          startDate = new Date(_.first(data).timestamp);
      }
      xScale.domain([startDate, date]);
    };
  }
}

export default TSLineD3a;
