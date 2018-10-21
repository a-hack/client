import React, { Component } from "react";
import { WidgetProps } from "../consts";

export default class Vertical extends Component {
	static propTypes = WidgetProps;

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { app } = this.props;

		app.visualization.create("barchart", // viz type
		 [
    {
      "qDef": {
        "qFieldDefs": [
          "Country"
        ],
        "qSortCriterias": [
          {
            "qSortByExpression": 1,
            "qExpression": {
              "qv": "Commitments"
            }
          }
        ],
        "autoSort": false
      }
    },
    "=Count(Country)"
  ],
  {
    "showTitles": true,
    "title": "Commitments",
    "orientation": "vertical",
    "gridLine": {
      "auto": false,
      "spacing": 3
    },
    "dataPoint": {
      "showLabels": true
    }
  
			})
			.then((viz) => {
				this.viz = viz;
				viz.show(this.ref);
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
