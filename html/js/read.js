async function loadIntoTable(url, table) {
	const tableHead = table.querySelector('thead');
	const tableBody = table.querySelector('tbody');
	const response = await fetch(url);
	const data = await response.json();

	// Clear table
	tableHead.innerHTML = '<tr></tr>';
	tableBody.innerHTML = '';

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

loadIntoTable('http://localhost:8080/api/products', document.querySelector('table'));