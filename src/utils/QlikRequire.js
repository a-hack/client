/* global require */

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
