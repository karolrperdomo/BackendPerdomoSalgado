document.addEventListener('DOMContentLoaded', function () {
  const socket = io();
  let lastProductId = 0;

  // Agregar manejador de clic al botón para eliminar producto por ID
  document.getElementById('eliminarCodigoBtn').addEventListener('click', function () {
      const selectElement = document.getElementById('eliminarCodigoSelect');
      const selectedId = parseInt(selectElement.value);

      if (!isNaN(selectedId)) {
          // Emitir evento para eliminar producto con el ID seleccionado
          socket.emit('eliminarProducto', selectedId);
      } else {
          alert('Selecciona un ID antes de eliminar.');
      }
  });

  // Añadir el manejador 'updateProducts'
  socket.on('updateProducts', updateProductsHandler);

  // Función para manejar la actualización de productos
  function updateProductsHandler(products) {
      const productList = document.getElementById('productList');
      const eliminarCodigoSelect = document.getElementById('eliminarCodigoSelect');

      // Limpiar la tabla y la lista desplegable antes de agregar las filas y opciones actualizadas
      productList.innerHTML = '';
      eliminarCodigoSelect.innerHTML = '';

      products.forEach(product => {
          const row = document.createElement('tr');
          // Crear las celdas de la fila utilizando product.id, product.title, etc.
          row.innerHTML = `
              <td>${product.id}</td>
              <td>${product.title}</td>
              <td>${product.description}</td>
              <td>${product.code}</td>
          `;
          productList.appendChild(row);

          // Agregar opciones al select para cada ID existente
          const option = document.createElement('option');
          option.value = product.id;
          option.textContent = product.id;
          eliminarCodigoSelect.appendChild(option);

          lastProductId = Math.max(lastProductId, product.id);
      });
  }

  // Agregar el evento 'submit' del formulario para agregar nuevos productos
  document.getElementById('addProductForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const title = document.getElementById('title').value.trim();
      const description = document.getElementById('description').value.trim();
      const code = document.getElementById('code').value.trim();
      const price = parseFloat(document.getElementById('price').value);
      const stock = parseInt(document.getElementById('stock').value);
      const category = document.getElementById('category').value.trim();
      const thumbnails = document.getElementById('thumbnails').value.trim().split(',');

      const newProduct = {
          id: lastProductId + 1,
          title,
          description,
          code,
          price,
          stock,
          category,
          thumbnails
      };

      // Emitir evento para agregar nuevo producto
      socket.emit('addProduct', newProduct);

      this.reset();
  });
});
