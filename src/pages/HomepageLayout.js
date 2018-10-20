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
		content="Visualize oceans data in a way that truly becomes you."
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
							"Brace yourself"
						</Header>
						<p style={{ fontSize: "1.33em" }}>Enrich your knowledge with up-to-date climate data</p>
					</Grid.Column>
					<Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
						<Header as="h3" style={{ fontSize: "2em" }}>
							"Unleash your intelligence."
						</Header>
						<p style={{ fontSize: "1.33em" }}>
							Smart and targeted climate data at your click 
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	</ResponsiveContainer>
);
export default HomepageLayout;
