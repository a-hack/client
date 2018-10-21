/**
 * A customizable data visualization web application.
 * Copyright (C) 2018  Jacob MacDonald, Jacob Martin, Patrick Gingras,
 * Michael Dysart, Aweys Ahmed, Hassan Salami, Aritz Joseph Beobide-Cardinal
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Button, Message } from "semantic-ui-react";

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
		removeWidget: PropTypes.func.isRequired,
		updateWidgetConfig: PropTypes.func.isRequired,
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
				style={{
					border: "1px solid rgba(0, 0, 0, 0.2)",
				}}
				key={i}
				data-grid={location}
			>
				<div
					style={{
						height: "1rem",
						borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
						display: "flex",
					}}
				>
					<a
						href="#"
						onClick={this.props.removeWidget(i)}
						style={{
							height: "100%",
						}}
					>
						X
					</a>
					<div
						style={{
							cursor: "grab",
							flexGrow: "1",
						}}
						className="awesome-dragging-handle-thing"
					>
					</div>
				</div>
				<Widget
					style={{ maxHeight: "calc(100% - 1rem)" }}
					key={i}
					app={app}
					config={config}
					q={q}
					save={save}
					updateConfig={this.props.updateWidgetConfig(i)}
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
				containerPadding={[10, 10]}
				draggableHandle=".awesome-dragging-handle-thing"
				onLayoutChange={this.onLayoutChange}
				onBreakpointChange={this.onBreakpointChange}
				{...this.props}
			>
				{Object.values(widgets).map(this.widgetToGridItem)}
			</ResponsiveReactGridLayout>
		);
	}
}
