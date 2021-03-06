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
import { ComposableMap, Geographies, Geography, Marker, Markers, ZoomableGroup, } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import worldData from "./world-50m-with-population";
import { WidgetProps } from "../consts";
import { VictoryPie } from "victory";

const wrapperStyles = {
	width: "100%",
	maxWidth: 980,
	margin: "0 auto",
};

const popScale = scaleLinear()
	.domain([0, 100000000, 1400000000])
	.range(["#CFD8DC", "#607D8B", "#37474F"])

class BasicMap extends Component {
	static propTypes = WidgetProps;

	constructor(props) {
		super(props)
		this.state = {};
	}

	componentDidMount() {
		const { app } = this.props;

		app.createCube({
			qDimensions: [{
				qDef: {
					qFieldDefs: ["=[Country]"],
					qFieldLabels: ["Country"],
				},
				qNullSuppression: true,
			}],
			qInitialDataFetch: [{
				qTop: 0,
				qLeft: 0,
				qHeight: 500,
				qWidth: 3,
			}],
		}, (reply) => {
			console.log("chaka", reply.qHyperCube.qDataPages[0].qMatrix);
			console.log("baka", worldData.objects.units.geometries.map(entry => entry.properties.sovereignt));
			const data = reply.qHyperCube.qDataPages[0].qMatrix;
			const dataMap = reply.qHyperCube.qDataPages[0].qMatrix.reduce((acc, country) => {
				console.log("country", country[0].qText);
				acc[country[0].qText] = true;
				return acc;
			}, {});
			this.setState({ data, dataMap });
		});
	}

	handleClick(data) {

	}

	stateDataHasCountry(country) {
		if (this.state.data) {
			return this.state.dataMap.hasOwnProperty(country);
		}
		return true;
	}

	render() {
		console.log(worldData, this.state.dataMap);

		let afterData = Object.assign({}, worldData, {
			objects: {
				units: Object.assign({}, worldData.objects.units, {
					geometries: worldData.objects.units.geometries.filter(entry => {
						return this.stateDataHasCountry(entry.properties.sovereignt);
					}),
				}),
			},
		});
		return (
			<div style={wrapperStyles}>
				<ComposableMap
					projection={this.projection}
					width={980}
					height={551}
					style={{
						width: "100%",
						height: "auto",
					}}
				>
					<ZoomableGroup center={[0, 20]}>
						<Geographies geography={afterData}>
							{(geographies, projection) =>
								geographies.map((geography, i) =>
									<Geography
										key={i}
										round
										geography={geography}
										projection={projection}
										onClick={this.handleClick(geography)}
										style={{
											default: {
												fill: "#ECEFF1",
												stroke: "#607D8B",
												strokeWidth: 0.75,
												outline: "none",
											},
											hover: {
												fill: "#607D8B",
												stroke: "#607D8B",
												strokeWidth: 0.75,
												outline: "none",
											},
											pressed: {
												fill: "#FF5722",
												stroke: "#607D8B",
												strokeWidth: 0.75,
												outline: "none",
											},
										}}
									/>
								)}
						</Geographies>
					</ZoomableGroup>
				</ComposableMap>
			</div>
		)
	}
}

export default BasicMap
