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
		img: "template.jpeg",
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
