const socket = io(); // Conexión con el servidor de Socket.io

    // Manejar el envío del formulario para agregar un nuevo producto
    const addProductForm = document.getElementById('addProductForm');

addProductForm.addEventListener('submit', (event) => {
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
        addProductForm.reset();
    });

    socket.on("updateProducts", (data) => {
        const productList = document.getElementById("productList");

        if (productList && Array.isArray(data.products)) {
            productList.innerHTML = "";
            const h1 = document.createElement("h1");
            h1.textContent = "Lista de productos:";
            productList.appendChild(h1);
            data.products.forEach((product) => {
                const id = product._id.toString();
                const productContainer = document.createElement("div");
                const parametro = "id";
                productContainer.setAttribute(parametro, id);
                productContainer.innerHTML = ` 
                <h4>${product.code}: ${product.title}</h4>
                <p>ID de producto: ${id}</p>
                <p>${product.description} - $${product.price} - Stock: ${product.stock}</p>
                <button type="button" onclick="deleteProduct('${id}')">Eliminar producto</button>   
                `;
                productList.appendChild(productContainer);
                });
            } else {
                console.log("Error: La estructura de datos de 'data' no es válida.");
            }
        });

    function deleteProduct(idProduct) {
        socket.emit("deleteProduct", { idProduct });
    }