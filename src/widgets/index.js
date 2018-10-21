import Template from "./Template";
import CountryTable from "./CountryTable";
import AppTemplate from "./AppTemplate";
import Bar from "./Bar";
import WorldMap from "./WorldMap";

import mapPicture from "../pictures/map.png";
import piPicture from "../pictures/pi.png";
import tablePicture from "../pictures/table.png";
import Header from "./Header";

import Scatter2 from "./Scatter2";
import Line2 from "./Line2";

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
		img: "template.jpeg",
		component: Bar,
	},
	Line2: {
		name: "Line2",
		img: "line.jpeg",
		component: Line2,
	},
	Header: {
		name: "Header",
		img: "template.jpeg",
		component: Header,
	},
};
