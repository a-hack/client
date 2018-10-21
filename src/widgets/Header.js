/**
 * A customizable data visualization web application.
 * Copyright (C) 2018  Jacob MacDonald, Jacob Martin, Patrick Gingras,
 * Michael Dysart, Aweys Ahmed, Hassan Salami, Aritz Joseph Beobide-Cardinal
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

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
