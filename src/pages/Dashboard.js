import React, { Component } from "react";
import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.20.0.json";


class App extends Component {
	constructor(props) {
		super(props);
		this.qlikConnect();
	}

	qlikConnect() {
		// create a new session:
		const session = enigma.create({
			schema,
			url: "wss://playground-sense.qlik.com/showcase/app/engineData",
			createSocket: url => new WebSocket(url),
		});

		session.on("traffic:sent", data => console.log("sent:", data));
		session.on("traffic:received", data => console.log("received:", data));

		// open the socket and eventually receive the QIX global API, and then close
		// the session:
		session.open()
			.then((/* global */) => console.log("We are connected!"))
			.catch(err => console.log("Something went wrong :(", err));
	}

	render() {
		return (
			<div>hello</div>
		);
	}
}

export default App;
