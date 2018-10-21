import React, { Component } from "react";
import { WidgetProps } from "../consts";

export default class Commitment extends Component {
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
					qFieldDefs: ["=[Commitment Title]"],
					qFieldLabels: ["Commitment Title"],
				},
				qNullSuppression: true,
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
			});
	}

	render() {
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
