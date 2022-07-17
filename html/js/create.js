const myForm = document.getElementById('createProduct');

myForm.addEventListener('submit', function(e) {
	// Prevent the default behavior of the form
	e.preventDefault();

	// Store payload in a variable
	const payload = new FormData(myForm);

	// convert payload to json
	//var obj = {};
	//payload.forEach((value, key) => obj[key] = value);
	//var jsonPayload = JSON.stringify(obj);
	var jsonPayload = JSON.stringify({
		"name": payload.name,
		"price": Number(payload.price),
		"description": payload.description,
	});

	console.log(jsonPayload)

	fetch('http://localhost:8080/api/products', { 
		method: 'POST',
		body: jsonPayload,
		headers: {
			'Content-Type': 'application/json'
		},

	})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err));
})