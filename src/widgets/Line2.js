import React, { Component } from "react";
import { WidgetProps } from "../consts";

export default class Line2 extends Component {
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
			fields = props.fields ? props.fields : this.defaultFields();
		} else {
			fields = this.defaultFields();
		}

		
		
		this.state = {
			xaxis: config.xaxis,
			yaxis: config.yaxis,
			size: "",
			colour: "",
			fields: fields,
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
		console.log(this.state);
		console.log(m);
		
		let tmpState = this.state;
		tmpState[name] = m.name;
		this.props.updateConfig(tmpState);
		
		this.renderGraph(m);
	}

	defaultFields() {
		return ["Country", "Ocean Basins", "Partners", "Commitments"];
	}

	componentDidMount() {
		// this.q.getBox((data) => {
		this.renderGraph.call(this);
		// });
	}

	renderGraph(newm) {
		const { app } = this.props;

		const colNames = this.state.fields;
		
		const cX = newm ? (newm.xaxis ? newm.xaxis: this.state.xaxis) : this.state.xaxis;
		const cY = newm ? (newm.yaxis ? newm.yaxis: this.state.yaxis) : this.state.yaxis;
		
		const hasX = colNames.includes(cX);
		const hasY = colNames.includes(cY);
		
		const xaxisCol = hasX ? cX : "Country";
		const yaxisCol = hasY ? cY : "Partners";
		
		console.log(hasX);
		console.log(hasY);
		console.log(xaxisCol);
		console.log(yaxisCol);
		console.log(this.state.xaxis);
		console.log(this.state.yaxis);
		
		this.setState({
			xaxis: xaxisCol,
			yaxis: yaxisCol,
		});
		
		const mapMap = {"Country" : "Country", 
		 "Commitments" : "=Count(Distinct [Commitment ID])", 
		 "Partners" : "=Count(Distinct [Partners])", 
		 "Ocean Basins" : "=Count(Distinct [Ocean Basins])"};
		
		app.visualization.create("linechart", // viz type
			[xaxisCol, mapMap[yaxisCol]],
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
				height: "100%",
			}}
			>
				<span>
					<div
						id="test"
						style={ {height: "80%" }}
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
				</span>
			</div>
		);
	}
}
