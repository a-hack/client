import React, { Component } from "react";
import { WidgetProps } from "../consts";

export default class Scatter2 extends Component {
	static propTypes = WidgetProps;

	constructor(props) {
		super(props);

		const config = this.getConfig();
		let fields;

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
		this.renderGraph.call(this);
	}

	defaultFields() {
		return ["Country", "Ocean Basins", "Partners", "Commitments", "Goals", "Targets"];
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
		
		const mapMap = {"Country" : "Country", 
		 "Ocean Basins" : "=Count(Distinct [Commitment ID])", 
		 "Partners" : "=Count(Distinct [Partners])", 
		 "Commitments" : "=Count(Distinct [Ocean Basins])"};
		
		app.visualization.create("scatterchart", // viz type
			[xaxisCol, mapMap[yaxisCol]],
			{
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
				height: "100%",
			}}
			>
				<span>
					<div
						id="test"
						style={{height: "50%" }}
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
				</span>
			</div>
		);
	}
}
