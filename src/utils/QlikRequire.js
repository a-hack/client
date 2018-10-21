/* global require */

/**
 * A customizable data visualization web application.
 * Copyright (C) 2018  Jacob MacDonald, Jacob Martin, Patrick Gingras,
 * Michael Dysart, Aweys Ahmed, Hassan Salami, Aritz Joseph Beobide-Cardinal
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

const config = {
	host: "playground-sense.qlik.com",
	prefix: "/showcase/",
	port: "443",
	isSecure: true,
	rejectUnauthorized: false,
	appname: "0b0fc6d5-05ce-44d7-95aa-80d0680b3559",
};

class QlikConnection {
	constructor() {
		// create a new session:
		this.app = new Promise((resolve) => {
			window.require.config({
				baseUrl: `https://${config.host}${(config.port ? `:${config.port}` : "")}${config.prefix}resources`,
			});

			// eslint-disable-next-line global-require import/no-dynamic-require
			window.require(["js/qlik"], (qlik, error) => {
				console.error(error);
				console.log("qlik", qlik);

				// Open a dataset on the server
				const app = qlik.openApp(config.appname, config);
				resolve(app);
			});
		});
	}

	getApp() {
		return this.app;
	}
}

export default QlikConnection;
