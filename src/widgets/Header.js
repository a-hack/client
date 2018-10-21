import React, { Component } from "react";
import { Input } from "semantic-ui-react";

class Header extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = { text: this.props.config.text };
	}

	onChange(e) {
		this.setState({ text: e.target.value });
		this.props.updateConfig({ text: e.target.value });
	}

	render() {
		return (
			<Input
				onChange={this.onChange}
				style={{ fontSize: "42px", width: "100%", minHeight: "calc(100% - 1rem)" }}
				value={this.state.text}
				autoHeight placeholder="Header..."
			/>
		);
	}
}

export default Header;
