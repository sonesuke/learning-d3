import * as d3 from 'd3';

interface Event {
    event: string;
    date: string;
}

interface Record {
    id: string;
    events: Event[];
}

interface EventData {
    records: Record[];
}

var padding = 100;
var height = 400;
var width = 800;

var mindate = new Date(2019, 9, 1);
var maxdate = new Date(2020, 3, 10);

var eventLabel: { [index: string]: string; }  = {
  "a": "#f00",
  "b": "#0f0",
  "c": "#00f"
};


var y = d3.scaleLinear()
    .domain([0, 24])
    .range([padding, height - padding]);

var x = d3.scaleTime()
    .domain([mindate, maxdate])
    .range([padding, width - padding]);

var dateParse = d3.timeParse("%Y-%m-%d");
function c(date:string) {
    var d = dateParse(date);
    if (d != null) {
        return d;
    }
    return mindate;
}

var svg = d3.select("#canvas")
    .append("svg")
    .attr("width",  width)
    .attr("height",  height)
    .call(d3.zoom<SVGSVGElement, unknown>().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
    }))
    .append("g")
        .attr("text-anchor", "end")
        .style("font", "10px sans-serif");

d3.json("data.json")
    .then((data) => {
        console.log(data);
        console.log(data as EventData);
        (data as EventData).records.forEach((d, i:number) => {
            const g = svg.append("g");
            g.append("line")
                .attr("stroke", "#aaa")
                .attr("x1", x(c(d.events[0].date)))
                .attr("x2", x(c(d.events[d.events.length - 1].date)))
                .attr("y1", y(i))
                .attr("y2", y(i));

            d.events.forEach((e, j) => {
                g.append("circle")
                    .attr("cx", x(c(e.date)))
                    .attr("cy", y(i))
                    .attr("fill", eventLabel[e.event])
                    .attr("opacity", "0.5")
                    .attr("r", "3.5");
            });

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


