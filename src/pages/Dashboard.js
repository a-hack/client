import React, { Component } from "react";
import {
	Button, Container, Icon, Menu,
} from "semantic-ui-react";
import QlikConnection from "../utils/QlikConnection";
import QlikRequire from "../utils/QlikRequire";
import ResponsiveContainer from "../layouts/Container";
import SideMenu from "../components/SideMenu";
import WidgetGrid from "../layouts/WidgetGrid";
import { get, save } from "../utils/layout-api";

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
			type: "WorldMap",
		},
		b: {
			location: {
				i: "b",
				x: 0,
				y: 0,
				w: 4,
				h: 4,
			},
			config: {},
			type: "CountryTable",
		},
		a: {
			location: {
				i: "a",
				x: 0,
				y: 0,
				w: 4,
				h: 4,
			},
			config: {},
			type: "AppTemplate",
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

// eslint-disable-next-line no-unused-vars
function generateBaseConfig(type) {
	// eslint-disable-next-line no-bitwise
	const i = (Math.random() * 100000000) | 0;
	return {
		[i]: {
			location: {
				i,
				x: 0,
				y: 0,
				w: 2,
				h: 2,
			},
			config: {},
			type,
		},
	};
}

class Dashboard extends Component {
	constructor(props) {
		super(props);
		console.log(props);

		const {  match: { params: { hash } } } = props;

		this.state = {
			error: undefined,
			config: undefined,
			hash,
			visible: false,
			visibleWidgets: false,
		};

		this.handleShowHide = this.handleShowHide.bind(this);
		this.handleSidebarHide = this.handleSidebarHide.bind(this);
		this.handleWidgetbarHide = this.handleWidgetbarHide.bind(this);
		this.handleWidgetShowHide = this.handleWidgetShowHide.bind(this);
		this.add = this.add.bind(this);

		this.con = new QlikConnection();
		this.conApi = new QlikRequire();
	}

	componentDidMount() {
		this.con.getQ().then((q) => {
			this.setState({ q });
		});
		this.conApi.getApp().then((app) => {
			this.setState({ app });
		});
		get(this.state.hash)
			.then((config) => this.setState({ config }))
			.catch((error) => this.setState({ error }));
	}

	handleWidgetShowHide() {
		this.setState(({ visibleWidgets }) => ({ visibleWidgets: !visibleWidgets }));
	}

	handleShowHide() {
		this.setState(({ visible }) => ({ visible: !visible }));
	}

	handleSidebarHide() {
		this.setState({ visible: false });
	}

	handleWidgetbarHide() {
		this.setState({ visibleWidgets: false });
	}

	add(type) {
		return () => this.setState(({ config }) => {
			const { widgets } = config;
			return Object.assign(config, Object.assign(widgets, generateBaseConfig(type)));
		});
	}

	render() {
		const {
			app, q, visible, visibleWidgets, error,
		} = this.state;
		if (app && q) {
			return (
				<ResponsiveContainer footer={false}>
					<SideMenu
						as={Menu}
						animation="uncover"
						direction="left"
						icon="labeled"
						inverted
						onHide={this.handleSidebarHide}
						onHide2={this.handleWidgetbarHide}
						vertical
						visible={visible}
						add={this.add}
						visible2={visibleWidgets}
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
								style={{
									borderRadius: "0",
								}}
							>
								<Icon name="filter" />
							</Button>
							<Button
								negative
								onClick={() => app.clearAll(true)}
								style={{
									borderRadius: "0",
									float: "center",
								}}
							> Clear </Button>
							<Button
								right
								icon
								secondary
								attached="right"
								onClick={this.handleWidgetShowHide}
								style={{
									borderRadius: "0",
									float: "right",
								}}
							>
								<Icon name="filter" />
							</Button>
							<WidgetGrid
								q={q}
								app={app}
								save={() => {
								}}
								config={config}
								error={error}
							/>
						</Container>
					</SideMenu>
				</ResponsiveContainer>
			);
		}
		return <div />;
	}
}

export default Dashboard;
