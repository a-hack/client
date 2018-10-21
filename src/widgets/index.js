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

import Template from "./Template";
import CountryTable from "./CountryTable";
import AppTemplate from "./AppTemplate";
import Bar from "./Bar";
import WorldMap from "./WorldMap";
import Gauge from "./Gauge";

import mapPicture from "../pictures/map.png";
import piPicture from "../pictures/pi.png";
import tablePicture from "../pictures/table.png";

import Vertical from "./Vertical";

import templatePicture from "../pictures/template.png";
import barPicture from "../pictures/bar.png";
import linePicture from "../pictures/line.png";
import scatterPicture from "../pictures/scatter.png";
import textPicture from "../pictures/text.png";
import gaugePicture from "../pictures/gauge.png";
import targetPicture from "../pictures/target.png";
import commitmentPicture from "../pictures/commitment.png";
import verticalPicture from "../pictures/vertical.png";

import Header from "./Header";
import Line2 from "./Line2";
import Commitment from "./Commitment";
import Target from "./Target";
import Scatter2 from "./Scatter2";

export default {
	Template: {
		name: "Template",
		img: templatePicture,
		component: Template,
	},
	AppTemplate: {
		name: "AppTemplate",
		img: piPicture,
		component: AppTemplate,
	},
	CountryTable: {
		name: "CountryTable",
		img: tablePicture,
		component: CountryTable,
	},
	WorldMap: {
		name: "WorldMap",
		img: mapPicture,
		component: WorldMap,
	},
	Bar: {
		name: "Bar",
		img: barPicture,
		component: Bar,
	},
	Vertical: {
		name: "Vertical",
		img: verticalPicture,
		component: Vertical,
	},
	Line2: {
		name: "Line2",
		img: linePicture,
		component: Line2,
	},
	Scatter2: {
		name: "Scatter2",
		img: scatterPicture,
		component: Scatter2,
	},
	Header: {
		name: "Header",
		img: textPicture,
		component: Header,
	},
	Commitment: {
		name: "Commitment",
		img: commitmentPicture,
		component: Commitment,
	},
	Target: {
		name: "Target",
		img: targetPicture,
		component: Target,
	},
	Gauge: {
		name: "Gauge",
		img: gaugePicture,
		component: Gauge,
	},
};
