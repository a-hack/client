import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import WidgetGrid from "../layouts/WidgetGrid";
import QlikConnection from "../utils/QlikConnection";

const config = {
	widgets: {
		tsratsar: {
			location: {
				i: "tsratsar",
				x: 0,
				y: 0,
				w: 4,
				h: 4,
			},
			config: {},
			type: "Template",
		},
		artsarst: {
			location: {
				i: "artsarst",
				x: 0,
				y: 0,
				w: 8,
				h: 2,
			},
			config: {},
			type: "Template",
		},
	},
};

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.q = new QlikConnection();
	}

	render() {
		return (
			<Container>
				<WidgetGrid q="hullO" save={() => {}} config={config} />
			</Container>
		);
	}
}

export default Dashboard;
