import React, { Component } from "react";
import QlikConnection from "../utils/QlikConnection";


class App extends Component {
	constructor(props) {
		super(props);
		this.q = new QlikConnection();
	}

	render() {
		return (
			<div>hello</div>
		);
	}
}

export default App;
