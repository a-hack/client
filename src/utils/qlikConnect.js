import enigma from "enigma.js";
import schema from "enigma.js/schemas/12.20.0.json";

class QlikConnection {
	constructor(engineDataUrl = "wss://playground-sense.qlik.com/showcase/app/engineData") {
		// create a new session:
		const session = enigma.create({
			schema,
			url: engineDataUrl,
			createSocket: url => new WebSocket(url),
		});

		session.on("traffic:sent", data => console.log("sent:", data));
		session.on("traffic:received", data => console.log("received:", data));

		// open the socket and eventually receive the QIX global API, and then close
		// the session:
		session.open().then((global) => {
			return global.openDoc("0b0fc6d5-05ce-44d7-95aa-80d0680b3559").then((doc) => {

				}
			});
		})
			.catch(err => console.log("Something went wrong :(", err));
	}
}
export default QlikConnection;
