document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
    let lastProductId = 0;

    // Agregar manejador de clic al botón para eliminar código
    document.getElementById('eliminarCodigoBtn').addEventListener('click', function() {
        const selectElement = document.getElementById('eliminarCodigoSelect');
        const selectedCode = selectElement.value;

        if (selectedCode) {
            // Emitir evento para eliminar producto con el código seleccionado
            socket.emit('eliminarCodigo', selectedCode);
        } else {
            alert('Selecciona un código antes de eliminar.');
        }
    });

    // Función para manejar la actualización de productos
    function updateProductsHandler(products) {
        const productList = document.getElementById('productList');
        const eliminarCodigoSelect = document.getElementById('eliminarCodigoSelect');
        productList.innerHTML = '';
        eliminarCodigoSelect.innerHTML = '<option value="">Seleccionar código</option>';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.code}</td>
            `;
            productList.appendChild(row);

            // Agregar opciones al select para cada código existente
            const option = document.createElement('option');
            option.value = product.code;
            option.textContent = product.code;
            eliminarCodigoSelect.appendChild(option);

            lastProductId = Math.max(lastProductId, product.id);
        });
    }

    // Añadir el manejador 'updateProducts'
    socket.on('updateProducts', updateProductsHandler);

    // Agregar manejador para el evento 'eliminarCodigoResponse' del servidor
    socket.on('eliminarCodigoResponse', function(success) {
        if (success) {
            // El producto se eliminó correctamente, actualizar la lista de productos
            socket.emit('getProducts'); // Solicitar la actualización de la lista de productos
        } else {
            alert('Error al eliminar el código.');
        }
    });

    // Agregar el evento 'submit' del formulario para agregar nuevos productos
    document.getElementById('addProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const code = document.getElementById('code').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const category = document.getElementById('category').value.trim();
        const thumbnails = document.getElementById('thumbnails').value.trim().split(',');

        lastProductId++;
        const newProduct = {
            id: lastProductId,
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        };

        socket.emit('addProduct', newProduct);

        this.reset();
    });
});
