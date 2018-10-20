import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import ResponsiveContainer from "../layouts/Container";
import "semantic-ui-css/semantic.min.css";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it"s not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
	<Container text>
	<Header
		as="h1"
		content="change your view"
		inverted
		style={{
			fontSize: mobile ? "2em" : "4em",
			fontWeight: "normal",
			marginBottom: 0,
			marginTop: mobile ? "1.5em" : "3em",
		}}
	/>
	<Header
		as="h2"
		content="Visualize oceans' data in a way that truly becomes you."
		inverted
		style={{
			fontSize: mobile ? "1.5em" : "1.7em",
			fontWeight: "normal",
			marginTop: mobile ? "0.5em" : "1.5em",
		}}
	/>
	<Button as={Link} to="/dash/new" primary size="huge">
		Get Started
		<Icon name="right arrow" />
	</Button>
</Container>
);


HomepageHeading.propTypes = {
	mobile: PropTypes.bool.isRequired,
};

const subHeader = {
  fontSize: "95%",
  lineHeight: "1.6",
 }

const HomepageLayout = () => (
	<ResponsiveContainer banner={<HomepageHeading />}>
		<Segment style={{ padding: "3em 0em" }} vertical>
		<Container>
		<Header size="large" textAlign="center" style={{marginBottom: "2em", fontWeight: "500"}}>
			Better analyze, understand and visualize how we can conserve and sustainably use the oceans, seas and marine resources
			</Header>
			<Grid columns='three' >
			<Grid.Row>
				<Grid.Column>
					<Header as='h3' icon>
						<Icon circular color='blue' size="massive" name='chart bar' />
						Visualize
						<Header.Subheader style={subHeader}>Make sense of the a massive collection of marine dataset</Header.Subheader>
					</Header>
				</Grid.Column>
				<Grid.Column>
					<Header as='h3' icon>
						<Icon circular color='blue' size="massive" name='code' />
						Analyze
						<Header.Subheader style={subHeader}>Collaborative analysis of filtered dataset for sensemaking</Header.Subheader>
					</Header>
				</Grid.Column>
				<Grid.Column>
					<Header as='h3' icon>
						<Icon circular color='blue' size="massive" name='group' />
						Distribute
						<Header.Subheader style={subHeader}>Easily share customized data with peers and business mates for better understanding</Header.Subheader>
					</Header>
				</Grid.Column>
			</Grid.Row>
		</Grid>
		</Container>

		</Segment>
		<Segment style={{ padding: "0em" }} vertical>
			<Grid celled="internally" columns="equal" stackable>
				<Grid.Row textAlign="center">
					<Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
						<Header as="h3" style={{ fontSize: "2em" }}>
							"What a Company"
						</Header>
						<p style={{ fontSize: "1.33em" }}>That is what they all say about us</p>
					</Grid.Column>
					<Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
						<Header as="h3" style={{ fontSize: "2em" }}>
							"I shouldn"t have gone with their competitor."
						</Header>
						<p style={{ fontSize: "1.33em" }}>
							<Image avatar src="/images/avatar/large/nan.jpg" />
							<b>Nan</b> Chief Fun Officer Acme Toys
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
		<Segment style={{ padding: "8em 0em" }} vertical>
			<Container text>
				<Header as="h3" style={{ fontSize: "2em" }}>
					Breaking The Grid, Grabs Your Attention
				</Header>
				<p style={{ fontSize: "1.33em" }}>
					Instead of focusing on content creation and hard work, we have learned how to master the
					art of doing nothing by providing massive amounts of whitespace and generic content that
					can seem massive, monolithic and worth your attention.
				</p>
				<Button as="a" size="large">
					Read More
				</Button>
				<Divider
					as="h4"
					className="header"
					horizontal
					style={{ margin: "3em 0em", textTransform: "uppercase" }}
				>
					<a href="#">Case Studies</a>
				</Divider>
				<Header as="h3" style={{ fontSize: "2em" }}>
					Did We Tell You About Our Bananas?
				</Header>
				<p style={{ fontSize: "1.33em" }}>
					Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
					it"s really true. It took years of gene splicing and combinatory DNA research, but our
					bananas can really dance.
				</p>
				<Button as="a" size="large">
					I"m Still Quite Interested
				</Button>
			</Container>
		</Segment>
		<Segment inverted vertical style={{ padding: "5em 0em" }}>
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
								Extra space for a call to action inside the footer that could help re-engage users.
							</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Segment>
	</ResponsiveContainer>
);
export default HomepageLayout;
