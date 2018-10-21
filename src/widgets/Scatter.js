import React, { Component } from "react";
import picasso from "picasso.js";
import { WidgetProps } from "../consts";

export default class Scatter extends Component {
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
		const { q, fields } = this.props;

		this.create([{
			type: "matrix",
			data: [
				fields,
			],
		}]);
		// this.q.getBox((data) => {

		const barchartProperties = {
			qInfo: {
				qType: "visualization",
				qId: "",
			},
			type: "scatterplot-country-partner-comitments",
			labels: true,
			qHyperCubeDef: {
				qDimensions: [{
					qDef: {
						qFieldDefs: ["Country"],
						qSortCriterias: [{
							qSortByAscii: 1,
						}],
					},
					qNullSuppression: true,
				}],
				qMeasures: [{
					qDef: {
						qDef: "=Count(Distinct [Commitment ID])",
					},
					qSortBy: {
						qSortByNumeric: -1,
					},
				}, {
					qDef: {
						qDef: "=Count(Distinct [Partners])",
					},
					qSortBy: {
						qSortByNumeric: -1,
					},
				}, {
					qDef: {
						qDef: "=Count(Distinct [Ocean Basins])",
					},
					qSortBy: {
						qSortByNumeric: -1,
					},
				}],
				qInterColumnSortOrder: [1, 0],
				qInitialDataFetch: [{
					qTop: 0, qHeight: 500, qLeft: 0, qWidth: 17,
				}],
				qSuppressZero: false,
				qSuppressMissing: true,
			},
		};

		q.createSessionObject(barchartProperties).then(model => {
			model.getLayout().then(info => {
				const newData = [{
					type: "matrix",
					data: [
						this.state.fields,
						...info.qHyperCube.qDataPages[0].qMatrix
							.map(country => [
								country[0].qText,
								country[3].qNum,
								country[2].qNum,
								country[1].qNum,
							]),
					],
				}];

				this.update(newData);
			});
		});
	}

	update(data) {
		this.chart.update({ data });
	}

	create(data) {
		const pic = picasso({
			style: {
				"$font-size": "12px",
				"$font-size--l": "18px",
				"$font-family": "Source Sans Pro",
			},
		});

		const colNames = this.state.fields;	// data[0] ? data[0] : [];

		const hasSize = colNames.includes(this.state.size);
		const hasColour = colNames.includes(this.state.colour);
		const hasX = colNames.includes(this.state.xaxis);
		const hasY = colNames.includes(this.state.yaxis);

		const xaxisCol = hasX ? this.state.xaxis : colNames[0];
		const yaxisCol = hasY ? this.state.yaxis : colNames[0];
		const colourCol = hasColour ? this.state.colour : "";
		const sizeCol = hasSize ? this.state.size : "";
		this.setState({
			xaxis: xaxisCol,
			yaxis: yaxisCol,
			colour: colourCol,
			size: sizeCol,
		});

		this.chart = pic.chart({
			element: this.ref,
			data,
			settings: {
				scales: {
					x: {
						data: {
							field: xaxisCol,
						},
					},
					y: {
						data: {
							field: yaxisCol,
						},
						invert: true,
					},
					col: {
						data: { extract: { field: hasColour ? this.state.colour : colNames[0] } },
						type: "color",
					},
					size: {
						data: {
							field: this.state.size,
						},
					},
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
							field: "Country",
							props: {
								y: { field: yaxisCol },
								x: { field: xaxisCol },
								fill: { field: hasColour ? colourCol : colNames[0] },
								size: { field: hasSize ? sizeCol : colNames[0] },
							},
						},
					},
					settings: {
						x: { scale: "x" },
						y: { scale: "y" },
						shape: "circle",
						size: hasSize ? { scale: "size" } : 1,
						fill: hasColour ? { scale: "col" } : "#0000FF",
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
			<div style={{
				border: "50px", margin: "50px", width: "400px", height: "300px",
			}}
			>
				<span>
					<div
						id="test"
						style={{ position: "relative", width: "80%", height: "80%" }}
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
