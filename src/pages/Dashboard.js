import React, { Component } from "react";
import {
	Button,
	Container,
	Icon,
	Menu,
} from "semantic-ui-react";

import QlikConnection from "../utils/QlikConnection";
import ResponsiveContainer from "../layouts/Container";
import SideMenu from "../components/SideMenu";
import WidgetGrid from "../layouts/WidgetGrid";

import "semantic-ui-css/semantic.min.css";

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
		this.state = { visible: false };

		this.handleShowHide = this.handleShowHide.bind(this);
		this.handleSidebarHide = this.handleSidebarHide.bind(this);

		this.con = new QlikConnection();
	}

	componentDidMount() {
		this.con.getQ().then((q) => {
			this.setState({ q });
		});
	}

	handleShowHide() {
		this.setState(({ visible }) => ({ visible: !visible }));
	}

	handleSidebarHide() {
		this.setState({ visible: false });
	}

	render() {
		const { q, visible } = this.state;
		return (
			<ResponsiveContainer>
				<SideMenu
					as={Menu}
					animation="uncover"
					icon="labeled"
					inverted
					onHide={this.handleSidebarHide}
					vertical
					visible={visible}
					width="thin"
					style={{
						marginTop: "2em",
						height: "100vh",
					}}
				>
					<Container fluid>
						<Button
							icon
							secondary
							attached="right"
							onClick={this.handleShowHide}
						>
							<Icon name="filter" />
						</Button>
						<WidgetGrid
							q={q}
							save={() => {}}
							config={config}
						/>
					</Container>
				</SideMenu>
			</ResponsiveContainer>
		);
	}
}

export default Dashboard;
