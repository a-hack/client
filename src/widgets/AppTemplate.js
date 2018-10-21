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

		app.visualization.create("piechart",
			[{
				qDef: {
					qFieldDefs: ["=[Country]"],
					qFieldLabels: ["Country"],
				},
				qNullSuppression: true,
				qOtherTotalSpec: { qOtherMode: "OTHER_COUNTED", qOtherCounted: "10" },
			}, "=Count(Distinct [Partners])"],
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
