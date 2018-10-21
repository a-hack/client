import React from "react";
import PropTypes from "prop-types";
import { Image, Menu, Sidebar } from "semantic-ui-react";
import WidgetListItems from "../widgets/index";
import "semantic-ui-css/semantic.min.css";

const Item = ({ name, img }) => (
	<Menu.Item as="button">
		<Image src={img} size="small" name={name} />
		{name}
	</Menu.Item>
);
Item.propTypes = {
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
};

export default function (props) {
	return (
		<Sidebar
			{...props}
		>
			{Object.values(WidgetListItems).map((item) => <Item key={item.name} name={item.name} img={item.img} />)}
		</Sidebar>
	);
}
