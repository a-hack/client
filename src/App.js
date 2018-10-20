import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomepageLayout from "./layouts/HomepageLayout";
import Dashboard from "./pages/Dashboard";

import "./App.css";

const NotFound = () => (<p>404 Not Found</p>);

export default () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={HomepageLayout} />
			<Route path="/dash" component={Dashboard} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);
