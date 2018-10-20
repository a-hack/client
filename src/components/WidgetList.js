import React, {Component} from "react";
import {Button, Header, Icon, Image, Menu, Segment, Sidebar} from "semantic-ui-react";
import WidgetList from "../widgets/index";
import "semantic-ui-css/semantic.min.css";


class SideMenu extends Component {
	constructor(props) {
		super(props);
		console.log(WidgetList);
	}

	render() {
		return (
			<Sidebar.Pushable as={Segment}>
				<Sidebar
					{...this.props}
				>
					<Menu.Item as="a">
						<Icon name="home" />
						Home
					</Menu.Item>
					<Menu.Item as="a">
						<Icon name="gamepad" />
						Games
					</Menu.Item>
					<Menu.Item as="a">
						<Icon name="camera" />
						Channels
					</Menu.Item>
				</Sidebar>
				<Sidebar.Pusher>
					{this.props.children}
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}
}
export default SideMenu;
