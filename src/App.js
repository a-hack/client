import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomepageLayout from "./layouts/HomepageLayout";
import Dashboard from "./layouts/Dashboard";

import "./App.css";

export default () => (
	<BrowserRouter>
		<Route exact path="/">
			<HomepageLayout />
		</Route>
	</BrowserRouter>
);
