import React, { Component } from "react";
import picasso from "picasso.js";
import { WidgetProps } from "../consts";

export default class Template extends Component {
	static props = WidgetProps;

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const data = [{
			type: "matrix",
			data: [
				["Year", "Month", "Sales", "Margin"],
				["2010", "Jan", 1106, 7],
				["2010", "Feb", 5444, 53],
				["2010", "Mar", 147, 64],
				["2010", "Apr", 7499, 47],
				["2010", "May", 430, 62],
				["2010", "June", 9735, 13],
				["2010", "July", 7435, 15],
				["2011", "Jan", 1482, 45],
				["2011", "Feb", 2659, 76],
				["2011", "Mar", 1261, 73],
				["2011", "Apr", 3085, 56],
				["2011", "May", 3035, 91],
				["2011", "June", 7691, 88],
				["2011", "July", 3012, 81],
				["2012", "Jan", 7980, 61],
				["2012", "Feb", 2564, 22],
				["2012", "Mar", 7957, 98],
				["2012", "Apr", 5809, 1],
				["2012", "May", 429, 2],
				["2012", "June", 6757, 77],
				["2012", "July", 9415, 92],
			],
		}];
		this.create([]);
		// this.q.getBox((data) => {
		setTimeout(() => {
			this.update(data);
		}, 3000);
		// });
	}

	update(data) {
		this.chart.update({ data });
	}

	create(data) {
		const target = document.createElement("div");
		document.getElementById("test").appendChild(target);
		const pic = picasso({
			style: {
				"$font-size": "12px",
				"$font-size--l": "18px",
				"$font-family": "Source Sans Pro",
			},
		});
		this.chart = pic.chart({
			element: this.reference,
			data,
			settings: {
				scales: {
					s: {
						data: {
							field: "Sales",
						},
						expand: 0.2,
						invert: true,
					},
					m: {
						data: {
							field: "Margin",
						},
						expand: 0.1,
					},
					col: {
						data: { extract: { field: "Year" } },
						type: "color",
					},
				},
				components: [{
					key: "y-axis",
					type: "axis",
					scale: "s",
					dock: "left",
				}, {
					type: "legend-cat",
					dock: "right",
					scale: "col",
				}, {
					key: "x-axis",
					type: "axis",
					scale: "m",
					dock: "bottom",
				}, {
					key: "p",
					type: "point",
					data: {
						extract: {
							field: "Month",
							props: {
								y: { field: "Sales" },
								x: { field: "Margin" },
								group: { field: "Year" },
							},
						},
					},
					settings: {
						x: { scale: "m" },
						y: { scale: "s" },
						shape: "circle",
						size: () => Math.random(),
						strokeWidth: 2,
						stroke: "#fff",
						opacity: 0.8,
						fill: { scale: "col", ref: "group" },
					},
				}],
			},
			created() {
				console.log("Chart was created");
			},
			mounted() {
				console.log("Chart was mounted");
			},
		});
	}


	render() {
		const { data } = this.state;
		return (
			<div
				id="test"
				style={{ height: "500px" }}
				ref={(reference) => {
					this.reference = reference;
				}}
			/>
		);
	}
}
