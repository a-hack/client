import React, { Component } from "react";
import { TextArea } from "semantic-ui-react";

class Paragraph extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = { text: this.props.config.text};
	}

	onChange(e){
		this.setState({text:e.target.value});
		this.props.updateConfig({ text: e.target.value });
	}

	render() {
		return (
			<TextArea onChange={this.onChange} style={{ width: "100%", minHeight: "calc(100% - 1rem)" }} value={this.state.text} autoHeight placeholder="text..."/>
		);
	}
}

export default Paragraph;
