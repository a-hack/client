import React from "react";
import {
	Icon,
	Menu,
	Segment,
	Sidebar,
} from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

const SegmentNoMargin = (props) => (
	<Segment
		{...props}
		style={{
			borderRadius: "0",
			margin: "0",
			border: "none",
		}}
	>
		{ props.children }
	</Segment>
);

export default (props) => {
	const { children } = props;

	return (
		<Sidebar.Pushable as={SegmentNoMargin}>
			<Sidebar
				{...props}
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
				{children}
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
};
