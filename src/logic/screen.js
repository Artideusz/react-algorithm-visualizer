import { maxElementValue, singleElementWidth } from "./util.js";
import * as d3 from "d3";

class Screen {
	constructor(screen) {
		this.w = window.innerWidth / 1.7;
		this.h = window.innerHeight / 1.5;
		this.drawType = "bars";
		this.svg = d3
			.select(screen)
			.append("svg")
			.attr("width", this.w)
			.attr("height", this.h);
	}
	drawElements(input, visual) {
		if (this.drawType !== visual) {
			// When type changes, delete all elements in svg
			this.svg.selectAll("*").remove();
			if (visual === "pie") {
				this.g = this.svg
					.append("g")
					.attr(
						"transform",
						`translate(${(this.w / 2) << 0}, ${(this.h / 2) << 0})`
					);
			}
			this.drawType = visual;
		}
		this[visual](input);
	}
	bars(input) {
		let scale = d3
			.scaleLinear()
			.domain([0, maxElementValue(input.array)])
			.range([0, this.h]);

		//Elements draw
		this.svg
			.selectAll("rect")
			.data(input.array)
			.style("fill", (d, i) => {
				return input.activeIndexes.indexOf(i) !== -1 ? "#ff0000" : d.rgb;
			})
			.attr("x", (d, i) => {
				return i * singleElementWidth(input.array.length, this.w);
			})
			.attr("y", (d, i) => {
				return this.h - scale(d.value);
			})
			.attr("width", (d, i) => {
				return singleElementWidth(input.array.length, this.w);
			})
			.attr("height", (d, i) => {
				return scale(d.value);
			})
			.enter()
			.append("rect");
		
		
		//Remove elements when there is less elements to show
		this.svg
			.selectAll("rect")
			.data(input.array)
			.exit()
			.remove();
	}
	points(input) {
		let scale = d3
			.scaleLinear()
			.domain([0, maxElementValue(input.array)])
			.range([0, this.h]);
		this.svg
			.selectAll("circle")
			.data(input.array)
			.style("fill", (d, i) => {
				return input.activeIndexes.indexOf(i) !== -1 ? "#ff0000" : d.rgb;
			})
			.attr("cx", (d, i) => {
				return (
					i * singleElementWidth(input.array.length, this.w) +
					singleElementWidth(input.array.length, this.w) / 2
				);
			})
			.attr("cy", (d, i) => {
				return this.h - scale(d.value);
			})
			.attr("r", (d, i) => {
				return singleElementWidth(input.array.length, this.w) / 2;
			})
			.enter()
			.append("circle");
		this.svg
			.selectAll("circle")
			.data(input.array)
			.exit()
			.remove();
	}
	pie(input) {
		let pie = d3
			.pie()
			.value(d => d.value)
			.sort((a, b) => {
				return d3.ascending(a.key, b.key);
			});

		this.g
			.selectAll("path")
			.data(pie(input.array))
			.attr(
				"d",
				d3
					.arc()
					.innerRadius(0)
					.outerRadius(Math.min(this.w, this.h) / 2)
			)
			.data(input.array)
			.attr("fill", (d, i) => {
				return input.activeIndexes.indexOf(i) !== -1 ? "#f00" : d.rgb;
			})
			.enter()
			.append("path");
		this.g
			.selectAll("path")
			.data(input.array)
			.exit()
			.remove();
	}
}

export default Screen;
