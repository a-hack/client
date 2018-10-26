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
import { WidgetProps } from "../consts";

export default class Template extends Component {
	static propTypes = WidgetProps;


	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { app } = this.props;

		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Country]"],
					qFieldLabels: ["Country"],
				},
				qNullSuppression: true,
			}, {
				qDef: {
					qDef: "=Count(Distinct [Commitment ID])",
					qLabel: "Commitments",
				},
			}, {
				qDef: {
					qDef: "=Count(Distinct [Partners])",
					qLabel: "Partners",
				},
			}, {
				qDef: {
					qDef: "=Count(Distinct [Ocean Basins])",
					qLabel: "Ocean Basins",
				},
			}],
			{})
			.then((viz) => {
				viz.show(this.ref);
				this.viz = viz;
			});
	}

	shouldComponentUpdate(nextProps) {
		const { props } = this;

		return Object.keys(this.props).reduce((acc, key) => {
			if (props[key] !== nextProps[key]) {
				return acc && false;
			}
			return acc;
		}, true);
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
