import "whatwg-fetch";

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

export function get(key) {
	return fetch(`https://ateam.ryke.xyz/api/v1/layout/${key}`)
		.then(checkStatus)
		.then((response) => response.json());
}

export function save(layout) {
	return fetch(`https://ateam.ryke.xyz/api/v1/layout/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(layout),
	})
		.then(checkStatus)
		.then((response) => response.json());
}
