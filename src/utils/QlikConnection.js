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
				qType: "visualization",
				qId: "",
			},
			qHyperCubeDef: {
				qDimensions: [
					{
						qDef: { qFieldDefs: ["Goal ID"] },
					},
					{
						qDef: { qFieldDefs: ["Country"] },
					},
					{
						qDef: { qFieldDefs: ["SDG Target"] },
					},
					{
						qDef: { qFieldDefs: ["Ocean Basins"] },
					},
					{
						qDef: { qFieldDefs: ["Lead entity type"] },
					},
					{
						qDef: { qFieldDefs: ["Commitment Title"] },
					},
					{
						qDef: { qFieldDefs: ["Partners"] },
					},
					{
						qDef: { qFieldDefs: ["Indicator"] },
					},
					{
						qDef: { qFieldDefs: ["Lead entity"] },
					},
				],
				qMeasures: [
					{
						qDef: { qDef: "=Sum(Value)" },
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
			.then((global) => global.openDoc("0b0fc6d5-05ce-44d7-95aa-80d0680b3559"))
			// Create a generic object with a hypercube definition containing one dimension and one measure
			.then((doc) => doc.createSessionObject(properties));
		this.q.then((object) => object.getLayout().then(layout => layout.qHyperCube.qDataPages))
		// Get hypercube layout
			.catch((error) => {
				console.log("Session: Failed to open socket:", error);
			});
	}

	getQ() {
		return this.q;
	}
}

export default QlikConnection;
