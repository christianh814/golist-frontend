import appConfig from '../appconfig/config.json' with {type: 'json'};

const apiEndpoint = appConfig.api;
const myForm = document.getElementById('createProduct');

myForm.addEventListener('submit', async (e) => {
	// Prevent the default behavior of the form
	e.preventDefault();

	// Store payload in a variable
	const payload = new FormData(myForm);

	// convert payload to json
	const obj = {};
	payload.forEach((value, key) => obj[key] = value);
	const jsonPayload = JSON.stringify({
		name: obj.name,
		price: Number(obj.price),
		description: obj.description
	});

	try {
		// Use fetch to send the payload to the server
		const response = await fetch(apiEndpoint, {
			method: 'POST',
			body: jsonPayload,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		
		const data = await response.json();
		console.log(data);
		
		alert("Successfully created listing!");
		window.location.href = '/';
	} catch (err) {
		console.log(err);
	}
});