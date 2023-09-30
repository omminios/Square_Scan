document.getElementById('sku').addEventListener('input', function() {
    const skuValue = this.value;

    // Fetch item details based on SKU from the backend
    fetch(`http://localhost:3000/findsku/${skuValue}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // Handle error (e.g., show a message to the user)
            } else {
                // Populate the 'name' and 'quantity' fields
                document.getElementById('name').value = data.name;
                document.getElementById('quantity').value = data.quantity;

                // Render new input fields for the next item
                renderNewInputFields();
            }
        })
        .catch(error => {
            console.error('Error fetching item:', error);
        });
});

function renderNewInputFields() {
    const container = document.querySelector('.container');

    // Create new input fields
    const newSKUField = document.createElement('input');
    newSKUField.type = 'text';
    newSKUField.placeholder = 'Scan Next Barcode';
    newSKUField.id = 'sku'; // Note: IDs should be unique; adjust as needed

    const newNameField = document.createElement('input');
    newNameField.type = 'text';
    newNameField.placeholder = 'Item Name';

    const newQuantityField = document.createElement('input');
    newQuantityField.type = 'number';
    newQuantityField.placeholder = 'Quantity';

    // Append new fields to the container
    container.appendChild(newSKUField);
    container.appendChild(newNameField);
    container.appendChild(newQuantityField);

    // Add event listener to the new SKU field (recursive behavior)
    newSKUField.addEventListener('input', function() {
        // Similar logic as above...
    });
}
