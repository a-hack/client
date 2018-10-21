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

function generateBaseConfig(type) {
	// eslint-disable-next-line no-bitwise
	const i = ((Math.random() * 100000000) | 0).toString();
	return {
		[i]: {
			location: {
				i,
				x: Infinity,
				y: Infinity,
				w: 3,
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
		this.save = this.save.bind(this);
		this.remove = this.remove.bind(this);
		this.updateLayout = this.updateLayout.bind(this);
		this.updateWidgetConfig = this.updateWidgetConfig.bind(this);

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
			.then((config) => this.setState({ config, error: undefined }))
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

	updateLayout(newLayouts) {
		const { widgets } = this.state.config;
		const newWidgets = Object.assign({}, widgets);
		newLayouts.forEach((layout) => {
			const { i } = layout;
			const { location } = newWidgets[i];
			newWidgets[i].location = Object.assign(location, layout);
		});
		this.setState({ config: { widgets: newWidgets } });
	}

	updateWidgetConfig(i) {
		return (newConfig) => {
			this.setState(({ config: { widgets } }) => {
				const newWidgets = Object.assign({}, widgets);
				const { config } = newWidgets[i];
				newWidgets[i].config = Object.assign(config, newConfig);
			});
		};
	}

	add(type) {
		return () => this.setState(({ config }) => {
			const { widgets } = config;
			return Object.assign(
				config,
				{
					widgets: Object.assign(widgets, generateBaseConfig(type)),
				},
			);
		});
	}

	remove(id) {
		return () => this.setState(({ config }) => {
			console.log("REMOVING");
			console.log(config);
			const widgets = Object.assign({}, config.widgets);
			delete widgets[id];
			const newConfig = Object.assign({}, config, { widgets });
			console.log(newConfig);
			return { config: newConfig };
		});
	}

	async save() {
		const { id } = await save(this.state.config);
		this.setState({
			hash: id,
		});
	}

	render() {
		window.history.pushState({}, document.title, `/dash/${this.state.hash}`);

		console.log("STAAAATE", this.state);
		const {
			app, q, visible, visibleWidgets, error, config,
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
						app={app}
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
								}}
							>
								Clear
							</Button>
							<Button
								positive
								onClick={this.save}
								style={{
									borderRadius: "0",
								}}
							>
								Save
							</Button>
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
								config={config}
								error={error}
								removeWidget={this.remove}
								updateLayout={this.updateLayout}
								updateWidgetConfig={this.updateWidgetConfig}
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
