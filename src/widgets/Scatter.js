import React, { Component } from "react";
import picasso from "picasso.js";
import { WidgetProps } from "../consts";

export default class Scatter extends Component {
	static props = WidgetProps;
	constructor(props) {
		super(props);
		this.state = {xaxis:'Sales',
					  yaxis:'Margin',
					  size:'',
					  colour:'Month'};
	}
	
	handleChange(name, event) {
		var m = {};
		m[name] = event.target.value;
		this.setState(m);
	}

	componentDidMount() {
		this.renderGraph.call(this);
	}
	
	renderGraph() {
		const data = [{
			type: "matrix",
			data: [
				["Year", "Month", "Sales", "Margin"],
				["2010", "Jan", 1106, 7],
				["2010", "Feb", 500, 53],
				["2010", "Mar", 147, 64],
				["2010", "Apr", 600, 47],
				["2010", "May", 430, 62],
				["2010", "June", 700, 13]
			],
		}];
		this.create([]);
		// this.q.getBox((data) => {
		setTimeout(() => {
			this.update(data);
		}, 100);
		// });
	}

	update(data) {
		this.chart.update({ data });
	}

	create(data) {
		var size, colour;
		
		const target = document.createElement("div");
		document.getElementById("test").appendChild(target);
		const pic = picasso({
			style: {
				"$font-size": "12px",
				"$font-size--l": "18px",
				"$font-family": "Source Sans Pro",
			},
		});
		
		const colNames = ["Year", "Month", "Sales", "Margin"];//data[0] ? data[0] : [];
		
		var size = colNames.includes(this.state.size) ? {scale : this.state.size} : 1;
		var colour = colNames.includes(this.state.colour) ? {scale : this.state.colour} : "#0000FF";
		
		this.chart = pic.chart({
			element: this.reference,
			data,
			settings: {
				scales: {
					x: {
						data: {
							field: this.state.xaxis,
						}
					},
					y: {
						data: {
							field: this.state.yaxis,
						},
						invert : true
					},
					col: {
						data: { extract: { field: this.state.colour }},
						type: "color",
					},
					size: {
						data: {
							field: this.state.size,
						}
					}
				},
				components: [{
					key: "y-axis",
					type: "axis",
					scale: "y",
					dock: "left",
				}, {
					key: "x-axis",
					type: "axis",
					scale: "x",
					dock: "bottom",
				}, {
					key: "p",
					type: "point",
					data: {
						extract: {
							field: "Month",
							props: {
								y: { field: this.state.yaxis },
								x: { field: this.state.xaxis },
							},
						},
					},
					settings: {
						x: { scale: 'x' },
						y: { scale: 'y' },
						shape: "circle",
						size: size,
						fill: colour,
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
			<div style={{ border:"50px", margin:"50px", width:"400px", height: "400px" }}>
				<div
					id="test"
					style={{ position:"relative", width:"100%", height: "100%" }}
					ref={(reference) => {
						this.reference = reference;
					}}
				/>
				<div> 
					X-Axis: 
					<input  type="text"
						    value={this.state.xaxis}
							onChange={this.handleChange.bind(this,"xaxis")}/>
				</div>
				<div> 
					Y-Axis: 
					<input  type="text"
						    value={this.state.yaxis}
							onChange={this.handleChange.bind(this,"yaxis")}/>
				</div>
				<div> 
					Size: 
					<input  type="text"
						    value={this.state.size}
							onChange={this.handleChange.bind(this,"size")}/>
				</div>
				<div> 
					Colour: 
					<input  type="text" 
						    value={this.state.colour}
							onChange={this.handleChange.bind(this,"colour")}/>
				</div>
				<input type="button" value="Clickme" onClick={this.renderGraph.bind(this)}></input>
			</div>
		);
	}
}