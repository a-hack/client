import React, { Component } from "react";
import { WidgetProps } from "../consts";

export default class Gauge extends Component {
	static propTypes = WidgetProps;

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { app } = this.props;

		app.visualization.create("gauge",
			[
				{
					qDef: {
						qLabel: "Commitments",
						qDef: "Count([Commitment ID])",
						qNumFormat: {
							qType: "I",
							qnDec: 0,
							qUseThou: 0,
							// qFmt: "0,000",
							// qDec: ".",
							// qThou: ",",
						},
					},
				},
			],
			{
				measureAxis: {
					min: 0,
					max: 1380,
				},
			})
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
