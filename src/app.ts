import * as d3 from 'd3';
import {EventData, Record, Event} from './data';

module app {
    const padding = 100;
    const height = 400;
    const width = 800;

    const mindate = new Date(2019, 9, 1);
    const maxdate = new Date(2020, 3, 10);

    const eventLabel: { [index: string]: string; } = {
        "a": "#f00",
        "b": "#0f0",
        "c": "#00f"
    };

    const y = d3.scaleLinear()
        .domain([0, 24])
        .range([padding, height - padding]);

    const x = d3.scaleTime()
        .domain([mindate, maxdate])
        .range([padding, width - padding]);

    const xAxis = d3.axisTop(x)
        .tickSize(6);

    const dateParse = d3.timeParse("%Y-%m-%d");

    function c(date: string) {
        const d = dateParse(date);
        if (d != null) {
            return d;
        }
        return mindate;
    }

    const svg = d3.select("#canvas")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom<SVGSVGElement, unknown>().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .append("g")
        .attr("text-anchor", "end")
        .style("font", "10px sans-serif");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,0)")
        .call(xAxis);

    d3.json<EventData>("data.json")
        .then((data) => {
            (data as EventData).records.forEach((d, i: number) => {
                const g = svg.append("g");
                g.append("line")
                    .attr("stroke", "#aaa")
                    .attr("x1", x(c(d.events[0].date)))
                    .attr("x2", x(c(d.events[d.events.length - 1].date)))
                    .attr("y1", y(i))
                    .attr("y2", y(i));

                g.selectAll("circle")
                    .data(d.events)
                    .enter().append("circle")
                    .attr("cx", e => x(c(e.date)))
                    .attr("cy", y(i))
                    .attr("fill", e => eventLabel[e.event])
                    .attr("opacity", "0.5")
                    .attr("r", "3.5");

                g.append("text")
                    .attr("dy", "0.35em")
                    .attr("x", x(c(d.events[0].date)) - 6)
                    .attr("y", y(i))
                    .text(d.id);
            })
        })
        .catch((error) => {
            console.log('xxxx');
            throw error;
        });
}