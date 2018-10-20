import React, { Component } from "react";
import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.20.0.json";
import qlikConnect from "../utils/QlickConnection";


class App extends Component {
	constructor(props) {
		super(props);
		this.q = new qlikConnect();
	}

	render() {
		return (
			<div>hello</div>
		);
	}
}

export default App;
