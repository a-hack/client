import React, {Component} from "react";
import {Button, Header, Icon, Image, Menu, Segment, Container} from "semantic-ui-react";

import WidgetGrid from "../layouts/WidgetGrid";
import QlikConnection from "../utils/QlikConnection";
import "semantic-ui-css/semantic.min.css";
import SideMenu from "../components/SideMenu";

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
		this.state = { visible: false };
		this.handleShowHide = this.handleShowHide.bind(this);
		this.handleSidebarHide = this.handleSidebarHide.bind(this);
	}

	handleShowHide() {
		this.setState({ visible: !this.state.visible });
	}

	handleSidebarHide() {
		this.setState({ visible: false });
	}

	render() {
		return (
			<SideMenu
				as={Menu}
				animation="uncover"
				icon="labeled"
				inverted
				onHide={this.handleSidebarHide}
				vertical
				visible={this.state.visible}
				width="thin"
				style={{height: "100vh"}}
			>
				<Container fluid>
					<Button icon secondary attached="right" onClick={this.handleShowHide}>
						<Icon name='filter'/>
					</Button>
					<WidgetGrid q="hullO" save={() => {
					}} config={config}/>
				</Container>
			</SideMenu>
		);
	}
}

export default Dashboard;
