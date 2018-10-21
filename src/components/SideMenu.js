import PropTypes from "prop-types";
import React from "react";
import {
	Icon,
	Menu,
	Segment,
	Sidebar,
	Image,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import WidgetListItems from "../widgets/index";

const SegmentNoMargin = (props) => (
	<Segment
		{...props}
		style={{
			borderRadius: "0",
			margin: "0",
			border: "none",
		}}
	>
		{props.children}
	</Segment>
);
const Item = ({name, img}) => (
	<Menu.Item as="button">
		<Image src={img} size="small" name={name}/>
		{name}
	</Menu.Item>
);
Item.propTypes = {
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
};
export default (props) => {
	const {children} = props;
	console.log(props);
	return (
		<div>
			<Sidebar.Pushable as={SegmentNoMargin}>
				<Sidebar
					{...props}
				>
					<Menu.Item as="a">
						<Icon name="home"/>
						Home
					</Menu.Item>
					<Menu.Item as="a">
						<Icon name="gamepad"/>
						Games
					</Menu.Item>
					<Menu.Item as="a">
						<Icon name="camera"/>
						Channels
					</Menu.Item>
				</Sidebar>
				<Sidebar
					as={Menu}
					animation="uncover"
					direction="right"
					inverted
					vertical
					onHide={props.onHide2}
					visible={props.visible2}
					style={{
						marginTop: "2em",
						height: "100vh",
					}}
				>
					{Object.values(WidgetListItems).map((item) => <Item key={item.name} name={item.name} img={item.img}/>)}
				</Sidebar>
				<Sidebar.Pusher>
					{children}
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		</div>
	);
};
