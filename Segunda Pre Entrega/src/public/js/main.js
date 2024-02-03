const socket = io.connect();
const addProduct = document.getElementById('addProduct');

addProduct.addEventListener('submit', handleAddProduct);

socket.on('products', handleInitialProducts);
socket.on('productDeleted', handleProductDeleted);

function handleAddProduct(e) {
    e.preventDefault();
    const producto = {
        title: addProduct[0].value,
        description: addProduct[1].value,
        category: addProduct[2].value,
        price: parseFloat(addProduct[3].value),
        thumbnail: addProduct[4].value,
        code: addProduct[5].value,
        stock: parseFloat(addProduct[6].value)
    };
    socket.emit('update', producto);
    addProduct.reset();
}

function handleInitialProducts(initialProducts) {
    makeHtmlTable(initialProducts.docs);
}

function handleProductDeleted(newProducts) {
    makeHtmlTable(newProducts.docs);
}

function addDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.btnDelete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productData = JSON.parse(this.getAttribute('data-product-data'));
            deleteProducts(productId, productData);
        });
    });
}

function addButtonListeners() {
    const addButtons = document.querySelectorAll('.btnAddtoCart');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productData = JSON.parse(this.getAttribute('data-product-data'));
            addProducts(productId, productData);
        });
    });
}

function makeHtmlTable(products) {
    const tabla = document.getElementById('tabla');
    let conjunto = '';
    if (products.length > 0) {
        products.forEach(e => {
            conjunto +=
                `<tr>
                    <td>${e.title}</td>
                    <td>${e.description}</td>
                    <td>$${e.price}</td>
                    <td>${e.stock}</td>
                    <td>
                        <img style="height: 54px;" src="${e.thumbnail}" alt="${e.title}">
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm btnDelete" data-product-id="${e._id}" data-product-data='${JSON.stringify(products)}'>Eliminar</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm btnAddtoCart" data-product-id="${e._id}" data-product-data='${JSON.stringify(products)}'>Agregar</button>
                    </td>
                </tr>`;
        });
    } else {
        conjunto = `<tr><td colspan="7"><h3>No hay productos</h3></td></tr>`;
    }

    // Modifica la estructura de la tabla según tus necesidades
    tabla.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Título</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${conjunto}
            </tbody>
        </table>
    `;

    addDeleteButtonListeners();
}

function deleteProducts(productId, productData) {
    socket.emit('delete', productId);
}

function addProducts(productId, productData) {
    socket.emit('add', productId);
}

async function addProductToCart(pid) {
    const cart = document.getElementById("carrito");
    const cid = cart.value;
    const options = {
        method: "POST",
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    };

    await fetch(
        `http://localhost:8080/api/carts/${cid}/products/${pid}`,
        options
    );
}

async function deleteProductFromCart(pid) {
    const cart = document.getElementById("carrito");
    const cid = cart.value;
    const options = {
        method: "DELETE",
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    };

    await fetch(
        `http://localhost:8080/api/carts/${cid}/products/${pid}`,
        options
    );
}
