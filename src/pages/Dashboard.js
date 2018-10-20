import React, {Component} from "react";
import QlikConnection from "../utils/QlikConnection";
import { Container, Segment } from "semantic-ui-react";
import ResponsiveContainer from "../layouts/Container";

import widgets from "../widgets";

class App extends Component {
	constructor(props) {
		super(props);
		this.con = new QlikConnection();

		this.state = {};
	}

	componentDidMount() {
		this.con.getQ().then((q) => {
			this.setState({ q });
		});
	}

	render() {
		return (
			<ResponsiveContainer>
			<Container style={{marginTop: "2em"}}>
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
