import React, { Component } from "react";
import { TextArea } from "semantic-ui-react";

class Paragraph extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.props.updateConfig({ text: e.target.value });
	}

	render() {
		return (
			<TextArea onChange={this.onChange} style={{width: "100%", minHeight: "100%" }} value={this.props.config.text} autoHeight placeholder="text..."/>
		);
	}
}

export default Paragraph;
