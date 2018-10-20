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
		var hasSize, hasColour, hasX, hasY,
			xaxisCol,yaxisCol,colourCol,sizeCol;
		
		const target = document.createElement("div");
		document.getElementById("test").appendChild(target);
		const pic = picasso({
			style: {
				"$font-size": "12px",
				"$font-size--l": "18px",
				"$font-family": "Source Sans Pro",
			},
		});
		
		const colNames = ["Sales", "Margin","Year", "Month"];//data[0] ? data[0] : [];
		
		hasSize = colNames.includes(this.state.size);
		hasColour = colNames.includes(this.state.colour);
		hasX = colNames.includes(this.state.xaxis);
		hasY = colNames.includes(this.state.yaxis);
		
		xaxisCol = hasX ? this.state.xaxis : colNames[0];
		yaxisCol = hasY ? this.state.yaxis : colNames[0];
		colourCol = hasColour ? this.state.colour : "";
		sizeCol = hasSize ? this.state.size : "";
		this.setState({
			xaxis:xaxisCol,
			yaxis:yaxisCol,
			colour:colourCol,
			size:sizeCol 
		});
		
		console.log(xaxisCol);
		console.log(yaxisCol);
		
		this.chart = pic.chart({
			element: this.reference,
			data,
			settings: {
				scales: {
					x: {
						data: {
							field: xaxisCol,
						}
					},
					y: {
						data: {
							field: yaxisCol,
						},
						invert : true
					},
					col: {
						data: { extract: { field: hasColour ? this.state.colour : colNames[0]}},
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
								y: { field: yaxisCol },
								x: { field: xaxisCol },
								fill : {field: hasColour ? colourCol : colNames[0]},
								size : {field: hasSize ? sizeCol : colNames[0]}
							},
						},
					},
					settings: {
						x: { scale: 'x' },
						y: { scale: 'y' },
						shape: "circle",
						size : hasSize ? {scale : 'size'} : 1,
						fill : hasColour ? {scale : 'col'} : "#0000FF",
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
			<div style={{ border:"50px", margin:"50px", width:"400px", height: "300px" }}>
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