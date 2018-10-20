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

		const properties = {
			qInfo: {
				qType: 'visualization',
				qId: '',
			},
			qHyperCubeDef: {
				qDimensions: [
					{
						qDef: {qFieldDefs: ['Goal ID']},
					},
				],
				qMeasures: [
					{
						qDef: {qDef: '=Sum(Value)'},
					},
				],
				qInitialDataFetch: [
					{
						qHeight: 5,
						qWidth: 2,
					},
				],
			},
		};


		// Open the session and create a session document:
		this.q = session.open()
			.then((global) => {
				return global.openDoc("0b0fc6d5-05ce-44d7-95aa-80d0680b3559");
			})
			// Create a generic object with a hypercube definition containing one dimension and one measure
			.then((doc) => doc.createSessionObject(properties));
		this.q.then((object) => object.getLayout().then(layout => {
			return layout.qHyperCube.qDataPages;
		}))
		// Get hypercube layout
			.catch((error) => {
				console.log('Session: Failed to open socket:', error);
			});
	}

	getQ() {
		return this.q;
	}
}

export default QlikConnection;
