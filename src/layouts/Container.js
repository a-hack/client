import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
	Button,
	Container,
	Grid,
	Header,
	Icon,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility,
} from "semantic-ui-react";
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
			fixed: undefined,
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
		const { children, homeBanner, footer } = this.props;
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
						style={{
							minHeight: homeBanner ? "600px" : "70px",
							padding: "1em 0em",
							backgroundImage: homeBanner
								? "url(https://source.unsplash.com/collection/3390539/1600x900)"
								: "none",
							backgroundSize: "cover",
							backgroundPosition: "70% 50%",
						}}
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
								<Menu.Item as={Link} to="/" active>
									Home
								</Menu.Item>
								<Menu.Item as="a">Work</Menu.Item>
								<Menu.Item as="a">Company</Menu.Item>
								<Menu.Item as="a">Careers</Menu.Item>
								<Menu.Item position="right">
									{
										homeBanner && (
											<Button
												as={Link}
												to="/dash/new/edit"
												inverted={!fixed}
											>
												New
											</Button>
										)
									}
								</Menu.Item>
							</Container>
						</Menu>
						{homeBanner}
					</Segment>
				</Visibility>

				{children}
				{footer && (
					<Segment inverted vertical style={{ padding: "4em 0em" }}>
						<Container>
							<Grid divided inverted stackable>
								<Grid.Row>
									<Grid.Column width={3}>
										<Header inverted as="h4" content="About" />
										<List link inverted>
											<List.Item as="a">Sitemap</List.Item>
											<List.Item as="a">Contact Us</List.Item>
											<List.Item as="a">Religious Ceremonies</List.Item>
											<List.Item as="a">Gazebo Plans</List.Item>
										</List>
									</Grid.Column>
									<Grid.Column width={3}>
										<Header inverted as="h4" content="Services" />
										<List link inverted>
											<List.Item as="a">Banana Pre-Order</List.Item>
											<List.Item as="a">DNA FAQ</List.Item>
											<List.Item as="a">How To Access</List.Item>
											<List.Item as="a">Favorite X-Men</List.Item>
										</List>
									</Grid.Column>
									<Grid.Column width={7}>
										<Header as="h4" inverted>
											Footer Header
										</Header>
										<p>
											Extra space for a call to action inside the footer that could help re-engage
											users.
										</p>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Container>
					</Segment>
				)
				}
			</Responsive>
		);
	}
}

DesktopContainer.propTypes = {
	children: PropTypes.node.isRequired,
	homeBanner: PropTypes.element.isRequired,
	footer: PropTypes.bool.isRequired,
};

class MobileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarOpened: undefined,
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
		const {
			children,
			homeBanner,
			footer,
			isHome,
		} = this.props;
		const { sidebarOpened } = this.state;

		return (
			<Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
				<Sidebar.Pushable>
					<Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
						<Menu.Item as="a" active>
							Home
						</Menu.Item>
						{
							homeBanner
							&& (
								<Button as={Link} to="/dash/new/edit">
								New
								</Button>
							)
						}

					</Sidebar>

					<Sidebar.Pusher
						dimmed={sidebarOpened}
						onClick={this.handlePusherClick}
						style={{ minHeight: "100vh" }}
					>
						<Segment
							inverted
							textAlign="center"
							style={{
								minHeight: isHome ? "350" : "50",
								padding: "1em 0em",
								backgroundImage: homeBanner
									? "url(https://source.unsplash.com/collection/3390539/1600x900)"
									: "none",
								backgroundSize: "cover",
								backgroundPosition: "70% 50%",
							}}
							vertical
						>
							<Container>
								<Menu inverted pointing secondary size="large">
									<Menu.Item onClick={this.handleToggle}>
										<Icon name="sidebar" />
									</Menu.Item>
									<Menu.Item position="right">
										{
											homeBanner && (
												<Button as={Link} to="/dash/new/edit">
													New
												</Button>
											)
										}
									</Menu.Item>
								</Menu>
							</Container>
							{homeBanner}
						</Segment>
						{children}
					</Sidebar.Pusher>
				</Sidebar.Pushable>
				{footer && (
					<Segment inverted vertical style={{ padding: "4em 0em" }}>
						<Container>
							<Grid divided inverted stackable>
								<Grid.Row>
									<Grid.Column width={3}>
										<Header inverted as="h4" content="About" />
										<List link inverted>
											<List.Item as="a">Sitemap</List.Item>
											<List.Item as="a">Contact Us</List.Item>
											<List.Item as="a">Religious Ceremonies</List.Item>
											<List.Item as="a">Gazebo Plans</List.Item>
										</List>
									</Grid.Column>
									<Grid.Column width={3}>
										<Header inverted as="h4" content="Services" />
										<List link inverted>
											<List.Item as="a">Banana Pre-Order</List.Item>
											<List.Item as="a">DNA FAQ</List.Item>
											<List.Item as="a">How To Access</List.Item>
											<List.Item as="a">Favorite X-Men</List.Item>
										</List>
									</Grid.Column>
									<Grid.Column width={7}>
										<Header as="h4" inverted>
											Footer Header
										</Header>
										<p>
											Extra space for a call to action inside the footer that could help re-engage
											users.
										</p>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Container>
					</Segment>
				)}
			</Responsive>
		);
	}
}

MobileContainer.defaultProps = {
	isHome: false,
};

MobileContainer.propTypes = {
	children: PropTypes.node.isRequired,
	homeBanner: PropTypes.element.isRequired,
	footer: PropTypes.bool.isRequired,
	isHome: PropTypes.bool,
};

const ResponsiveContainer = ({ children, banner, footer }) => (
	<div>
		<DesktopContainer
			footer={footer}
			homeBanner={banner}
		>
			{children}
		</DesktopContainer>
		<MobileContainer
			footer={footer}
			homeBanner={banner}
		>
			{children}
		</MobileContainer>
	</div>
);

ResponsiveContainer.propTypes = {
	children: PropTypes.node.isRequired,
	banner: PropTypes.element.isRequired,
	footer: PropTypes.bool,
};

ResponsiveContainer.defaultProps = {
	footer: false,
};

export default ResponsiveContainer;
