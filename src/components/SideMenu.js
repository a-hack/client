import PropTypes from "prop-types";
import React, {Component} from "react";
import {
	Button,
	Icon,
	Image,
	Menu,
	Segment,
	Sidebar,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import WidgetListItems from "../widgets/index";
import {WidgetProps} from "../consts";

const SegmentNoMargin = (props) => (
	<Segment
		{...props}
		style={{
			borderRadius: "0",
			margin: "0",
			border: "none",
		}}
	>
		{/* eslint-disable-next-line react/destructuring-assignment */}
		{props.children}
	</Segment>
);

const Item = ({name, img, onClick}) => (
	<Menu.Item as={Button} onClick={onClick}>
		<Image src={img} size="small" name={name}/>
		{name}
	</Menu.Item>
);
Item.propTypes = {
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

class SideMenu extends Component {
	static propTypes = {app: PropTypes.object.isRequired};

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const {app} = this.props;

		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Country]"],
					qFieldLabels: ["Country"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref);
			});
		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Goal ID]"],
					qFieldLabels: ["Goal ID"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref2);
			});
		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[SGD Target]"],
					qFieldLabels: ["SGD Target"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref3);
			});
		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Indicator Title]"],
					qFieldLabels: ["Indicator Title"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref4);
			});
		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Ocean Basins]"],
					qFieldLabels: ["Ocean Basins"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref5);
			});
		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Lead entity type]"],
					qFieldLabels: ["Lead entity type"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref6);
			});
		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Commitment Title]"],
					qFieldLabels: ["Commitment Title"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref7);
			});
		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Lead entity]"],
					qFieldLabels: ["Lead entity"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref8);
			});
		app.visualization.create("table",
			[{
				qDef: {
					qFieldDefs: ["=[Partners]"],
					qFieldLabels: ["Partners"],
				},
				qNullSuppression: true,
			}],
			{})
			.then((viz) => {
				viz.show(this.ref9);
			});
	}


	render() {
		const {children, onHide2, visible2} = this.props;
		return (
			<div>
				<Sidebar.Pushable as={SegmentNoMargin}>
					<Sidebar
						{...this.props}
					>
						<div
							style={{ height: "70px", overflow: "hidden" }}
							ref={ref => {
								this.ref = ref;
							}}
						/>
						<div
							style={{ height: "70px", overflow: "hidden" }}
							ref={ref => {
								this.ref2 = ref;
							}}
						/>
						<div
							style={{ height: "70px", overflow: "hidden" }}
							ref={ref => {
								this.ref3 = ref;
							}}
						/>
						<div
							style={{ height: "70px", overflow: "hidden" }}
							ref={ref => {
								this.ref4 = ref;
							}}
						/>
						<div
							style={{ height: "70px", overflow: "hidden" }}
							ref={ref => {
								this.ref5 = ref;
							}}
						/>
						<div
							style={{ height: "90px" }}
							ref={ref => {
								this.ref6 = ref;
							}}
						/>
						<div
							style={{ height: "90px" }}
							ref={ref => {
								this.ref7 = ref;
							}}
						/>
						<div
							style={{ height: "70px", overflow: "hidden" }}
							ref={ref => {
								this.ref8 = ref;
							}}
						/>
						<div
							style={{ height: "70px", overflow: "hidden" }}
							ref={ref => {
								this.ref9 = ref;
							}}
						/>
					</Sidebar>
					<Sidebar
						as={Menu}
						animation="uncover"
						direction="right"
						inverted
						vertical
						onHide={onHide2}
						visible={visible2}
						style={{
							marginTop: "2em",
							height: "100vh",
						}}
					>
						{Object.values(WidgetListItems).map((item) => (
							<Item
								onClick={this.props.add(item.name)}
								key={item.name}
								name={item.name}
								img={item.img}
							/>
						))}
					</Sidebar>
					<Sidebar.Pusher>
						{children}
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}
}

export default SideMenu;
