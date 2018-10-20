import React, { Component } from "react";
import QlikConnection from "../utils/QlikConnection";
import { Container, Segment } from "semantic-ui-react";

import widgets from "../widgets";

class App extends Component {
	constructor(props) {
		super(props);
		this.q = new QlikConnection();
	}

	render() {
		return (
			<Container>
				{ widgets.map(Widget => (
					<Segment>
						{ <Widget /> }
					</Segment>
				)) }
			</Container>
		);
	}
}

export default App;
