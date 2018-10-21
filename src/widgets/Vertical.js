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
