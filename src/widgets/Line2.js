import React, { Component } from "react";
import picasso from "picasso.js";
import { WidgetProps } from "../consts";

export default class Line extends Component {
	static propTypes = WidgetProps;

	constructor(props) {
		super(props);

		const config = this.getConfig(); let
			fields;

		if (props.hasOwnProperty("config")) {
			if (props.config.hasOwnProperty("xaxis")) {
				config.xaxis = props.config.xaxis;
			}
			if (props.config.hasOwnProperty("yaxis")) {
				config.yaxis = props.config.yaxis;
			}
			if (props.config.hasOwnProperty("size")) {
				config.size = props.config.size;
			}
			if (props.config.hasOwnProperty("colour")) {
				config.colour = props.config.colour;
			}
		}

		if (props.config.hasOwnProperty("fields")) {
			fields = props.fields;
		} else {
			fields = this.defaultFields();
		}

		this.state = {
			xaxis: "",
			yaxis: "",
			size: "",
			colour: "",
			fields,
		};
	}

	getConfig() {
		return {
			xaxis: "", yaxis: "", size: "", colour: "",
		};
	}

	handleChange(name, event) {
		const m = {};
		m[name] = event.target.value;
		this.setState(m);
	}

	defaultFields() {
		return ["Country", "Ocean Basins", "Partners", "Commitments"];
	}

	componentDidMount() {
		// this.q.getBox((data) => {
		this.renderGraph.call(this);
		// });
	}

	renderGraph() {
		const { app } = this.props;

		const colNames = this.state.fields;
		
		const hasX = colNames.includes(this.state.xaxis);
		const hasY = colNames.includes(this.state.yaxis);
		
		const xaxisCol = hasX ? this.state.xaxis : colNames[0];
		const yaxisCol = hasY ? this.state.yaxis : colNames[0];
		this.setState({
			xaxis: xaxisCol,
			yaxis: yaxisCol,
		});
		
		app.visualization.create("linechart", // viz type
			[xaxisCol, "=["+yaxisCol+"]"],
			{
				lineType: "area",
				nullMode : "connect",
				dataPoint:{show:true, showLabels:true}
			})
			.then((viz) => {
				viz.show(this.ref);
			});
	}

	render() {
		const { data } = this.state;
		return (
			<div style={{
				border: "50px", margin: "50px", width: "400px", height: "300px",
			}}
			>
				<span>
					<div
						id="test"
						style={{ position: "relative", width: "100%", height: "80%" }}
						ref={(ref) => {
							this.ref = ref;
						}}
					/>
				</span>
				<span>
					<div>
						X-Axis:
						<select
							value={this.state.xaxis}
							onChange={this.handleChange.bind(this, "xaxis")}
						>
							{this.state.fields.map((val) => <option key={val} value={val}>{val}</option>)}
						</select>
					</div>
					<div>
						Y-Axis:
						<select
							value={this.state.yaxis}
							onChange={this.handleChange.bind(this, "yaxis")}
						>
							{this.state.fields.map((val) => <option key={val} value={val}>{val}</option>)}
						</select>
					</div>
					<div>
						Size:
						<select
							value={this.state.size}
							onChange={this.handleChange.bind(this, "size")}
						>
							{[""].concat(this.state.fields).map((val) => <option key={val} value={val}>{val}</option>)}
						</select>
					</div>
					<div>
						Colour:
						<select
							value={this.state.colour}
							onChange={this.handleChange.bind(this, "colour")}
						>
							{[""].concat(this.state.fields).map((val) => <option key={val} value={val}>{val}</option>)}
						</select>
					</div>
					<input type="button" value="Clickme" onClick={this.renderGraph.bind(this)} />
				</span>
			</div>
		);
	}
}
