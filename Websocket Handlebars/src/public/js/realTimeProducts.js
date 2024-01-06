const socket = io(); // Conexión con el servidor de Socket.io

// Manejar el envío del formulario para agregar un nuevo producto
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const code = document.getElementById('code').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);
    const category = document.getElementById('category').value.trim();
    const thumbnails = document.getElementById('thumbnails').value.trim().split(',');

    // Construir el objeto del nuevo producto
    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
    };

    // Enviar los datos del nuevo producto al servidor a través de WebSocket
    socket.emit('addProduct', newProduct);

    // Limpiar el formulario después de enviar los datos
    this.reset();
});

socket.on('updateProducts', function(products) {
    // Actualizar la lista de productos en la vista
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista antes de agregar los productos actualizados

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Código</th>
            </tr>
        </thead>
        <tbody id="productListBody"></tbody>
    `;

    const tbody = table.querySelector('#productListBody');
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.code}</td>
        `;
        tbody.appendChild(row);
    });

    productList.appendChild(table);
});
