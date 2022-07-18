const apiEndpoint = "http://192.168.1.253:8080/api/products"

async function loadIntoTable(url, table) {
	const tableHead = table.querySelector('thead');
	const tableBody = table.querySelector('tbody');
	const response = await fetch(url);
	const data = await response.json();

	// Clear table
	tableHead.innerHTML = '<tr></tr>';
	tableBody.innerHTML = '';

	// If no data comes back from fetch then log to console and return
	if (data.length === 0) {
		const nodataInfo = document.createElement('div');
		nodataInfo.textContent = 'No data found, try creating a new product!';
		nodataInfo.setAttribute('role', 'alert');
		nodataInfo.setAttribute('class', 'alert alert-warning');	

		const tableObj = document.getElementById('prodtable');

		tableObj.parentNode.insertBefore(nodataInfo, tableObj);
		return;
	}

	// Populate the header
	for (const headerText of Object.keys(data[0])) {
		const headerElement = document.createElement('th');

		headerElement.textContent = headerText;
		tableHead.querySelector('tr').appendChild(headerElement);
	}
	// add th for actions
	const headerElement = document.createElement('th');
	headerElement.textContent = 'Actions';
	tableHead.querySelector('tr').appendChild(headerElement);


	// Populate the rows
	for (const row of data) {
		const rowElement = document.createElement('tr');
		// create Edit button
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.setAttribute('type', 'button');
		editButton.setAttribute('class', 'btn btn-secondary m-1');

		// create Delete button
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.setAttribute('type', 'button');
		deleteButton.setAttribute('class', 'btn btn-danger m-1');

		// Add values from row to table
		for (const cell of Object.values(row)) {
			const cellElement = document.createElement('td');

			cellElement.textContent = cell;
			rowElement.appendChild(cellElement);
		}

		// Create button TD
		const buttonTd = document.createElement('td');
		rowElement.appendChild(buttonTd);

		// add buttons to the td
		buttonTd.appendChild(editButton);
		buttonTd.appendChild(deleteButton);

		// add row to table
		tableBody.appendChild(rowElement);
	}

}

loadIntoTable(apiEndpoint, document.querySelector('table'));