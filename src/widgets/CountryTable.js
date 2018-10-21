import React, { Component } from "react";
import { WidgetProps } from "../consts";

export default class Template extends Component {
	static propTypes = WidgetProps;


	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { app } = this.props;

		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Country]"],
					qFieldLabels: ["Country"],
				},
				qNullSuppression: true,
			}, {
				qDef: {
					qDef: "=Count(Distinct [Commitment ID])",
					qLabel: "Commitments",
				},
			}, {
				qDef: {
					qDef: "=Count(Distinct [Partners])",
					qLabel: "Partners",
				},
			}, {
				qDef: {
					qDef: "=Count(Distinct [Ocean Basins])",
					qLabel: "Ocean Basins",
				},
			}],
			{})
			.then((viz) => {
				viz.show(this.ref);
				this.viz = viz;
			});
	}

	render() {
		if (this.viz != null) {
			this.viz.show(this.ref);
		}
		return (
			<div
				style={{ height: "100%" }}
				ref={ref => {
					this.ref = ref;
				}}
			/>
		);
	}
}
