import appConfig from '../appconfig/config.json' with {type: 'json'};

const apiEndpoint = appConfig.api;
const myForm = document.getElementById('editProduct');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

// populate the form with the product data using fetch
async function loadIntoForm(id) {
	const response = await fetch(`${apiEndpoint}/${id}`);
	const data = await response.json();
	myForm.elements.name.value = data.name;
	myForm.elements.price.value = data.price;
	myForm.elements.description.value = data.description;
}

// load into form
loadIntoForm(productId);

myForm.addEventListener('submit', async (e) => {
	// Prevent the default behavior of the form
	e.preventDefault();

	try {
		const response = await fetch(`${apiEndpoint}/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: myForm.querySelector('#name').value,
				price: Number(myForm.querySelector('#price').value),
				description: myForm.querySelector('#description').value
			})
		});
		
		const data = await response.json();
		console.log(data);
		
		alert('Product updated successfully!');
		window.location.href = '/';
	} catch (err) {
		console.log(err);
	}
});