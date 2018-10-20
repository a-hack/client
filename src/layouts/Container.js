import PropTypes from "prop-types";
import React, { Component } from "react";
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility,
} from "semantic-ui-react";
import GridLayout from "react-grid-layout";
import "semantic-ui-css/semantic.min.css";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it"s not the best practice. Use CSS or styled components for
 * such things.
 */

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fixed: undefined
		};
		this.hideFixedMenu = this.hideFixedMenu.bind(this);
		this.showFixedMenu = this.showFixedMenu.bind(this);
	}

	hideFixedMenu() {
		this.setState({ fixed: false });
	}

	showFixedMenu() {
		this.setState({ fixed: true });
	}

	render() {
		const { children } = this.props;
		const { fixed } = this.state;

		return (
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}
				>
					<Segment
						inverted
						textAlign="center"
						style={{ minHeight: this.props.isHome ? "700" : "70", padding: "1em 0em" }}
						vertical
					>
						<Menu
							fixed={fixed ? "top" : null}
							inverted={!fixed}
							pointing={!fixed}
							secondary={!fixed}
							size="large"
						>
							<Container>
								<Menu.Item as="a" active>
									Home
								</Menu.Item>
								<Menu.Item as="a">Work</Menu.Item>
								<Menu.Item as="a">Company</Menu.Item>
								<Menu.Item as="a">Careers</Menu.Item>
								<Menu.Item position="right">
									<Button as="a" inverted={!fixed}>
										Log in
									</Button>
									<Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: "0.5em" }}>
										Sign Up
									</Button>
								</Menu.Item>
							</Container>
						</Menu>
					{this.props.homeBanner && this.props.homeBanner}
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		)
	}
}

DesktopContainer.propTypes = {
	children: PropTypes.node.isRequired,
	homeBanner: PropTypes.func,
};

class MobileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarOpened: undefined
		};
		this.handlePusherClick = this.handlePusherClick.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	handlePusherClick() {
		const { sidebarOpened } = this.state;

		if (sidebarOpened) this.setState({ sidebarOpened: false });
	}

	handleToggle() {
		this.setState(({ sidebarOpened }) => ({
			sidebarOpened: !sidebarOpened,
		}));
	}

	render() {
		const { children } = this.props;
		const { sidebarOpened } = this.state;

		return (
			<Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
				<Sidebar.Pushable>
					<Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
						<Menu.Item as="a" active>
							Home
						</Menu.Item>
						<Menu.Item as="a">Work</Menu.Item>
						<Menu.Item as="a">Company</Menu.Item>
						<Menu.Item as="a">Careers</Menu.Item>
						{/* <Menu.Item as="a">Log in</Menu.Item>
						<Menu.Item as="a">Sign Up</Menu.Item> */}
					</Sidebar>

					<Sidebar.Pusher
						dimmed={sidebarOpened}
						onClick={this.handlePusherClick}
						style={{ minHeight: "100vh" }}
					>
						<Segment
							inverted
							textAlign="center"
							style={{ minHeight:  this.props.isHome ? "350" : "50", padding: "1em 0em" }}
							vertical
						>
							<Container>
								<Menu inverted pointing secondary size="large">
									<Menu.Item onClick={this.handleToggle}>
										<Icon name="sidebar" />
									</Menu.Item>
									<Menu.Item position="right">
										<Button as="a" inverted>
											Log in
										</Button>
										<Button as="a" inverted style={{ marginLeft: "0.5em" }}>
											Sign Up
										</Button>
									</Menu.Item>
								</Menu>
							</Container>
							{this.props.homeBanner && this.props.homeBanner}
						</Segment>

						{children}
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</Responsive>
		);
	}
}

MobileContainer.propTypes = {
	children: PropTypes.node.isRequired,
	homeBanner: PropTypes.func,
};

const ResponsiveContainer = ({ children, banner }) => (
	<div>
		<DesktopContainer homeBanner={banner}>{children}</DesktopContainer>
		<MobileContainer homeBanner={banner}>{children}</MobileContainer>
	</div>
);

ResponsiveContainer.propTypes = {
	children: PropTypes.node.isRequired,
	banner: PropTypes.func,
};

export default ResponsiveContainer