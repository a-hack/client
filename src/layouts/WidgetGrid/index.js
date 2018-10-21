import React, { Component } from "react";
import PropTypes from "prop-types";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Message } from "semantic-ui-react";

import "./index.css";

import widgets from "../../widgets";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class WidgetGrid extends Component {
	static defaultProps = {
		cols: {
			lg: 12, md: 10, sm: 6, xs: 4, xxs: 2,
		},
		rowHeight: 100,
		config: {},
	};

	static propTypes = {
		q: PropTypes.any.isRequired,
		cols: PropTypes.object,
		save: PropTypes.func.isRequired,
		config: PropTypes.shape({
			widgets: PropTypes.objectOf(
				PropTypes.shape({
					location: PropTypes.shape({
						i: PropTypes.string.isRequired,
						x: PropTypes.number.isRequired,
						y: PropTypes.number.isRequired,
						w: PropTypes.number.isRequired,
						h: PropTypes.number.isRequired,
					}).isRequired,
					config: PropTypes.objectOf(PropTypes.any).isRequired,
					type: PropTypes.string.isRequired,
				}).isRequired,
			),
		}),
		rowHeight: PropTypes.number,
	};

	constructor(props) {
		super(props);

		const w = props.config.widgets || {};

		this.state = {
			layout: Object.values(w).map(({ location }) => location),
			breakpoint: undefined,
			cols: props.cols,
		};

		this.onBreakpointChange = this.onBreakpointChange.bind(this);
		this.onLayoutChange = this.onLayoutChange.bind(this);
		this.widgetToGridItem = this.widgetToGridItem.bind(this);
	}

	onBreakpointChange(breakpoint, cols) {
		this.setState({
			breakpoint,
			cols,
		});
	}

	onLayoutChange(layout) {
		this.setState({
			layout,
		});
		this.props.updateLayout(layout);
	}

	widgetToGridItem({ location, config, type }) {
		const Widget = widgets[type].component;
		const { q, save, app } = this.props;

		const { i } = location;

		return (
			<div
				style={{ border: "1px solid green" }}
				key={i}
				data-grid={location}
			>
				<Widget
					style={{ maxHeight: "100%" }}
					key={i}
					app={app}
					config={config}
					q={q}
					save={save}
				/>
			</div>
		);
	}

	render() {
		if (this.props.error) {
			return (
				<Message negative size="massive">
					<Message.Header>
						Something went wrong
					</Message.Header>
					{ this.props.error.toString() }
				</Message>
			);
		}

		const { config: { widgets } } = this.props;

		return (
			<ResponsiveReactGridLayout
				style={{ border: "1px solid red" }}
				onLayoutChange={this.onLayoutChange}
				onBreakpointChange={this.onBreakpointChange}
				{...this.props}
			>
				{Object.values(widgets).map(this.widgetToGridItem)}
			</ResponsiveReactGridLayout>
		);
	}
}
