import React, { Component } from "react";
import QlikConnection from "../utils/QlikConnection";
import { Container, Segment } from "semantic-ui-react";
import ResponsiveContainer from "../layouts/Container";

import widgets from "../widgets";

class App extends Component {
	constructor(props) {
		super(props);
		this.q = new QlikConnection();
	}

	render() {
		return (
			<ResponsiveContainer>
			<Container>
				{ widgets.map(Widget => (
					<Segment>
						{ <Widget /> }
					</Segment>
				)) }
			</Container>
			</ResponsiveContainer>
		);
	}
}

export default App;
