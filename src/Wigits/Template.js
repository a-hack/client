import React, { Component } from "react";
import { WidgetProps } from "../consts";

export default class Template extends Component {
	static props = WidgetProps;

	constructor(props) {
		super(props);
	}

	render() {
		return (<div>test</div>);
	}
}
